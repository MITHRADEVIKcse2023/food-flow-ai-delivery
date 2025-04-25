
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { Database } from '@/integrations/supabase/types';

export interface Message {
  id: string;
  content: string;
  user_id?: string | null;
  driver_id?: string | null;
  created_at: string;
  is_read: boolean;
}

export const useChat = (driverId: string | null) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const { user } = useAuth();

  // Fetch existing chat messages
  useEffect(() => {
    const fetchMessages = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .or(`user_id.eq.${user.id},driver_id.eq.${driverId}`)
          .order('created_at', { ascending: true });

        if (error) throw error;
        
        setMessages(data || []);
      } catch (error: any) {
        toast.error('Failed to load messages', { description: error.message });
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [user, driverId]);

  // Subscribe to real-time message updates
  useEffect(() => {
    if (!user) return;
    
    // Set up real-time subscription for new messages
    const channel = supabase
      .channel('real-time-messages')
      .on('postgres_changes', 
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          // Handle new message
          const newMessage = payload.new as Message;
          setMessages(prev => [...prev, newMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const sendMessage = async (content: string) => {
    if (!user || !content.trim() || sending) return;
    
    try {
      setSending(true);
      
      const newMessage = {
        user_id: user.id,
        driver_id: driverId,
        content,
        is_read: false
      };
      
      const { data, error } = await supabase
        .from('messages')
        .insert(newMessage)
        .select()
        .single();
      
      if (error) throw error;
      
      // Optimistic update - we'll get the confirmed message from the subscription
      setMessages(prev => [...prev, data as Message]);
      return data;
    } catch (error: any) {
      toast.error('Failed to send message', { description: error.message });
      return null;
    } finally {
      setSending(false);
    }
  };

  // Mark messages as read
  const markAsRead = async (messageId: string) => {
    try {
      await supabase
        .from('messages')
        .update({ is_read: true })
        .eq('id', messageId);
    } catch (error: any) {
      console.error('Failed to mark message as read:', error);
    }
  };

  // Implement fallback mechanism - retry sending failed messages
  const retrySend = async (content: string) => {
    return await sendMessage(content);
  };

  return {
    messages,
    loading,
    sending,
    sendMessage,
    markAsRead,
    retrySend
  };
};

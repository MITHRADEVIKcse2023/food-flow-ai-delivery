
import React, { useState, useRef, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Loader, Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SuggestionChip from './SuggestionChip';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  time: string;
  suggestions?: string[];
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi there! I'm FlowBot 🤖. How can I help you today? You can ask me about food recommendations, track your order, or answer questions about our service!",
      sender: 'bot',
      time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
      suggestions: ['Food recommendations', 'Track my order', 'Show today\'s offers']
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [processingInput, setProcessingInput] = useState(false); // New state to prevent rapid submissions
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading || processingInput) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputText,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);
    setProcessingInput(true); // Prevent multiple submissions

    try {
      // Call the LLaMA 3 endpoint through Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('llama-chat', {
        body: {
          message: inputText,
          user_id: user?.id,
          context: {
            chat_history: messages.slice(-5).map(m => ({
              role: m.sender === 'user' ? 'user' : 'assistant',
              content: m.content
            }))
          }
        }
      });

      if (error) throw error;

      const botMessage: Message = {
        id: Date.now().toString(),
        content: data.text,
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
        suggestions: data.suggestions || []
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error: any) {
      console.error('Error calling LLaMA API:', error);
      toast.error('Failed to get response', {
        description: 'Please try again later.'
      });
      
      // Fallback response in case of error
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: "I'm having trouble connecting right now. Please try again in a moment.",
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      // Allow new submissions after a small delay to prevent accidental double-sends
      setTimeout(() => {
        setProcessingInput(false);
      }, 500);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (isLoading || processingInput) return;
    
    setInputText(suggestion);
    // Use setTimeout to ensure inputText is updated before sending
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const toggleRecording = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      toast.error('Speech recognition not supported', {
        description: 'Your browser does not support voice input.'
      });
      return;
    }

    try {
      if (isRecording) {
        // Stop recording logic would go here
        setIsRecording(false);
        return;
      }

      setIsRecording(true);
      
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Call voice-to-text function
      const { data, error } = await supabase.functions.invoke('voice-to-text', {
        body: { /* API expects audio data */ }
      });
      
      if (error) throw error;
      
      if (data?.text) {
        setInputText(data.text);
      }

    } catch (error: any) {
      console.error('Error with voice input:', error);
      toast.error('Voice input failed', {
        description: error.message || 'Please try typing instead.'
      });
    } finally {
      setIsRecording(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b bg-foodapp-primary text-white">
        <h2 className="text-lg font-medium">FlowBot</h2>
        <p className="text-sm opacity-80">Your smart food assistant</p>
      </div>
      
      <ScrollArea className="flex-grow p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="flex flex-col">
              <div className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === 'user'
                  ? 'bg-foodapp-primary text-white ml-auto rounded-br-none'
                  : 'bg-gray-100 rounded-bl-none'
              }`}>
                <p>{message.content}</p>
                <span className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                }`}>
                  {message.time}
                </span>
              </div>
              
              {/* Suggestions */}
              {message.sender === 'bot' && message.suggestions && message.suggestions.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {message.suggestions.map((suggestion, index) => (
                    <SuggestionChip 
                      key={index} 
                      text={suggestion} 
                      onClick={() => handleSuggestionClick(suggestion)}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
          
          {/* Loading indicator */}
          {isLoading && (
            <div className="flex items-center gap-2 text-foodapp-gray">
              <Loader size={16} className="animate-spin" />
              <span>FlowBot is typing...</span>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      <div className="border-t p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <Button
            type="button"
            size="icon"
            variant="outline"
            onClick={toggleRecording}
            className="rounded-full"
            disabled={isLoading || processingInput}
          >
            {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
          </Button>
          
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask FlowBot anything..."
            className="flex-grow border rounded-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-foodapp-primary"
            disabled={isLoading || processingInput}
          />
          
          <Button
            type="submit"
            size="icon"
            className="rounded-full bg-foodapp-primary hover:bg-foodapp-primary/90"
            disabled={isLoading || processingInput || !inputText.trim()}
          >
            {isLoading ? <Loader size={20} className="animate-spin" /> : <Send size={20} />}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;

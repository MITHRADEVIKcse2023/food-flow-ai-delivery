
import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '@/hooks/useChat';
import { Send, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

interface EnhancedChatInterfaceProps {
  driverName: string;
  driverId: string | null;
}

const EnhancedChatInterface: React.FC<EnhancedChatInterfaceProps> = ({
  driverName,
  driverId
}) => {
  const [messageText, setMessageText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const {
    messages,
    loading,
    sending,
    sendMessage,
    retrySend
  } = useChat(driverId);

  const [failedMessages, setFailedMessages] = useState<string[]>([]);

  // Scroll to the bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!messageText.trim() || !user) return;

    const result = await sendMessage(messageText);
    if (!result) {
      // Message failed to send, add to failed messages for retry
      setFailedMessages(prev => [...prev, messageText]);
      toast.error('Message failed to send', { 
        description: 'We\'ll retry automatically', 
        action: {
          label: 'Retry Now',
          onClick: () => handleRetry(messageText)
        }
      });
    }
    
    setMessageText('');
  };

  const handleRetry = async (content: string) => {
    const result = await retrySend(content);
    if (result) {
      // Remove from failed messages if successful
      setFailedMessages(prev => prev.filter(msg => msg !== content));
    }
  };

  // Auto-retry failed messages
  useEffect(() => {
    if (failedMessages.length > 0 && !sending) {
      const timer = setTimeout(async () => {
        const message = failedMessages[0];
        const result = await retrySend(message);
        if (result) {
          setFailedMessages(prev => prev.filter(msg => msg !== message));
        }
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [failedMessages, sending]);

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b flex items-center">
        <div className="w-8 h-8 bg-foodapp-primary text-white rounded-full flex items-center justify-center mr-3">
          {driverName.charAt(0)}
        </div>
        <span className="font-medium">{driverName}</span>
      </div>
      
      <div className="flex-grow overflow-y-auto p-4">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader className="animate-spin mr-2" /> Loading messages...
          </div>
        ) : (
          <>
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 my-8">
                No messages yet. Send a message to start the conversation.
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`max-w-[75%] p-3 rounded-lg ${
                      message.user_id === user?.id
                        ? 'bg-foodapp-primary text-white ml-auto rounded-br-none'
                        : 'bg-gray-100 rounded-bl-none'
                    }`}
                  >
                    <p>{message.content}</p>
                    <span className="text-xs opacity-75 block mt-1">
                      {new Date(message.created_at).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                ))}
                
                {/* Failed messages waiting for retry */}
                {failedMessages.map((content, index) => (
                  <div
                    key={`failed-${index}`}
                    className="max-w-[75%] p-3 rounded-lg bg-red-100 text-red-800 ml-auto rounded-br-none"
                  >
                    <p>{content}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs">Sending failed</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleRetry(content)}
                        className="text-xs py-0 h-6"
                      >
                        Retry
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>
      
      <div className="border-t p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center"
        >
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Type a message..."
            className="flex-grow border rounded-l-md p-2 focus:outline-none focus:ring-1 focus:ring-foodapp-primary"
            disabled={loading}
          />
          <Button
            type="submit"
            className="rounded-l-none bg-foodapp-primary hover:bg-foodapp-primary/90"
            disabled={loading || sending || !messageText.trim()}
          >
            {sending ? <Loader size={16} className="animate-spin" /> : <Send size={16} />}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EnhancedChatInterface;

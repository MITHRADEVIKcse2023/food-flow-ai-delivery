
import React, { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Send, Smile } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'driver';
  time: string;
}

interface ChatInterfaceProps {
  driverName: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ driverName }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hi there! I'm ${driverName}, your delivery driver. I'll be delivering your order soon.`,
      sender: 'driver',
      time: '1:05 PM'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const { toast } = useToast();

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newMessage.trim()) {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
      
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage.trim(),
        sender: 'user',
        time: timeString
      };
      
      setMessages([...messages, message]);
      setNewMessage('');
      
      // Simulate driver reply after a delay
      setTimeout(() => {
        const driverResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: getDriverResponse(newMessage.trim()),
          sender: 'driver',
          time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
        };
        
        setMessages(prev => [...prev, driverResponse]);
      }, 2000);
    }
  };

  const getDriverResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('where') || lowerMessage.includes('location') || lowerMessage.includes('far')) {
      return "I'm about 10 minutes away from your location. See you soon!";
    } 
    else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "Hello! I'm on my way with your order.";
    }
    else if (lowerMessage.includes('thanks') || lowerMessage.includes('thank')) {
      return "You're welcome!";
    }
    else {
      return "I've received your message. I'm currently driving and will respond soon.";
    }
  };

  const sendQuickMessage = (text: string) => {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    
    const message: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      time: timeString
    };
    
    setMessages([...messages, message]);
    
    toast({
      title: "Message sent",
      description: `"${text}" sent to driver`,
    });
    
    // Simulate driver reply after a delay
    setTimeout(() => {
      const driverResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getDriverResponse(text),
        sender: 'driver',
        time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, driverResponse]);
    }, 1500);
  };

  const quickMessages = [
    "Where are you now?",
    "Please call me",
    "I'm waiting outside"
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b bg-gradient-to-r from-foodapp-primary to-foodapp-secondary">
        <h2 className="text-lg font-medium text-white">Chat with {driverName}</h2>
      </div>
      
      <ScrollArea className="flex-grow p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[75%] rounded-lg px-4 py-2 ${
                  message.sender === 'user' 
                    ? 'bg-foodapp-primary text-white rounded-br-none' 
                    : 'bg-gray-100 rounded-bl-none'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-white/80' : 'text-gray-500'}`}>
                  {message.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <div className="p-2 border-t">
        <div className="flex flex-wrap gap-2 mb-2">
          {quickMessages.map((msg, idx) => (
            <button 
              key={idx} 
              onClick={() => sendQuickMessage(msg)}
              className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-foodapp-dark transition-colors"
            >
              {msg}
            </button>
          ))}
        </div>
        
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-grow bg-gray-100 border border-transparent focus:border-foodapp-primary rounded-full px-4 py-2 text-sm focus:outline-none"
          />
          <Button type="submit" size="icon" className="rounded-full bg-foodapp-primary hover:bg-foodapp-primary/90">
            <Send size={18} />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;

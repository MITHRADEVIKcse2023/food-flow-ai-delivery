
import React from 'react';
import { Bot } from 'lucide-react';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import ChatInterface from './ChatInterface';

const ChatButton: React.FC = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="fixed bottom-6 right-6 bg-foodapp-primary text-white rounded-full p-4 flex items-center gap-2 shadow-lg hover:bg-foodapp-primary/90 transition-colors">
          <Bot size={20} />
          <span className="font-medium">Chat with FlowBot 🤖</span>
        </button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[80vh]">
        <ChatInterface />
      </SheetContent>
    </Sheet>
  );
};

export default ChatButton;

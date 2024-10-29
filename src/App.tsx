import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { MessageList } from './components/MessageList';
import { MessageInput } from './components/MessageInput';
import { supabase, type Message } from './lib/supabase';
import { MessageSquare } from 'lucide-react';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
    subscribeToMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Failed to load messages');
    } finally {
      setIsLoading(false);
    }
  };

  const subscribeToMessages = () => {
    const subscription = supabase
      .channel('messages')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, 
        payload => {
          setMessages(current => [payload.new as Message, ...current]);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  };

  const handleSendMessage = async (content: string) => {
    try {
      const { error } = await supabase.from('messages').insert([
        {
          content,
          user_name: 'User', // In a real app, this would come from auth
          avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        }
      ]);

      if (error) throw error;
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <MessageSquare className="w-6 h-6 text-blue-500" />
              <h1 className="text-xl font-semibold text-gray-900">Messages</h1>
            </div>
          </div>
          
          <div className="p-6">
            <MessageList messages={messages} isLoading={isLoading} />
          </div>
          
          <div className="p-6 border-t border-gray-100">
            <MessageInput onSend={handleSendMessage} isLoading={isLoading} />
          </div>
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
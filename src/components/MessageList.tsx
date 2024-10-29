import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import type { Message } from '../lib/supabase';

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

export function MessageList({ messages, isLoading }: MessageListProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse flex flex-col space-y-4 w-full">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/4" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <MessageCircle className="w-12 h-12 mb-4" />
        <p className="text-lg">No messages yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AnimatePresence>
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex items-start space-x-4 group hover:bg-gray-50 p-4 rounded-lg transition-colors"
          >
            <img
              src={message.avatar_url}
              alt={message.user_name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium text-gray-900">
                  {message.user_name}
                </p>
                <span className="text-xs text-gray-500">
                  {new Date(message.created_at).toLocaleDateString()}
                </span>
              </div>
              <p className="mt-1 text-gray-800">{message.content}</p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
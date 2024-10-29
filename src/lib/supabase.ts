import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://knbvzwoxcihrpwqmojdv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtuYnZ6d294Y2locnB3cW1vamR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAyMzAwNjUsImV4cCI6MjA0NTgwNjA2NX0.xIdWe6QYUizQJM6aADcuDtN60B5Xh2Kg_f4YVxoBflw';

export const supabase = createClient(supabaseUrl, supabaseKey);

export type Message = {
  id: string;
  content: string;
  created_at: string;
  user_name: string;
  avatar_url: string;
};
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://qtajuepvxidjefblsajg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0YWp1ZXB2eGlkamVmYmxzYWpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI0NzgxNTAsImV4cCI6MjA5ODA1NDE1MH0.m6FM6zSxLxRMdO067AzNeV6xqroQ2OPP0nf-8khhfGo';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
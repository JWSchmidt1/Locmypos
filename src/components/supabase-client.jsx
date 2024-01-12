import { createClient } from '@supabase/supabase-js'
const supabaseUrl = "https://qfgrchlkbhkwibjllyfn.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmZ3JjaGxrYmhrd2liamxseWZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE2NjM1OTEsImV4cCI6MjAwNzIzOTU5MX0.318abOuvjxaJ2FqQdfAxPzj1HlvhWPJlDFvrz4DNnB8"
const supabase = createClient( supabaseUrl, supabaseKey );
export default supabase;
import { createClient } from '@supabase/supabase-js'

const URL = 'https://modebjzfcoeosnlqrhoc.supabase.co'
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vZGVianpmY29lb3NubHFyaG9jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM3NjI3MjQsImV4cCI6MjAyOTMzODcyNH0.hmxbVPUYMWHDzNAh_N2gQUry0fm_yXM02DuvUHtfXYY'

export const supabase = createClient(URL, API_KEY);
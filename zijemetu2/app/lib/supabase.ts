import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export const supabase = createClient(supabaseUrl, supabaseServiceKey)

export type Project = {
  id: string
  title: string
  description: string
  cost?: string
  category?: string
  voting_ends_at?: string
  created_at: string
}

export type FbPost = {
  id: string
  title: string
  description: string
  fb_url: string
  thumbnail_url?: string
  created_at: string
}

export type Candidate = {
  id: string
  name: string
  role?: string
  bio?: string
  photo_url?: string
  order_num: number
}

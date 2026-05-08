import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Project = {
  id: string
  title: string
  description: string
  category: string
  cost: string
  image_url?: string
  photo_url?: string
  order_num: number
  voting_ends_at?: string | null
  created_at: string
  video_url?: string | null
  images?: string[]
  votable?: boolean
  comparisonGroups?: any[]
  comparisonTextImage?: string
}

export type Vote = {
  id: string
  project_id: string
  user_id: string
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

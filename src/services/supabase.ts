import {createClient} from '@supabase/supabase-js';

// Supabase configuration
// SkillDuel project credentials
const supabaseUrl: string = 'https://bidaobrxqebsyrdwkjvu.supabase.co';
const supabaseAnonKey: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpZGFvYnJ4cWVic3lyZHdranZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyNTY5OTcsImV4cCI6MjA2ODgzMjk5N30.sa9KMYBcOY_CNebB1lkWjC-4LWX1K6pGwtmpYEE-_sw';

// Check if Supabase credentials are configured
const hasValidCredentials = 
  supabaseUrl !== 'https://your-project.supabase.co' && 
  supabaseAnonKey !== 'your-anon-key-here' &&
  supabaseUrl.includes('supabase.co');

export const supabase = hasValidCredentials 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
    })
  : null;

console.log('🎯 Supabase connected:', hasValidCredentials ? '✅ Live Database' : '⚠️ Demo Mode');

// Database types (based on our schema design)
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          user_id: string;
          auth_id: string;
          username: string;
          email: string;
          profile_avatar_url: string | null;
          xp_total: number;
          streak_count: number;
          streak_last_date: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id?: string;
          auth_id: string;
          username: string;
          email: string;
          profile_avatar_url?: string | null;
          xp_total?: number;
          streak_count?: number;
          streak_last_date?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          user_id?: string;
          auth_id?: string;
          username?: string;
          email?: string;
          profile_avatar_url?: string | null;
          xp_total?: number;
          streak_count?: number;
          streak_last_date?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      skills: {
        Row: {
          skill_id: string;
          name: string;
          description: string;
          category: string;
          icon_url: string | null;
          is_premium: boolean;
          is_active: boolean;
          difficulty_level: number;
          created_at: string;
        };
        Insert: {
          skill_id?: string;
          name: string;
          description: string;
          category: string;
          icon_url?: string | null;
          is_premium?: boolean;
          is_active?: boolean;
          difficulty_level?: number;
          created_at?: string;
        };
        Update: {
          skill_id?: string;
          name?: string;
          description?: string;
          category?: string;
          icon_url?: string | null;
          is_premium?: boolean;
          is_active?: boolean;
          difficulty_level?: number;
          created_at?: string;
        };
      };
      user_skills: {
        Row: {
          user_skill_id: string;
          user_id: string;
          skill_id: string;
          current_level: number;
          xp_in_skill: number;
          is_active: boolean;
          started_at: string;
        };
        Insert: {
          user_skill_id?: string;
          user_id: string;
          skill_id: string;
          current_level?: number;
          xp_in_skill?: number;
          is_active?: boolean;
          started_at?: string;
        };
        Update: {
          user_skill_id?: string;
          user_id?: string;
          skill_id?: string;
          current_level?: number;
          xp_in_skill?: number;
          is_active?: boolean;
          started_at?: string;
        };
      };
      challenges: {
        Row: {
          challenge_id: string;
          skill_id: string;
          level: number;
          title: string;
          description: string;
          instruction_video_url: string | null;
          success_criteria: any; // JSONB
          ai_judging_prompt: string | null;
          estimated_time_minutes: number;
          xp_reward: number;
          difficulty: string;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          challenge_id?: string;
          skill_id: string;
          level?: number;
          title: string;
          description?: string;
          instruction_video_url?: string | null;
          success_criteria?: any; // JSONB
          ai_judging_prompt?: string | null;
          estimated_time_minutes?: number;
          xp_reward?: number;
          difficulty?: string;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          challenge_id?: string;
          skill_id?: string;
          level?: number;
          title?: string;
          description?: string;
          instruction_video_url?: string | null;
          success_criteria?: any; // JSONB
          ai_judging_prompt?: string | null;
          estimated_time_minutes?: number;
          xp_reward?: number;
          difficulty?: string;
          is_active?: boolean;
          created_at?: string;
        };
      };
      challenge_submissions: {
        Row: {
          submission_id: string;
          user_id: string;
          challenge_id: string;
          submission_video_url: string | null;
          ai_score: number | null;
          ai_feedback_text: string | null;
          criteria_met: any; // JSONB
          completion_time_seconds: number | null;
          xp_earned: number;
          status: string;
          created_at: string;
        };
        Insert: {
          submission_id?: string;
          user_id: string;
          challenge_id: string;
          submission_video_url?: string | null;
          ai_score?: number | null;
          ai_feedback_text?: string | null;
          criteria_met?: any; // JSONB
          completion_time_seconds?: number | null;
          xp_earned?: number;
          status?: string;
          created_at?: string;
        };
        Update: {
          submission_id?: string;
          user_id?: string;
          challenge_id?: string;
          submission_video_url?: string | null;
          ai_score?: number | null;
          ai_feedback_text?: string | null;
          criteria_met?: any; // JSONB
          completion_time_seconds?: number | null;
          xp_earned?: number;
          status?: string;
          created_at?: string;
        };
      };
      duels: {
        Row: {
          duel_id: string;
          challenge_id: string;
          status: string;
          winner_id: string | null;
          max_participants: number;
          time_limit_minutes: number;
          created_at: string;
          completed_at: string | null;
        };
        Insert: {
          duel_id?: string;
          challenge_id: string;
          status?: string;
          winner_id?: string | null;
          max_participants?: number;
          time_limit_minutes?: number;
          created_at?: string;
          completed_at?: string | null;
        };
        Update: {
          duel_id?: string;
          challenge_id?: string;
          status?: string;
          winner_id?: string | null;
          max_participants?: number;
          time_limit_minutes?: number;
          created_at?: string;
          completed_at?: string | null;
        };
      };
      duel_participants: {
        Row: {
          participant_id: string;
          duel_id: string;
          user_id: string;
          submission_video_url: string | null;
          score: number | null;
          completion_time_seconds: number | null;
          criteria_met: any; // JSONB
          joined_at: string;
          submitted_at: string | null;
        };
        Insert: {
          participant_id?: string;
          duel_id: string;
          user_id: string;
          submission_video_url?: string | null;
          score?: number | null;
          completion_time_seconds?: number | null;
          criteria_met?: any; // JSONB
          joined_at?: string;
          submitted_at?: string | null;
        };
        Update: {
          participant_id?: string;
          duel_id?: string;
          user_id?: string;
          submission_video_url?: string | null;
          score?: number | null;
          completion_time_seconds?: number | null;
          criteria_met?: any; // JSONB
          joined_at?: string;
          submitted_at?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
} 
import {supabase} from './supabase';

// Types for our data
export interface Challenge {
  challenge_id: string;
  skill_id: string;
  level: number;
  title: string;
  description: string;
  instruction_video_url?: string;
  success_criteria: any;
  ai_judging_prompt?: string;
  estimated_time_minutes: number;
  xp_reward: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  is_active: boolean;
  created_at: string;
}

export interface Skill {
  skill_id: string;
  name: string;
  description: string;
  category: string;
  icon_url?: string;
  is_premium: boolean;
  is_active: boolean;
  difficulty_level: number;
  created_at: string;
}

export interface UserSkill {
  user_skill_id: string;
  user_id: string;
  skill_id: string;
  current_level: number;
  xp_in_skill: number;
  is_active: boolean;
  started_at: string;
  skills?: Skill;
}

export interface Duel {
  duel_id: string;
  challenge_id: string;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  winner_id?: string;
  max_participants: number;
  time_limit_minutes: number;
  created_at: string;
  completed_at?: string;
}

export interface DuelParticipant {
  participant_id: string;
  duel_id: string;
  user_id: string;
  submission_video_url?: string;
  score?: number;
  completion_time_seconds?: number;
  criteria_met: any;
  joined_at: string;
  submitted_at?: string;
}

// Data service functions
export class DataService {
  // Skills
  static async getSkills(category?: string): Promise<Skill[]> {
    if (!supabase) {
      // Return mock data if Supabase is not available
      return [
        {
          skill_id: '1',
          name: 'JavaScript',
          description: 'Learn JavaScript programming fundamentals',
          category: 'Technology',
          is_premium: false,
          is_active: true,
          difficulty_level: 1,
          created_at: new Date().toISOString(),
        },
        {
          skill_id: '2',
          name: 'Public Speaking',
          description: 'Improve your presentation skills',
          category: 'Life Skills',
          is_premium: false,
          is_active: true,
          difficulty_level: 2,
          created_at: new Date().toISOString(),
        },
        {
          skill_id: '3',
          name: 'Photography',
          description: 'Learn photography basics',
          category: 'Arts & Creative',
          is_premium: false,
          is_active: true,
          difficulty_level: 1,
          created_at: new Date().toISOString(),
        },
      ];
    }

    let query = supabase
      .from('skills')
      .select('*')
      .eq('is_active', true)
      .order('name');

    if (category) {
      query = query.eq('category', category);
    }

    const {data, error} = await query;

    if (error) {
      console.error('Error fetching skills:', error);
      return [];
    }

    return data || [];
  }

  static async getUserSkills(userId: string): Promise<UserSkill[]> {
    if (!supabase) {
      // Return mock data if Supabase is not available
      return [
        {
          user_skill_id: '1',
          user_id: userId,
          skill_id: '1',
          current_level: 3,
          xp_in_skill: 350,
          is_active: true,
          started_at: new Date().toISOString(),
          skills: {
            skill_id: '1',
            name: 'JavaScript',
            description: 'Learn JavaScript programming fundamentals',
            category: 'Technology',
            is_premium: false,
            is_active: true,
            difficulty_level: 1,
            created_at: new Date().toISOString(),
          },
        },
        {
          user_skill_id: '2',
          user_id: userId,
          skill_id: '2',
          current_level: 2,
          xp_in_skill: 180,
          is_active: true,
          started_at: new Date().toISOString(),
          skills: {
            skill_id: '2',
            name: 'Public Speaking',
            description: 'Improve your presentation skills',
            category: 'Life Skills',
            is_premium: false,
            is_active: true,
            difficulty_level: 2,
            created_at: new Date().toISOString(),
          },
        },
      ];
    }

    const {data, error} = await supabase
      .from('user_skills')
      .select(`
        *,
        skills (*)
      `)
      .eq('user_id', userId)
      .eq('is_active', true);

    if (error) {
      console.error('Error fetching user skills:', error);
      return [];
    }

    return data || [];
  }

  // Challenges
  static async getDailyChallenge(userId: string): Promise<Challenge | null> {
    if (!supabase) {
      // Return mock challenge if Supabase is not available
      return {
        challenge_id: 'demo-1',
        skill_id: '1',
        level: 1,
        title: '5-Minute JavaScript Array Methods',
        description: 'Practice JavaScript array methods like map, filter, and reduce',
        success_criteria: [
          'Use at least 3 different array methods',
          'Code should be clean and readable',
          'All tests should pass',
        ],
        estimated_time_minutes: 5,
        xp_reward: 50,
        difficulty: 'Beginner',
        is_active: true,
        created_at: new Date().toISOString(),
      };
    }

    // First, check if user has a daily challenge assigned for today
    const today = new Date().toISOString().split('T')[0];
    
    const {data: dailyChallenge, error: dailyError} = await supabase
      .from('daily_challenges')
      .select(`
        *,
        challenges (
          *,
          skills (name, category)
        )
      `)
      .eq('user_id', userId)
      .eq('assigned_date', today)
      .single();

    if (!dailyError && dailyChallenge) {
      return dailyChallenge.challenges;
    }

    // If no daily challenge assigned, assign one
    const {data: availableChallenges, error: challengesError} = await supabase
      .from('challenges')
      .select('*')
      .eq('is_active', true)
      .eq('level', 1) // Start with beginner challenges
      .limit(1);

    if (challengesError || !availableChallenges?.length) {
      console.error('Error fetching available challenges:', challengesError);
      return null;
    }

    const challenge = availableChallenges[0];

    // Assign the daily challenge
    const {error: assignError} = await supabase
      .from('daily_challenges')
      .insert({
        user_id: userId,
        challenge_id: challenge.challenge_id,
        assigned_date: today,
      });

    if (assignError) {
      console.error('Error assigning daily challenge:', assignError);
    }

    return challenge;
  }

  static async getChallengesBySkill(skillId: string, level?: number): Promise<Challenge[]> {
    if (!supabase) {
      return []; // Return empty array in demo mode
    }

    let query = supabase
      .from('challenges')
      .select('*')
      .eq('skill_id', skillId)
      .eq('is_active', true)
      .order('level');

    if (level) {
      query = query.eq('level', level);
    }

    const {data, error} = await query;

    if (error) {
      console.error('Error fetching challenges:', error);
      return [];
    }

    return data || [];
  }

  // Duels
  static async getActiveDuels(userId: string): Promise<any[]> {
    if (!supabase) {
      // Return mock duels if Supabase is not available
      return [
        {
          duel_id: 'demo-duel-1',
          challenge: {
            title: 'JavaScript Array Methods',
            skill: 'JavaScript',
          },
          opponent: 'AI Opponent',
          status: 'waiting_for_opponent',
          timeRemaining: '2h 15m',
        },
      ];
    }

    const {data, error} = await supabase
      .from('duel_participants')
      .select(`
        *,
        duels (
          *,
          challenges (
            title,
            skills (name)
          )
        ),
        users!user_id (username)
      `)
      .eq('user_id', userId)
      .in('duels.status', ['pending', 'active']);

    if (error) {
      console.error('Error fetching active duels:', error);
      return [];
    }

    return data || [];
  }

  static async createDuel(challengeId: string, participantIds: string[]): Promise<string | null> {
    if (!supabase) {
      console.log('Demo mode: Duel created successfully');
      return 'demo-duel-' + Date.now();
    }

    // Create the duel
    const {data: duel, error: duelError} = await supabase
      .from('duels')
      .insert({
        challenge_id: challengeId,
        status: 'pending',
        max_participants: participantIds.length,
      })
      .select()
      .single();

    if (duelError) {
      console.error('Error creating duel:', duelError);
      return null;
    }

    // Add participants
    const participants = participantIds.map(userId => ({
      duel_id: duel.duel_id,
      user_id: userId,
    }));

    const {error: participantError} = await supabase
      .from('duel_participants')
      .insert(participants);

    if (participantError) {
      console.error('Error adding duel participants:', participantError);
      return null;
    }

    return duel.duel_id;
  }

  // User stats
  static async getUserStats(userId: string) {
    if (!supabase) {
      // Return mock stats if Supabase is not available
      return {
        totalXP: 1250,
        level: 5,
        currentStreak: 7,
        challengesCompleted: 23,
        duelsWon: 8,
        skillsLearned: 3,
      };
    }

    // This would be implemented with a database function for performance
    // For now, we'll fetch basic user data
    const {data: user, error} = await supabase
      .from('users')
      .select('xp_total, streak_count')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Error fetching user stats:', error);
      return {
        totalXP: 0,
        level: 1,
        currentStreak: 0,
        challengesCompleted: 0,
        duelsWon: 0,
        skillsLearned: 0,
      };
    }

    return {
      totalXP: user.xp_total || 0,
      level: Math.floor((user.xp_total || 0) / 100) + 1,
      currentStreak: user.streak_count || 0,
      challengesCompleted: 0, // Would be calculated
      duelsWon: 0, // Would be calculated
      skillsLearned: 0, // Would be calculated
    };
  }
} 
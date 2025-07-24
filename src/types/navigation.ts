export type RootStackParamList = {
  Auth: undefined;
  Onboarding: undefined;
  Main: undefined;
  ChallengeDetail: {
    challengeId: string;
    skillId?: string;
  };
  Record: {
    challengeId: string;
    isDuel?: boolean;
    duelId?: string;
  };
  DuelResult: {
    duelId: string;
  };
};

export type RootTabParamList = {
  Home: undefined;
  Duel: {
    selectedSkillId?: string;
  };
  Skills: undefined;
  Profile: undefined;
};

// Additional types for future use
export type User = {
  id: string;
  username: string;
  email: string;
  avatar_url?: string;
  xp_total: number;
  created_at: string;
};

export type Skill = {
  id: string;
  name: string;
  description: string;
  category: string;
  icon_url?: string;
  is_premium: boolean;
};

export type Challenge = {
  id: string;
  skill_id: string;
  level: number;
  title: string;
  instruction_video_url?: string;
  ai_judging_prompt?: string;
  success_criteria: string[];
};

export type Duel = {
  id: string;
  challenge_id: string;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  winner_id?: string;
  created_at: string;
  participants: DuelParticipant[];
};

export type DuelParticipant = {
  id: string;
  duel_id: string;
  user_id: string;
  submission_video_url?: string;
  score?: number;
  submitted_at?: string;
}; 
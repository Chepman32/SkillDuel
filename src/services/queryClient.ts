import {QueryClient} from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache for 5 minutes by default
      staleTime: 5 * 60 * 1000,
      // Keep in cache for 30 minutes
      gcTime: 30 * 60 * 1000,
      // Retry failed requests up to 3 times
      retry: 3,
      // Don't refetch on window focus by default (can be enabled per query)
      refetchOnWindowFocus: false,
      // Refetch on reconnect
      refetchOnReconnect: true,
    },
    mutations: {
      // Retry failed mutations once
      retry: 1,
    },
  },
});

// Query keys for consistent caching
export const queryKeys = {
  // Auth
  user: ['user'] as const,
  userProfile: (userId: string) => ['userProfile', userId] as const,

  // Skills
  skills: ['skills'] as const,
  skill: (skillId: string) => ['skill', skillId] as const,
  userSkills: (userId: string) => ['userSkills', userId] as const,

  // Challenges
  challenges: ['challenges'] as const,
  challenge: (challengeId: string) => ['challenge', challengeId] as const,
  challengesBySkill: (skillId: string) => ['challenges', 'skill', skillId] as const,
  dailyChallenge: (userId: string) => ['dailyChallenge', userId] as const,

  // Submissions
  submissions: ['submissions'] as const,
  submission: (submissionId: string) => ['submission', submissionId] as const,
  userSubmissions: (userId: string) => ['submissions', 'user', userId] as const,

  // Duels
  duels: ['duels'] as const,
  duel: (duelId: string) => ['duel', duelId] as const,
  userDuels: (userId: string) => ['duels', 'user', userId] as const,
  activeDuels: (userId: string) => ['duels', 'active', userId] as const,

  // Leaderboards
  leaderboard: (skillId?: string) => 
    skillId ? ['leaderboard', skillId] as const : ['leaderboard'] as const,
} as const; 
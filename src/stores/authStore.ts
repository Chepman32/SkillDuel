import {create} from 'zustand';
import {User, Session} from '@supabase/supabase-js';
import {supabase} from '../services/supabase';

interface UserProfile {
  user_id: string;
  username: string;
  email: string;
  profile_avatar_url: string | null;
  xp_total: number;
  created_at: string;
}

interface AuthState {
  // State
  user: User | null;
  userProfile: UserProfile | null;
  session: Session | null;
  loading: boolean;
  initialized: boolean;

  // Actions
  setUser: (user: User | null) => void;
  setUserProfile: (profile: UserProfile | null) => void;
  setSession: (session: Session | null) => void;
  setLoading: (loading: boolean) => void;
  setInitialized: (initialized: boolean) => void;
  signOut: () => Promise<void>;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  // Initial state
  user: null,
  userProfile: null,
  session: null,
  loading: true,
  initialized: false,

  // Actions
  setUser: (user) => set({user}),
  setUserProfile: (userProfile) => set({userProfile}),
  setSession: (session) => set({session}),
  setLoading: (loading) => set({loading}),
  setInitialized: (initialized) => set({initialized}),

  signOut: async () => {
    set({loading: true});
    try {
      if (supabase) {
        await supabase.auth.signOut();
      }
      set({
        user: null,
        userProfile: null,
        session: null,
        loading: false,
      });
    } catch (error) {
      console.error('Error signing out:', error);
      set({loading: false});
    }
  },

  initializeAuth: async () => {
    try {
      set({loading: true});

      // Check if Supabase is configured
      if (!supabase) {
        console.log('Supabase not configured - running in demo mode');
        set({loading: false, initialized: true});
        return;
      }

      // Get initial session
      const {data: {session}, error: sessionError} = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error('Error getting session:', sessionError);
        set({loading: false, initialized: true});
        return;
      }

      if (session) {
        set({
          user: session.user,
          session,
        });

        // Get user profile
        const {data: profile, error: profileError} = await supabase
          .from('users')
          .select('*')
          .eq('auth_id', session.user.id)
          .single();

        if (profileError) {
          console.error('Error getting user profile:', profileError);
        } else {
          set({userProfile: profile});
        }
      }

      set({loading: false, initialized: true});

      // Listen for auth changes
      if (supabase) {
        supabase.auth.onAuthStateChange(async (event, session) => {
        console.log('Auth state changed:', event, session);

        if (session) {
          set({
            user: session.user,
            session,
          });

          // Get or create user profile
          if (event === 'SIGNED_IN' && supabase) {
            const {data: profile, error: profileError} = await supabase
              .from('users')
              .select('*')
              .eq('auth_id', session.user.id)
              .single();

            if (profileError && profileError.code === 'PGRST116') {
              // User profile doesn't exist, create one
              const newProfile = {
                auth_id: session.user.id,
                username: session.user.user_metadata?.username || session.user.email?.split('@')[0] || 'User',
                email: session.user.email || '',
                xp_total: 0,
              };

              const {data: createdProfile, error: createError} = await supabase
                .from('users')
                .insert(newProfile)
                .select()
                .single();

              if (createError) {
                console.error('Error creating user profile:', createError);
              } else {
                set({userProfile: createdProfile});
              }
            } else if (!profileError) {
              set({userProfile: profile});
            }
          }
        } else {
          set({
            user: null,
            userProfile: null,
            session: null,
          });
        }
      });
      }

    } catch (error) {
      console.error('Error initializing auth:', error);
      set({loading: false, initialized: true});
    }
  },
})); 
import {supabase} from './supabase';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {Alert} from 'react-native';

// Configure Google Sign In
GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/userinfo.email'],
  webClientId: 'YOUR_GOOGLE_WEB_CLIENT_ID', // Replace with your actual web client ID
  offlineAccess: true,
  hostedDomain: '',
  forceCodeForRefreshToken: true,
});

export class AuthService {
  // Google OAuth
  static async signInWithGoogle(): Promise<{success: boolean; error?: string}> {
    try {
      if (!supabase) {
        console.log('Demo mode: Google sign in simulated');
        return {success: true};
      }

      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const {data, error} = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: idToken,
      });

      if (error) {
        console.error('Google sign in error:', error);
        return {success: false, error: error.message};
      }

      return {success: true};
    } catch (error: any) {
      console.error('Google sign in error:', error);
      
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        return {success: false, error: 'Sign in was cancelled'};
      } else if (error.code === statusCodes.IN_PROGRESS) {
        return {success: false, error: 'Sign in already in progress'};
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        return {success: false, error: 'Play services not available'};
      } else {
        return {success: false, error: 'Google sign in failed'};
      }
    }
  }

  // Apple OAuth (iOS only)
  static async signInWithApple(): Promise<{success: boolean; error?: string}> {
    try {
      if (!supabase) {
        console.log('Demo mode: Apple sign in simulated');
        return {success: true};
      }

      // Note: This is a placeholder implementation
      // You would need to install and configure @react-native-apple-authentication
      // For now, we'll just show an alert
      Alert.alert(
        'Apple Sign In',
        'Apple Sign In is not yet configured. Please use Google Sign In or continue as guest.',
        [{text: 'OK'}]
      );
      
      return {success: false, error: 'Apple Sign In not configured yet'};
    } catch (error: any) {
      console.error('Apple sign in error:', error);
      return {success: false, error: 'Apple sign in failed'};
    }
  }

  // Guest sign in (anonymous)
  static async signInAsGuest(): Promise<{success: boolean; error?: string}> {
    try {
      if (!supabase) {
        console.log('Demo mode: Guest sign in simulated');
        return {success: true};
      }

      const {data, error} = await supabase.auth.signInAnonymously();

      if (error) {
        console.error('Guest sign in error:', error);
        return {success: false, error: error.message};
      }

      return {success: true};
    } catch (error: any) {
      console.error('Guest sign in error:', error);
      return {success: false, error: 'Guest sign in failed'};
    }
  }

  // Sign out
  static async signOut(): Promise<{success: boolean; error?: string}> {
    try {
      // Sign out from Google if signed in
      const isSignedIn = await GoogleSignin.isSignedIn();
      if (isSignedIn) {
        await GoogleSignin.signOut();
      }

      // Sign out from Supabase
      if (supabase) {
        const {error} = await supabase.auth.signOut();
        if (error) {
          console.error('Sign out error:', error);
          return {success: false, error: error.message};
        }
      }

      return {success: true};
    } catch (error: any) {
      console.error('Sign out error:', error);
      return {success: false, error: 'Sign out failed'};
    }
  }

  // Check current session
  static async getCurrentSession() {
    try {
      if (!supabase) {
        return null;
      }

      const {data: {session}, error} = await supabase.auth.getSession();
      
      if (error) {
        console.error('Get session error:', error);
        return null;
      }

      return session;
    } catch (error) {
      console.error('Get session error:', error);
      return null;
    }
  }

  // Refresh session
  static async refreshSession() {
    try {
      if (!supabase) {
        return null;
      }

      const {data: {session}, error} = await supabase.auth.refreshSession();
      
      if (error) {
        console.error('Refresh session error:', error);
        return null;
      }

      return session;
    } catch (error) {
      console.error('Refresh session error:', error);
      return null;
    }
  }

  // Update user profile
  static async updateProfile(updates: {
    username?: string;
    avatar_url?: string;
    full_name?: string;
  }): Promise<{success: boolean; error?: string}> {
    try {
      if (!supabase) {
        console.log('Demo mode: Profile update simulated');
        return {success: true};
      }

      const {data, error} = await supabase.auth.updateUser({
        data: updates
      });

      if (error) {
        console.error('Update profile error:', error);
        return {success: false, error: error.message};
      }

      return {success: true};
    } catch (error: any) {
      console.error('Update profile error:', error);
      return {success: false, error: 'Profile update failed'};
    }
  }
} 
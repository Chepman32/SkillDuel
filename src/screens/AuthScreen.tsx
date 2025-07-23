import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {RootStackParamList} from '../types/navigation';
import {AuthService} from '../services/authService';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = NativeStackScreenProps<RootStackParamList, 'Auth'>;

const AuthScreen: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();

  // Test if translations are working
  const testTranslation = (key: string, fallback: string) => {
    const translation = t(key);
    return translation === key ? fallback : translation;
  };

  const handleGoogleLogin = async () => {
    console.log('Google login pressed');
    const result = await AuthService.signInWithGoogle();
    
    if (result.success) {
      // Navigation will be handled by the auth state change listener
      console.log('Google sign in successful');
    } else {
      console.error('Google sign in failed:', result.error);
      // Could show an alert or toast here
    }
  };

  const handleAppleLogin = async () => {
    console.log('Apple login pressed');
    const result = await AuthService.signInWithApple();
    
    if (result.success) {
      // Navigation will be handled by the auth state change listener
      console.log('Apple sign in successful');
    } else {
      console.error('Apple sign in failed:', result.error);
      // Could show an alert or toast here
    }
  };

  const handleGuestLogin = async () => {
    console.log('Guest login pressed');
    const result = await AuthService.signInAsGuest();
    
    if (result.success) {
      console.log('Guest sign in successful');
      // Navigate to onboarding since we're in demo mode
      navigation.navigate('Onboarding');
    } else {
      console.error('Guest sign in failed:', result.error);
      // Could show an alert or toast here
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo and branding */}
        <View style={styles.branding}>
          <View style={styles.logoContainer}>
            <Icon name="sports-esports" size={80} color="#6366f1" />
          </View>
          <Text style={styles.appName}>SkillDuel</Text>
          <Text style={styles.tagline}>{testTranslation('auth.subtitle', 'Master any skill, challenge the world')}</Text>
        </View>

        {/* Login buttons */}
        <View style={styles.loginSection}>
          <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
            <Icon name="login" size={20} color="#4285f4" />
            <Text style={styles.googleButtonText}>{testTranslation('auth.signInWithGoogle', 'Sign in with Google')}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.appleButton} onPress={handleAppleLogin}>
            <Icon name="apple" size={20} color="white" />
            <Text style={styles.appleButtonText}>{testTranslation('auth.signInWithApple', 'Sign in with Apple')}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.guestButton} onPress={handleGuestLogin}>
            <Icon name="person-outline" size={20} color="#6366f1" />
            <Text style={styles.guestButtonText}>{testTranslation('auth.signInGuest', 'Continue as Guest')}</Text>
          </TouchableOpacity>

          <Text style={styles.termsText}>
            By continuing, you agree to our Terms of Service and Privacy Policy
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  branding: {
    alignItems: 'center',
    marginTop: 80,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 24,
  },
  tagline: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 24,
  },
  loginSection: {
    gap: 16,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    gap: 12,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  appleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 12,
  },
  appleButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  guestButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#6366f1',
    gap: 12,
  },
  guestButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6366f1',
  },
  termsText: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 16,
  },
});

export default AuthScreen; 
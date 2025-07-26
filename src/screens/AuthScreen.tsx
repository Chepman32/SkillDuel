import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ActivityIndicator,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {RootStackParamList} from '../types/navigation';
import {AuthService} from '../services/authService';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = NativeStackScreenProps<RootStackParamList, 'Auth'>;

const AuthScreen: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  // Test if translations are working
  const testTranslation = (key: string, fallback: string) => {
    const translation = t(key);
    return translation === key ? fallback : translation;
  };

  const handleGoogleLogin = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    console.log('Google login pressed');
    
    try {
      const result = await AuthService.signInWithGoogle();
      
      if (result.success) {
        console.log('Google sign in successful');
        navigation.reset({
          index: 0,
          routes: [{ name: 'Onboarding' }],
        });
      } else {
        console.error('Google sign in failed:', result.error);
        // Could show an alert or toast here
      }
    } catch (error) {
      console.error('Google login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAppleLogin = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    console.log('Apple login pressed');
    
    try {
      const result = await AuthService.signInWithApple();
      
      if (result.success) {
        // Navigation will be handled by the auth state change listener
        console.log('Apple sign in successful');
      } else {
        console.error('Apple sign in failed:', result.error);
        // Could show an alert or toast here
      }
    } catch (error) {
      console.error('Apple login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    console.log('Guest login pressed');
    
    try {
      const result = await AuthService.signInAsGuest();
      
      if (result.success) {
        console.log('Guest sign in successful');
        navigation.reset({
          index: 0,
          routes: [{ name: 'Onboarding' }],
        });
      } else {
        console.error('Guest sign in failed:', result.error);
        // Could show an alert or toast here
      }
    } catch (error) {
      console.error('Guest login error:', error);
    } finally {
      setIsLoading(false);
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

        {/* Loading indicator */}
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#6366f1" />
            <Text style={styles.loadingText}>Signing you in...</Text>
          </View>
        )}

        {/* Login buttons */}
        <View style={styles.loginSection}>
          <TouchableOpacity 
            style={[styles.googleButton, isLoading && styles.disabledButton]} 
            onPress={handleGoogleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#4285f4" />
            ) : (
              <Icon name="login" size={20} color="#4285f4" />
            )}
            <Text style={[styles.googleButtonText, isLoading && styles.disabledText]}>
              {testTranslation('auth.signInWithGoogle', 'Sign in with Google')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.appleButton, isLoading && styles.disabledButton]} 
            onPress={handleAppleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Icon name="apple" size={20} color="white" />
            )}
            <Text style={[styles.appleButtonText, isLoading && styles.disabledText]}>
              {testTranslation('auth.signInWithApple', 'Sign in with Apple')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.guestButton, isLoading && styles.disabledButton]} 
            onPress={handleGuestLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#6366f1" />
            ) : (
              <Icon name="person-outline" size={20} color="#6366f1" />
            )}
            <Text style={[styles.guestButtonText, isLoading && styles.disabledText]}>
              {testTranslation('auth.signInGuest', 'Continue as Guest')}
            </Text>
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
  loadingContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#6366f1',
    marginTop: 12,
    fontWeight: '500',
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
  disabledButton: {
    opacity: 0.6,
  },
  disabledText: {
    opacity: 0.6,
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
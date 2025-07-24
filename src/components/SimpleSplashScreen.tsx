import React, {useEffect, useRef} from 'react';
import {View, Image, Dimensions, StyleSheet, Text, Animated as RNAnimated} from 'react-native';

const {width, height} = Dimensions.get('window');

interface SimpleSplashScreenProps {
  onAnimationComplete: () => void;
}

const SimpleSplashScreen: React.FC<SimpleSplashScreenProps> = ({
  onAnimationComplete,
}) => {
  const backgroundOpacity = useRef(new RNAnimated.Value(0)).current;
  const logoOpacity = useRef(new RNAnimated.Value(0)).current;
  const logoScale = useRef(new RNAnimated.Value(0.5)).current;
  const textOpacity = useRef(new RNAnimated.Value(0)).current;
  const overallOpacity = useRef(new RNAnimated.Value(1)).current;

  useEffect(() => {
    const startAnimation = () => {
      // Phase 1: Background fade in
      RNAnimated.timing(backgroundOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();

      // Phase 2: Logo animation with delay
      RNAnimated.parallel([
        RNAnimated.timing(logoOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        RNAnimated.timing(logoScale, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start();

      // Phase 3: Text animation
      RNAnimated.timing(textOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
        delay: 800,
      }).start();

      // Phase 4: Fade out and complete
      setTimeout(() => {
        RNAnimated.timing(overallOpacity, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }).start(() => {
          onAnimationComplete();
        });
      }, 3000);
    };

    startAnimation();
  }, [backgroundOpacity, logoOpacity, logoScale, textOpacity, overallOpacity, onAnimationComplete]);

  return (
    <RNAnimated.View style={[styles.container, {opacity: overallOpacity}]}>
      <RNAnimated.View style={[styles.background, {opacity: backgroundOpacity}]}>
        <Image
          source={require('../assets/images/Splash screen_1024×1536.png')}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
      </RNAnimated.View>
      
      <RNAnimated.View 
        style={[
          styles.logoContainer, 
          {
            opacity: logoOpacity,
            transform: [{scale: logoScale}],
          }
        ]}
      >
        <View style={styles.logoWrapper}>
          <Image
            source={require('../assets/icons/icon-1024.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      </RNAnimated.View>

      <RNAnimated.View style={[styles.textContainer, {opacity: textOpacity}]}>
        <Text style={styles.appName}>SkillDuel</Text>
        <Text style={styles.tagline}>Challenge Your Skills</Text>
      </RNAnimated.View>
    </RNAnimated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  logoContainer: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: [{translateX: -60}, {translateY: -60}],
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrapper: {
    width: 120,
    height: 120,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 16,
  },
  textContainer: {
    position: 'absolute',
    bottom: '25%',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 4,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.9,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 2,
  },
});

export default SimpleSplashScreen; 
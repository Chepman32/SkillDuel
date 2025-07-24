import React, {useEffect, useRef} from 'react';
import {View, Image, Dimensions, StyleSheet, Text, Animated} from 'react-native';

const {width, height} = Dimensions.get('window');

interface AnimatedSplashScreenProps {
  onAnimationComplete: () => void;
}

const AnimatedSplashScreen: React.FC<AnimatedSplashScreenProps> = ({
  onAnimationComplete,
}) => {
  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const startAnimation = () => {
      // Show full screen splash for 2.5 seconds, then bake to corner
      setTimeout(() => {
        Animated.parallel([
          Animated.spring(scale, {
            toValue: 0.2,
            useNativeDriver: true,
            tension: 100,
            friction: 20,
          }),
          Animated.spring(translateX, {
            toValue: width * 0.4,
            useNativeDriver: true,
            tension: 100,
            friction: 20,
          }),
          Animated.spring(translateY, {
            toValue: -height * 0.4,
            useNativeDriver: true,
            tension: 100,
            friction: 20,
          }),
        ]).start();

        // Fade out after baking animation
        setTimeout(() => {
          Animated.timing(opacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }).start(() => {
            onAnimationComplete();
          });
        }, 1500);
      }, 2500);
    };

    startAnimation();
  }, [scale, translateX, translateY, opacity, onAnimationComplete]);

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.splashContainer, 
          {
            transform: [
              {scale},
              {translateX},
              {translateY},
            ],
            opacity,
          }
        ]}
      >
        <Image
          source={require('../assets/images/Splash screen_1024×1536.png')}
          style={styles.backgroundImage}
          resizeMode="cover"
        />
        
        <View style={styles.overlay}>
          <View style={styles.logoContainer}>
            <View style={styles.logoWrapper}>
              <Image
                source={require('../assets/icons/icon-1024.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
          </View>
          
          <View style={styles.textContainer}>
            <Text style={styles.appName}>SkillDuel</Text>
            <Text style={styles.tagline}>Challenge Your Skills</Text>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  splashContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
    borderRadius: 20,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    position: 'absolute',
    top: '40%',
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

export default AnimatedSplashScreen; 
import React, {useState} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import AnimatedSplashScreen from './AnimatedSplashScreen';

interface SplashScreenWrapperProps {
  children: React.ReactNode;
}

const SplashScreenWrapper: React.FC<SplashScreenWrapperProps> = ({children}) => {
  const [showSplash, setShowSplash] = useState(true);

  const handleAnimationComplete = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <AnimatedSplashScreen onAnimationComplete={handleAnimationComplete} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SplashScreenWrapper; 
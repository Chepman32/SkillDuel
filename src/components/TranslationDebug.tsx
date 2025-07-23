import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';

const TranslationDebug: React.FC = () => {
  const {t, i18n} = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Current Language: {i18n.language}</Text>
      <Text style={styles.text}>Auth Subtitle: {t('auth.subtitle')}</Text>
      <Text style={styles.text}>Google Sign In: {t('auth.signInWithGoogle')}</Text>
      <Text style={styles.text}>Apple Sign In: {t('auth.signInWithApple')}</Text>
      <Text style={styles.text}>Guest Sign In: {t('auth.signInGuest')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f0f0f0',
    margin: 16,
    borderRadius: 8,
  },
  text: {
    fontSize: 12,
    color: '#333',
    marginBottom: 4,
  },
});

export default TranslationDebug; 
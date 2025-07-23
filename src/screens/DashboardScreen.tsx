import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {useQuery} from '@tanstack/react-query';
import {RootTabParamList, RootStackParamList} from '../types/navigation';
import {useAuthStore} from '../stores/authStore';
import {DataService, Challenge, UserSkill} from '../services/dataService';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;

const {width} = Dimensions.get('window');

const DashboardScreen: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const {user, userProfile} = useAuthStore();
  
  // Get user stats
  const {data: userStats} = useQuery({
    queryKey: ['userStats', userProfile?.user_id],
    queryFn: () => userProfile ? DataService.getUserStats(userProfile.user_id) : null,
    enabled: !!userProfile,
  });

  // Get daily challenge
  const {data: dailyChallenge} = useQuery({
    queryKey: ['dailyChallenge', userProfile?.user_id],
    queryFn: () => userProfile ? DataService.getDailyChallenge(userProfile.user_id) : null,
    enabled: !!userProfile,
  });

  // Get user skills
  const {data: userSkills} = useQuery({
    queryKey: ['userSkills', userProfile?.user_id],
    queryFn: () => userProfile ? DataService.getUserSkills(userProfile.user_id) : [],
    enabled: !!userProfile,
  });

  const handleStartChallenge = () => {
    if (dailyChallenge) {
      navigation.navigate('ChallengeDetail', {
        challengeId: dailyChallenge.challenge_id,
      });
    }
  };

  const handleStartDuel = () => {
    navigation.navigate('Duel');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning,</Text>
            <Text style={styles.username}>{t('dashboard.greeting', {name: userProfile?.username || 'Guest'})}</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Icon name="person" size={24} color="#6366f1" />
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Icon name="emoji-events" size={24} color="#f59e0b" />
            <Text style={styles.statValue}>{userStats?.totalXP || 0}</Text>
            <Text style={styles.statLabel}>{t('dashboard.totalXP')}</Text>
          </View>
          <View style={styles.statCard}>
            <Icon name="trending-up" size={24} color="#10b981" />
            <Text style={styles.statValue}>{t('dashboard.level', {level: userStats?.level || 1})}</Text>
            <Text style={styles.statLabel}>Current Level</Text>
          </View>
          <View style={styles.statCard}>
            <Icon name="local-fire-department" size={24} color="#ef4444" />
            <Text style={styles.statValue}>{userStats?.currentStreak || 0}</Text>
            <Text style={styles.statLabel}>{t('dashboard.streakDays', {count: userStats?.currentStreak || 0})}</Text>
          </View>
        </View>

        {/* Daily Challenge */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('dashboard.todaysChallenge')}</Text>
          {dailyChallenge ? (
            <TouchableOpacity 
              style={styles.challengeCard}
              onPress={handleStartChallenge}>
              <View style={styles.challengeHeader}>
                <View style={styles.challengeInfo}>
                  <Text style={styles.challengeTitle}>{dailyChallenge.title}</Text>
                  <Text style={styles.challengeSkill}>Challenge</Text>
                </View>
                <View style={styles.challengeReward}>
                  <Icon name="stars" size={20} color="#f59e0b" />
                  <Text style={styles.xpText}>{dailyChallenge.xp_reward} XP</Text>
                </View>
              </View>
              <View style={styles.challengeDetails}>
                <View style={styles.challengeMetaItem}>
                  <Icon name="schedule" size={16} color="#6b7280" />
                  <Text style={styles.challengeMetaText}>{dailyChallenge.estimated_time_minutes} min</Text>
                </View>
                <View style={styles.challengeMetaItem}>
                  <Icon name="speed" size={16} color="#6b7280" />
                  <Text style={styles.challengeMetaText}>{t(`challenge.difficulty.${dailyChallenge.difficulty.toLowerCase()}`)}</Text>
                </View>
              </View>
              <View style={styles.startButtonContainer}>
                <Text style={styles.startButtonText}>{t('dashboard.startChallenge')}</Text>
                <Icon name="play-arrow" size={20} color="white" />
              </View>
            </TouchableOpacity>
          ) : (
            <View style={styles.challengeCard}>
              <Text style={styles.challengeTitle}>Loading today's challenge...</Text>
            </View>
          )}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('dashboard.quickActions')}</Text>
          <View style={styles.actionsContainer}>
            <TouchableOpacity 
              style={[styles.actionButton, {backgroundColor: '#ef4444'}]}
              onPress={handleStartDuel}>
              <Icon name="sports-esports" size={32} color="white" />
              <Text style={styles.actionButtonText}>Start Duel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, {backgroundColor: '#10b981'}]}>
              <Icon name="library-books" size={32} color="white" />
              <Text style={styles.actionButtonText}>Browse Skills</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Active Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Skills</Text>
          {userSkills && userSkills.length > 0 ? (
            userSkills.map((userSkill, index) => {
              const progress = Math.min((userSkill.xp_in_skill % 100), 100);
              const skillColors = ['#f7df1e', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'];
              const color = skillColors[index % skillColors.length];
              
              return (
                <View key={userSkill.user_skill_id} style={styles.skillCard}>
                  <View style={styles.skillHeader}>
                    <View style={[styles.skillIcon, {backgroundColor: color}]} />
                    <View style={styles.skillInfo}>
                      <Text style={styles.skillName}>{userSkill.skills?.name || 'Unknown Skill'}</Text>
                      <Text style={styles.skillLevel}>Level {userSkill.current_level}</Text>
                    </View>
                    <Text style={styles.skillProgress}>{progress}%</Text>
                  </View>
                  <View style={styles.progressBarContainer}>
                    <View 
                      style={[
                        styles.progressBar, 
                        {
                          width: `${progress}%`,
                          backgroundColor: color,
                        }
                      ]} 
                    />
                  </View>
                </View>
              );
            })
          ) : (
            <Text style={styles.challengeTitle}>No skills selected yet. Start with onboarding!</Text>
          )}
        </View>
      </ScrollView>
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
  },
  greeting: {
    fontSize: 16,
    color: '#6b7280',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  challengeCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  challengeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  challengeInfo: {
    flex: 1,
  },
  challengeTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  challengeSkill: {
    fontSize: 14,
    color: '#6366f1',
    fontWeight: '500',
  },
  challengeReward: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  xpText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f59e0b',
  },
  challengeDetails: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  challengeMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  challengeMetaText: {
    fontSize: 14,
    color: '#6b7280',
  },
  startButtonContainer: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    aspectRatio: 1.5,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
  },
  skillCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  skillHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  skillIcon: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  skillInfo: {
    flex: 1,
  },
  skillName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  skillLevel: {
    fontSize: 14,
    color: '#6b7280',
  },
  skillProgress: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
});

export default DashboardScreen; 
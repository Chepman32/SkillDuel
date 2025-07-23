import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {RootTabParamList} from '../types/navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTranslation} from 'react-i18next';
import {AuthService} from '../services/authService';

type Props = BottomTabScreenProps<RootTabParamList, 'Profile'>;

// Mock data
const mockUserProfile = {
  username: 'Alex_SkillMaster',
  email: 'alex@example.com',
  avatar_url: null,
  xp_total: 1250,
  level: 5,
  streak: 7,
  duels_won: 23,
  duels_lost: 8,
  badges_earned: 12,
  skills_learned: 5,
  joined_date: '2024-01-15',
};

const mockBadges = [
  {id: '1', name: 'First Win', description: 'Won your first duel', icon: 'emoji-events', earned: true},
  {id: '2', name: 'Speed Demon', description: 'Complete 5 challenges in under 3 minutes', icon: 'flash-on', earned: true},
  {id: '3', name: 'Streak Master', description: 'Maintain a 7-day streak', icon: 'local-fire-department', earned: true},
  {id: '4', name: 'Code Ninja', description: 'Master JavaScript fundamentals', icon: 'code', earned: true},
  {id: '5', name: 'Social Butterfly', description: 'Complete 10 duels', icon: 'people', earned: false},
  {id: '6', name: 'Perfectionist', description: 'Score 100% on 5 challenges', icon: 'star', earned: false},
];

const mockRecentActivity = [
  {id: '1', type: 'duel_win', description: 'Won duel vs CodeMaster_99', time: '2 hours ago'},
  {id: '2', type: 'challenge_complete', description: 'Completed JavaScript Arrays challenge', time: '1 day ago'},
  {id: '3', type: 'badge_earned', description: 'Earned "Streak Master" badge', time: '2 days ago'},
  {id: '4', type: 'skill_level_up', description: 'Leveled up in Public Speaking', time: '3 days ago'},
];

const ProfileScreen: React.FC<Props> = ({navigation}) => {
  const {t, i18n} = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language || 'en');
  
  const winRate = Math.round((mockUserProfile.duels_won / (mockUserProfile.duels_won + mockUserProfile.duels_lost)) * 100);
  const earnedBadges = mockBadges.filter(badge => badge.earned);

  const languages = [
    {code: 'en', name: 'English', flag: '🇺🇸'},
    {code: 'de', name: 'Deutsch', flag: '🇩🇪'},
    {code: 'ru', name: 'Русский', flag: '🇷🇺'},
    {code: 'zh', name: '中文', flag: '🇨🇳'},
  ];

  const handleLanguageChange = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    i18n.changeLanguage(languageCode);
  };

  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            const result = await AuthService.signOut();
            if (result.success) {
              // Navigate back to auth screen
              navigation.reset({
                index: 0,
                routes: [{name: 'Auth' as any}],
              });
            } else {
              Alert.alert('Error', 'Failed to sign out. Please try again.');
            }
          },
        },
      ]
    );
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'duel_win': return 'emoji-events';
      case 'challenge_complete': return 'check-circle';
      case 'badge_earned': return 'stars';
      case 'skill_level_up': return 'trending-up';
      default: return 'info';
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'duel_win': return '#f59e0b';
      case 'challenge_complete': return '#10b981';
      case 'badge_earned': return '#8b5cf6';
      case 'skill_level_up': return '#6366f1';
      default: return '#6b7280';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{t('profile.title', 'Profile')}</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Icon name="settings" size={24} color="#6b7280" />
          </TouchableOpacity>
        </View>

        {/* Profile Info */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            {mockUserProfile.avatar_url ? (
              <Image source={{uri: mockUserProfile.avatar_url}} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Icon name="person" size={40} color="#6366f1" />
              </View>
            )}
          </View>
          <Text style={styles.username}>{mockUserProfile.username}</Text>
          <Text style={styles.email}>{mockUserProfile.email}</Text>
          
          <View style={styles.levelContainer}>
            <Text style={styles.levelText}>{t('profile.level', 'Level')} {mockUserProfile.level}</Text>
            <View style={styles.xpContainer}>
              <Text style={styles.xpText}>{mockUserProfile.xp_total} {t('profile.xp', 'XP')}</Text>
            </View>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{mockUserProfile.duels_won}</Text>
            <Text style={styles.statLabel}>{t('profile.duelsWon', 'Duels Won')}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{winRate}%</Text>
            <Text style={styles.statLabel}>{t('profile.winRate', 'Win Rate')}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{mockUserProfile.streak}</Text>
            <Text style={styles.statLabel}>{t('profile.dayStreak', 'Day Streak')}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{earnedBadges.length}</Text>
            <Text style={styles.statLabel}>{t('profile.badges', 'Badges')}</Text>
          </View>
        </View>

        {/* Badges */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('profile.badges', 'Badges')}</Text>
          <View style={styles.badgesContainer}>
            {mockBadges.map(badge => (
              <View 
                key={badge.id} 
                style={[
                  styles.badgeItem,
                  !badge.earned && styles.badgeItemLocked,
                ]}>
                <Icon 
                  name={badge.icon} 
                  size={24} 
                  color={badge.earned ? '#f59e0b' : '#9ca3af'} 
                />
                <Text style={[
                  styles.badgeName,
                  !badge.earned && styles.badgeNameLocked,
                ]}>
                  {badge.name}
                </Text>
                <Text style={[
                  styles.badgeDescription,
                  !badge.earned && styles.badgeDescriptionLocked,
                ]}>
                  {badge.description}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('profile.recentActivity', 'Recent Activity')}</Text>
          <View style={styles.activityContainer}>
            {mockRecentActivity.map(activity => (
              <View key={activity.id} style={styles.activityItem}>
                <View style={[
                  styles.activityIcon,
                  {backgroundColor: getActivityColor(activity.type) + '20'},
                ]}>
                  <Icon 
                    name={getActivityIcon(activity.type)} 
                    size={20} 
                    color={getActivityColor(activity.type)} 
                  />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityDescription}>{activity.description}</Text>
                  <Text style={styles.activityTime}>{activity.time}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Language Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('profile.language', 'Language')}</Text>
          <View style={styles.languageContainer}>
            {languages.map(language => (
              <TouchableOpacity
                key={language.code}
                style={[
                  styles.languageButton,
                  selectedLanguage === language.code && styles.languageButtonSelected,
                ]}
                onPress={() => handleLanguageChange(language.code)}
              >
                <Text style={styles.languageFlag}>{language.flag}</Text>
                <Text style={[
                  styles.languageName,
                  selectedLanguage === language.code && styles.languageNameSelected,
                ]}>
                  {language.name}
                </Text>
                {selectedLanguage === language.code && (
                  <Icon name="check" size={20} color="#6366f1" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Account Actions */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="edit" size={20} color="#6366f1" />
            <Text style={styles.actionButtonText}>{t('profile.editProfile', 'Edit Profile')}</Text>
            <Icon name="chevron-right" size={20} color="#9ca3af" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="notifications" size={20} color="#6366f1" />
            <Text style={styles.actionButtonText}>{t('profile.notifications', 'Notifications')}</Text>
            <Icon name="chevron-right" size={20} color="#9ca3af" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="help" size={20} color="#6366f1" />
            <Text style={styles.actionButtonText}>{t('profile.helpSupport', 'Help & Support')}</Text>
            <Icon name="chevron-right" size={20} color="#9ca3af" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.signOutButton]}
            onPress={handleSignOut}
          >
            <Icon name="logout" size={20} color="#ef4444" />
            <Text style={[styles.actionButtonText, styles.signOutText]}>{t('profile.signOut', 'Sign Out')}</Text>
          </TouchableOpacity>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  settingsButton: {
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
  profileCard: {
    backgroundColor: 'white',
    marginHorizontal: 24,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 16,
  },
  levelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  levelText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6366f1',
  },
  xpContainer: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  xpText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 24,
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
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
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  badgeItem: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    width: '48%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  badgeItemLocked: {
    opacity: 0.5,
  },
  badgeName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginTop: 8,
    textAlign: 'center',
  },
  badgeNameLocked: {
    color: '#9ca3af',
  },
  badgeDescription: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
    textAlign: 'center',
    lineHeight: 16,
  },
  badgeDescriptionLocked: {
    color: '#d1d5db',
  },
  activityContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityDescription: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    color: '#9ca3af',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  actionButtonText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
    marginLeft: 12,
  },
  signOutButton: {
    borderWidth: 1,
    borderColor: '#fecaca',
    backgroundColor: '#fef2f2',
  },
  signOutText: {
    color: '#ef4444',
  },
  languageContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: 'white',
  },
  languageButtonSelected: {
    borderColor: '#6366f1',
    backgroundColor: '#f0f9ff',
  },
  languageFlag: {
    fontSize: 20,
    marginRight: 12,
  },
  languageName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  languageNameSelected: {
    color: '#6366f1',
    fontWeight: '600',
  },
});

export default ProfileScreen; 
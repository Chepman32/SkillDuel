import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootTabParamList, RootStackParamList} from '../types/navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, 'Duel'>,
  NativeStackScreenProps<RootStackParamList>
>;

// Mock data
const mockSkills = [
  {id: '1', name: 'JavaScript', participants: 142, color: '#f7df1e'},
  {id: '2', name: 'Public Speaking', participants: 89, color: '#10b981'},
  {id: '3', name: 'Photography', participants: 67, color: '#f59e0b'},
  {id: '4', name: 'Guitar', participants: 45, color: '#8b5cf6'},
];

const mockActiveDuels = [
  {
    id: '1',
    skill: 'JavaScript',
    opponent: 'Sarah_Dev',
    status: 'waiting_for_opponent' as const,
    timeRemaining: '2h 15m',
  },
  {
    id: '2',
    skill: 'Photography',
    opponent: 'PhotoMaster99',
    status: 'your_turn' as const,
    timeRemaining: '45m',
  },
];

const DuelScreen: React.FC<Props> = ({navigation}) => {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const handleSkillSelect = (skillId: string) => {
    setSelectedSkill(skillId);
  };

  const handleStartDuel = () => {
    if (selectedSkill) {
      // Navigate to challenge detail for duel
      navigation.navigate('ChallengeDetail', {
        challengeId: 'duel-challenge-1',
        skillId: selectedSkill,
      });
    }
  };

  const handleViewDuel = (duelId: string) => {
    navigation.navigate('DuelResult', {duelId});
  };

  const renderSkillItem = ({item}: {item: typeof mockSkills[0]}) => (
    <TouchableOpacity
      style={[
        styles.skillItem,
        selectedSkill === item.id && styles.skillItemSelected,
      ]}
      onPress={() => handleSkillSelect(item.id)}>
      <View style={[styles.skillDot, {backgroundColor: item.color}]} />
      <View style={styles.skillInfo}>
        <Text style={styles.skillName}>{item.name}</Text>
        <Text style={styles.skillParticipants}>
          {item.participants} active players
        </Text>
      </View>
      <Icon 
        name={selectedSkill === item.id ? 'radio-button-checked' : 'radio-button-unchecked'} 
        size={24} 
        color={selectedSkill === item.id ? '#6366f1' : '#9ca3af'} 
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Duels</Text>
          <Text style={styles.subtitle}>
            Challenge opponents and prove your skills
          </Text>
        </View>

        {/* Duel Tickets */}
        <View style={styles.ticketsCard}>
          <View style={styles.ticketsInfo}>
            <Icon name="confirmation-number" size={24} color="#6366f1" />
            <Text style={styles.ticketsText}>3 Duel Tickets Remaining</Text>
          </View>
          <TouchableOpacity style={styles.buyTicketsButton}>
            <Text style={styles.buyTicketsText}>Buy More</Text>
          </TouchableOpacity>
        </View>

        {/* Active Duels */}
        {mockActiveDuels.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Active Duels</Text>
            {mockActiveDuels.map(duel => (
              <TouchableOpacity
                key={duel.id}
                style={styles.activeDuelCard}
                onPress={() => handleViewDuel(duel.id)}>
                <View style={styles.activeDuelHeader}>
                  <View>
                    <Text style={styles.activeDuelSkill}>{duel.skill}</Text>
                    <Text style={styles.activeDuelOpponent}>vs {duel.opponent}</Text>
                  </View>
                  <View style={styles.duelStatusContainer}>
                    <View style={[
                      styles.statusDot,
                      {backgroundColor: duel.status === 'your_turn' ? '#ef4444' : '#f59e0b'},
                    ]} />
                    <Text style={styles.duelTime}>{duel.timeRemaining}</Text>
                  </View>
                </View>
                <Text style={[
                  styles.duelStatus,
                  {color: duel.status === 'your_turn' ? '#ef4444' : '#f59e0b'},
                ]}>
                  {duel.status === 'your_turn' ? 'Your Turn!' : 'Waiting for opponent'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* New Duel */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Start New Duel</Text>
          <Text style={styles.sectionSubtitle}>
            Choose a skill to find an opponent
          </Text>
          
          <FlatList
            data={mockSkills}
            renderItem={renderSkillItem}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            style={styles.skillsList}
          />

          <TouchableOpacity
            style={[
              styles.startDuelButton,
              selectedSkill ? styles.startDuelButtonActive : styles.startDuelButtonInactive,
            ]}
            onPress={handleStartDuel}
            disabled={!selectedSkill}>
            <Icon name="sports-esports" size={20} color="white" />
            <Text style={styles.startDuelButtonText}>
              {selectedSkill ? 'Find Opponent' : 'Select a Skill'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Leaderboard Preview */}
        <View style={styles.section}>
          <View style={styles.leaderboardHeader}>
            <Text style={styles.sectionTitle}>Leaderboard</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.leaderboardCard}>
            <View style={styles.leaderboardItem}>
              <Text style={styles.rank}>1</Text>
              <Text style={styles.playerName}>CodeNinja_42</Text>
              <Text style={styles.wins}>127 wins</Text>
            </View>
            <View style={styles.leaderboardItem}>
              <Text style={styles.rank}>2</Text>
              <Text style={styles.playerName}>DevMaster</Text>
              <Text style={styles.wins}>119 wins</Text>
            </View>
            <View style={styles.leaderboardItem}>
              <Text style={styles.rank}>3</Text>
              <Text style={styles.playerName}>QuickDraw_JS</Text>
              <Text style={styles.wins}>98 wins</Text>
            </View>
          </View>
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
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 4,
  },
  ticketsCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 24,
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  ticketsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ticketsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  buyTicketsButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buyTicketsText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
  },
  activeDuelCard: {
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
  activeDuelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  activeDuelSkill: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  activeDuelOpponent: {
    fontSize: 14,
    color: '#6b7280',
  },
  duelStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  duelTime: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
  },
  duelStatus: {
    fontSize: 14,
    fontWeight: '500',
  },
  skillsList: {
    marginBottom: 20,
  },
  skillItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  skillItemSelected: {
    borderColor: '#6366f1',
    backgroundColor: '#f0f9ff',
  },
  skillDot: {
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
  skillParticipants: {
    fontSize: 14,
    color: '#6b7280',
  },
  startDuelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  startDuelButtonActive: {
    backgroundColor: '#6366f1',
  },
  startDuelButtonInactive: {
    backgroundColor: '#9ca3af',
  },
  startDuelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  leaderboardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 14,
    color: '#6366f1',
    fontWeight: '500',
  },
  leaderboardCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  rank: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f59e0b',
    width: 30,
  },
  playerName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
    marginLeft: 12,
  },
  wins: {
    fontSize: 14,
    color: '#6b7280',
  },
});

export default DuelScreen; 
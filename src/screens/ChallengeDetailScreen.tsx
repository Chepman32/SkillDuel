import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigation';
import {getRandomChallengeForSkill, getChallengeById, Challenge} from '../data/challenges';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = NativeStackScreenProps<RootStackParamList, 'ChallengeDetail'>;

const ChallengeDetailScreen: React.FC<Props> = ({navigation, route}) => {
  const {challengeId, skillId} = route.params;
  const isDuel = skillId !== undefined;

  // Get the appropriate challenge
  let challenge: Challenge | undefined;
  
  if (isDuel && skillId) {
    // For duels, get a random challenge for the selected skill
    challenge = getRandomChallengeForSkill(skillId);
  } else {
    // For regular challenges, try to get by ID first, then fallback to random
    challenge = getChallengeById(challengeId) || getRandomChallengeForSkill(skillId || '1');
  }

  // Fallback challenge if none found
  const fallbackChallenge: Challenge = {
    id: 'fallback',
    title: 'JavaScript Array Methods Mastery',
    skill: 'JavaScript',
    skillId: '1',
    level: 1,
    difficulty: 'Beginner',
    estimated_time: '5 min',
    xp_reward: 50,
    description: 'Master the essential JavaScript array methods by implementing filter, map, and reduce operations on a dataset.',
    success_criteria: [
      'Use the filter() method to remove items from an array',
      'Use the map() method to transform array elements',
      'Use the reduce() method to calculate a single value',
      'Complete the task within 5 minutes',
      'Write clean, readable code with proper syntax',
    ],
    example_code: `// Example: Filter even numbers
const numbers = [1, 2, 3, 4, 5, 6];
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log(evenNumbers); // [2, 4, 6]`,
    tips: [
      'Remember that filter() returns a new array',
      'map() transforms each element',
      'reduce() accumulates values'
    ]
  };

  const currentChallenge = challenge || fallbackChallenge;

  const handleStartChallenge = () => {
    navigation.navigate('Record', {
      challengeId: currentChallenge.id,
      isDuel,
      duelId: isDuel ? 'new-duel' : undefined,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Challenge Header */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{currentChallenge.title}</Text>
            <View style={styles.metaContainer}>
              <View style={styles.metaItem}>
                <Icon name="code" size={16} color="#6366f1" />
                <Text style={styles.metaText}>{currentChallenge.skill}</Text>
              </View>
              <View style={styles.metaItem}>
                <Icon name="schedule" size={16} color="#6b7280" />
                <Text style={styles.metaText}>{currentChallenge.estimated_time}</Text>
              </View>
              <View style={styles.metaItem}>
                <Icon name="speed" size={16} color="#6b7280" />
                <Text style={styles.metaText}>{currentChallenge.difficulty}</Text>
              </View>
            </View>
          </View>
          <View style={styles.rewardContainer}>
            <Icon name="stars" size={20} color="#f59e0b" />
            <Text style={styles.rewardText}>{currentChallenge.xp_reward} XP</Text>
          </View>
        </View>

        {/* Duel Mode Banner */}
        {isDuel && (
          <View style={styles.duelBanner}>
            <Icon name="sports-esports" size={20} color="#ef4444" />
            <Text style={styles.duelBannerText}>Duel Mode - Compete against an opponent!</Text>
          </View>
        )}

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Challenge Description</Text>
          <Text style={styles.description}>{currentChallenge.description}</Text>
        </View>

        {/* Success Criteria */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Success Criteria</Text>
          <View style={styles.criteriaContainer}>
            {currentChallenge.success_criteria.map((criteria, index) => (
              <View key={index} style={styles.criteriaItem}>
                <View style={styles.criteriaIcon}>
                  <Icon name="check-circle" size={16} color="#10b981" />
                </View>
                <Text style={styles.criteriaText}>{criteria}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Example Code (for programming challenges) */}
        {currentChallenge.example_code && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Example Code</Text>
            <View style={styles.codeContainer}>
              <Text style={styles.codeText}>{currentChallenge.example_code}</Text>
            </View>
          </View>
        )}

        {/* Tips */}
        {currentChallenge.tips && currentChallenge.tips.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tips</Text>
            <View style={styles.tipsContainer}>
              {currentChallenge.tips.map((tip, index) => (
                <View key={index} style={styles.tipItem}>
                  <View style={styles.tipIcon}>
                    <Icon name="lightbulb" size={16} color="#f59e0b" />
                  </View>
                  <Text style={styles.tipText}>{tip}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Start Button */}
        <View style={styles.startButtonContainer}>
          <TouchableOpacity style={styles.startButton} onPress={handleStartChallenge}>
            <Icon name="play-arrow" size={20} color="white" />
            <Text style={styles.startButtonText}>
              {isDuel ? 'Start Duel' : 'Start Challenge'}
            </Text>
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
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 20,
  },
  titleContainer: {
    flex: 1,
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
    lineHeight: 32,
  },
  metaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  rewardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef3c7',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  rewardText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f59e0b',
  },
  duelBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef2f2',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 24,
    gap: 8,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  duelBannerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ef4444',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#4b5563',
    lineHeight: 24,
  },
  criteriaContainer: {
    gap: 12,
  },
  criteriaItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  criteriaIcon: {
    marginTop: 2,
  },
  criteriaText: {
    flex: 1,
    fontSize: 16,
    color: '#4b5563',
    lineHeight: 24,
  },
  codeContainer: {
    backgroundColor: '#1f2937',
    borderRadius: 12,
    padding: 16,
  },
  codeText: {
    fontSize: 14,
    color: '#e5e7eb',
    fontFamily: 'Courier New',
    lineHeight: 20,
  },
  tipsContainer: {
    gap: 12,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fffbeb',
    padding: 16,
    borderRadius: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: '#fef3c7',
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#92400e',
    lineHeight: 20,
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  startButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6366f1',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  tipIcon: {
    marginTop: 2,
  },
});

export default ChallengeDetailScreen; 
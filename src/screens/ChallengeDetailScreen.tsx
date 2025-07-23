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
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = NativeStackScreenProps<RootStackParamList, 'ChallengeDetail'>;

// Mock challenge data
const mockChallenge = {
  id: '1',
  title: '5-Minute JavaScript Array Methods',
  skill: 'JavaScript',
  level: 1,
  difficulty: 'Beginner',
  estimated_time: '5 min',
  xp_reward: 50,
  description: 'Master the essential JavaScript array methods by implementing filter, map, and reduce operations on a dataset.',
  instruction_video_url: null,
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
};

const ChallengeDetailScreen: React.FC<Props> = ({navigation, route}) => {
  const {challengeId, skillId} = route.params;
  const isDuel = skillId !== undefined;

  const handleStartChallenge = () => {
    navigation.navigate('Record', {
      challengeId,
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
            <Text style={styles.title}>{mockChallenge.title}</Text>
            <View style={styles.metaContainer}>
              <View style={styles.metaItem}>
                <Icon name="code" size={16} color="#6366f1" />
                <Text style={styles.metaText}>{mockChallenge.skill}</Text>
              </View>
              <View style={styles.metaItem}>
                <Icon name="schedule" size={16} color="#6b7280" />
                <Text style={styles.metaText}>{mockChallenge.estimated_time}</Text>
              </View>
              <View style={styles.metaItem}>
                <Icon name="speed" size={16} color="#6b7280" />
                <Text style={styles.metaText}>{mockChallenge.difficulty}</Text>
              </View>
            </View>
          </View>
          <View style={styles.rewardContainer}>
            <Icon name="stars" size={20} color="#f59e0b" />
            <Text style={styles.rewardText}>{mockChallenge.xp_reward} XP</Text>
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
          <Text style={styles.description}>{mockChallenge.description}</Text>
        </View>

        {/* Success Criteria */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Success Criteria</Text>
          <View style={styles.criteriaContainer}>
            {mockChallenge.success_criteria.map((criteria, index) => (
              <View key={index} style={styles.criteriaItem}>
                <View style={styles.criteriaIcon}>
                  <Icon name="check-circle-outline" size={20} color="#10b981" />
                </View>
                <Text style={styles.criteriaText}>{criteria}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Example Code */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Example</Text>
          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>{mockChallenge.example_code}</Text>
          </View>
        </View>

        {/* Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tips</Text>
          <View style={styles.tipsContainer}>
            <View style={styles.tipItem}>
              <Icon name="lightbulb-outline" size={20} color="#f59e0b" />
              <Text style={styles.tipText}>
                Test your code with different input values to ensure it works correctly
              </Text>
            </View>
            <View style={styles.tipItem}>
              <Icon name="lightbulb-outline" size={20} color="#f59e0b" />
              <Text style={styles.tipText}>
                Focus on readability - clean code is as important as functionality
              </Text>
            </View>
            <View style={styles.tipItem}>
              <Icon name="lightbulb-outline" size={20} color="#f59e0b" />
              <Text style={styles.tipText}>
                Don't rush - accuracy is more important than speed
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Start Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.startButton} onPress={handleStartChallenge}>
          <Icon name="videocam" size={20} color="white" />
          <Text style={styles.startButtonText}>
            {isDuel ? 'Start Duel Recording' : 'Start Recording Challenge'}
          </Text>
        </TouchableOpacity>
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
});

export default ChallengeDetailScreen; 
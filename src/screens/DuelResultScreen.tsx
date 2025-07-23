import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Share,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = NativeStackScreenProps<RootStackParamList, 'DuelResult'>;

// Mock duel result data
const mockDuelResult = {
  id: '1',
  skill: 'JavaScript',
  challenge: '5-Minute Array Methods',
  status: 'completed',
  winner: 'you', // 'you' | 'opponent' | 'tie'
  your_score: 92,
  opponent_score: 78,
  your_time: '4:32',
  opponent_time: '4:58',
  your_criteria_met: 5,
  opponent_criteria_met: 4,
  total_criteria: 5,
  xp_gained: 75,
  opponent: {
    username: 'CodeMaster_99',
    level: 4,
    avatar_url: null,
  },
  feedback: {
    strengths: [
      'Excellent use of array methods',
      'Clean and readable code structure',
      'Efficient problem-solving approach',
    ],
    improvements: [
      'Consider adding more error handling',
      'Variable naming could be more descriptive',
    ],
  },
  completed_at: '2024-01-20T15:30:00Z',
};

const DuelResultScreen: React.FC<Props> = ({navigation}) => {
  const isWinner = mockDuelResult.winner === 'you';
  const isTie = mockDuelResult.winner === 'tie';

  const handleShare = async () => {
    try {
      await Share.share({
        message: `I just ${isWinner ? 'won' : isTie ? 'tied in' : 'competed in'} a SkillDuel! ${mockDuelResult.skill} challenge - ${mockDuelResult.your_score} vs ${mockDuelResult.opponent_score}. Download SkillDuel to challenge me!`,
        title: 'SkillDuel Result',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleRematch = () => {
    // Navigate back to challenge detail for rematch
    navigation.navigate('ChallengeDetail', {
      challengeId: 'rematch-challenge',
    });
  };

  const getWinnerColor = () => {
    if (isTie) return '#f59e0b';
    return isWinner ? '#10b981' : '#ef4444';
  };

  const getWinnerText = () => {
    if (isTie) return 'It\'s a Tie!';
    return isWinner ? 'You Won!' : 'You Lost';
  };

  const getWinnerIcon = () => {
    if (isTie) return 'handshake';
    return isWinner ? 'emoji-events' : 'sentiment-dissatisfied';
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Winner Banner */}
        <View style={[styles.winnerBanner, {backgroundColor: getWinnerColor() + '20'}]}>
          <Icon name={getWinnerIcon()} size={40} color={getWinnerColor()} />
          <Text style={[styles.winnerText, {color: getWinnerColor()}]}>
            {getWinnerText()}
          </Text>
          <Text style={styles.winnerSubtext}>
            {mockDuelResult.skill} • {mockDuelResult.challenge}
          </Text>
        </View>

        {/* Score Comparison */}
        <View style={styles.scoreContainer}>
          <View style={styles.playerScore}>
            <Text style={styles.playerName}>You</Text>
            <Text style={[
              styles.scoreNumber,
              {color: isWinner ? '#10b981' : '#6b7280'},
            ]}>
              {mockDuelResult.your_score}
            </Text>
            <Text style={styles.scoreLabel}>Score</Text>
          </View>
          
          <View style={styles.vsContainer}>
            <Text style={styles.vsText}>VS</Text>
          </View>
          
          <View style={styles.playerScore}>
            <Text style={styles.playerName}>{mockDuelResult.opponent.username}</Text>
            <Text style={[
              styles.scoreNumber,
              {color: !isWinner && !isTie ? '#10b981' : '#6b7280'},
            ]}>
              {mockDuelResult.opponent_score}
            </Text>
            <Text style={styles.scoreLabel}>Score</Text>
          </View>
        </View>

        {/* Detailed Stats */}
        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}>Performance Breakdown</Text>
          
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Completion Time</Text>
            <View style={styles.statValues}>
              <Text style={styles.statValue}>{mockDuelResult.your_time}</Text>
              <Text style={styles.statValue}>{mockDuelResult.opponent_time}</Text>
            </View>
          </View>
          
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Criteria Met</Text>
            <View style={styles.statValues}>
              <Text style={styles.statValue}>
                {mockDuelResult.your_criteria_met}/{mockDuelResult.total_criteria}
              </Text>
              <Text style={styles.statValue}>
                {mockDuelResult.opponent_criteria_met}/{mockDuelResult.total_criteria}
              </Text>
            </View>
          </View>
        </View>

        {/* XP Reward */}
        <View style={styles.xpContainer}>
          <Icon name="stars" size={24} color="#f59e0b" />
          <Text style={styles.xpText}>+{mockDuelResult.xp_gained} XP Earned!</Text>
        </View>

        {/* Video Comparison Placeholder */}
        <View style={styles.videoContainer}>
          <Text style={styles.videoTitle}>Video Comparison</Text>
          <View style={styles.videosWrapper}>
            <View style={styles.videoPlaceholder}>
              <Icon name="play-circle-filled" size={40} color="#6366f1" />
              <Text style={styles.videoLabel}>Your Submission</Text>
            </View>
            <View style={styles.videoPlaceholder}>
              <Icon name="play-circle-filled" size={40} color="#6366f1" />
              <Text style={styles.videoLabel}>Opponent's Submission</Text>
            </View>
          </View>
        </View>

        {/* AI Feedback */}
        <View style={styles.feedbackContainer}>
          <Text style={styles.feedbackTitle}>AI Performance Analysis</Text>
          
          <View style={styles.feedbackSection}>
            <Text style={styles.feedbackSectionTitle}>
              <Icon name="thumb-up" size={16} color="#10b981" /> Strengths
            </Text>
            {mockDuelResult.feedback.strengths.map((strength, index) => (
              <Text key={index} style={styles.feedbackItem}>• {strength}</Text>
            ))}
          </View>
          
          <View style={styles.feedbackSection}>
            <Text style={styles.feedbackSectionTitle}>
              <Icon name="trending-up" size={16} color="#f59e0b" /> Areas for Improvement
            </Text>
            {mockDuelResult.feedback.improvements.map((improvement, index) => (
              <Text key={index} style={styles.feedbackItem}>• {improvement}</Text>
            ))}
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
            <Icon name="share" size={20} color="#6366f1" />
            <Text style={styles.shareButtonText}>Share Result</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.rematchButton} onPress={handleRematch}>
            <Icon name="refresh" size={20} color="white" />
            <Text style={styles.rematchButtonText}>Request Rematch</Text>
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
  winnerBanner: {
    alignItems: 'center',
    paddingVertical: 32,
    borderRadius: 16,
    marginVertical: 20,
  },
  winnerText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 12,
  },
  winnerSubtext: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 8,
  },
  scoreContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  playerScore: {
    flex: 1,
    alignItems: 'center',
  },
  playerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  scoreNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  scoreLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  vsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  vsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#9ca3af',
  },
  statsContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  statLabel: {
    fontSize: 16,
    color: '#4b5563',
    fontWeight: '500',
  },
  statValues: {
    flexDirection: 'row',
    gap: 24,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    width: 60,
    textAlign: 'center',
  },
  xpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fef3c7',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 24,
    gap: 8,
  },
  xpText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#f59e0b',
  },
  videoContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  videosWrapper: {
    flexDirection: 'row',
    gap: 12,
  },
  videoPlaceholder: {
    flex: 1,
    aspectRatio: 16/9,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
    marginTop: 8,
  },
  feedbackContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  feedbackTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  feedbackSection: {
    marginBottom: 16,
  },
  feedbackSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  feedbackItem: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
    marginBottom: 4,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  shareButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#6366f1',
    gap: 8,
  },
  shareButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6366f1',
  },
  rematchButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6366f1',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  rematchButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});

export default DuelResultScreen; 
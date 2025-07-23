import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = NativeStackScreenProps<RootStackParamList, 'Record'>;

// Mock challenge criteria
const mockCriteria = [
  'Use the filter() method to remove items from an array',
  'Use the map() method to transform array elements', 
  'Use the reduce() method to calculate a single value',
  'Complete the task within 5 minutes',
  'Write clean, readable code with proper syntax',
];

const RecordScreen: React.FC<Props> = ({navigation, route}) => {
  const {challengeId, isDuel, duelId} = route.params;
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [checkedCriteria, setCheckedCriteria] = useState<boolean[]>(
    new Array(mockCriteria.length).fill(false)
  );

  // Mock timer effect
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartStopRecording = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      Alert.alert(
        'Recording Complete',
        'Would you like to submit this recording or record again?',
        [
          {text: 'Record Again', style: 'cancel', onPress: () => {
            setRecordingTime(0);
            setCheckedCriteria(new Array(mockCriteria.length).fill(false));
          }},
          {text: 'Submit', onPress: handleSubmit},
        ]
      );
    } else {
      // Start recording
      setIsRecording(true);
      setRecordingTime(0);
    }
  };

  const handleSubmit = () => {
    // TODO: Upload video and navigate to result screen
    if (isDuel) {
      navigation.navigate('DuelResult', {duelId: duelId!});
    } else {
      // Navigate back to dashboard with success
      navigation.popToTop();
    }
  };

  const toggleCriteria = (index: number) => {
    const newChecked = [...checkedCriteria];
    newChecked[index] = !newChecked[index];
    setCheckedCriteria(newChecked);
  };

  const completedCriteria = checkedCriteria.filter(Boolean).length;

  return (
    <SafeAreaView style={styles.container}>
      {/* Camera Placeholder */}
      <View style={styles.cameraContainer}>
        <View style={styles.cameraPlaceholder}>
          <Icon name="videocam" size={60} color="#6b7280" />
          <Text style={styles.cameraText}>Camera View</Text>
          <Text style={styles.cameraSubtext}>
            {isRecording ? 'Recording in progress...' : 'Tap record to start'}
          </Text>
        </View>

        {/* Recording Indicator */}
        {isRecording && (
          <View style={styles.recordingIndicator}>
            <View style={styles.recordingDot} />
            <Text style={styles.recordingText}>REC {formatTime(recordingTime)}</Text>
          </View>
        )}

        {/* Timer Display */}
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>{formatTime(recordingTime)}</Text>
        </View>

        {/* Camera Controls */}
        <View style={styles.controlsContainer}>
          <TouchableOpacity style={styles.flipButton}>
            <Icon name="flip-camera-ios" size={24} color="white" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.recordButton,
              isRecording && styles.recordButtonActive,
            ]}
            onPress={handleStartStopRecording}>
            <Icon 
              name={isRecording ? 'stop' : 'radio-button-checked'} 
              size={isRecording ? 30 : 50} 
              color="white" 
            />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.flipButton}>
            <Icon name="flash-auto" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Criteria Checklist */}
      <View style={styles.criteriaContainer}>
        <View style={styles.criteriaHeader}>
          <Text style={styles.criteriaTitle}>Success Criteria</Text>
          <Text style={styles.criteriaProgress}>
            {completedCriteria} of {mockCriteria.length} completed
          </Text>
        </View>
        
        <View style={styles.criteriaList}>
          {mockCriteria.map((criteria, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.criteriaItem}
              onPress={() => toggleCriteria(index)}>
              <Icon 
                name={checkedCriteria[index] ? 'check-circle' : 'radio-button-unchecked'} 
                size={24} 
                color={checkedCriteria[index] ? '#10b981' : '#9ca3af'} 
              />
              <Text style={[
                styles.criteriaText,
                checkedCriteria[index] && styles.criteriaTextCompleted,
              ]}>
                {criteria}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBarBackground}>
            <View 
              style={[
                styles.progressBar,
                {width: `${(completedCriteria / mockCriteria.length) * 100}%`},
              ]} 
            />
          </View>
          <Text style={styles.progressText}>
            {Math.round((completedCriteria / mockCriteria.length) * 100)}% Complete
          </Text>
        </View>
      </View>

      {/* Instructions */}
      <View style={styles.instructionsContainer}>
        <Text style={styles.instructionsText}>
          {isRecording 
            ? '• Check off criteria as you complete them\n• Speak clearly and show your work\n• Keep your face and screen visible' 
            : '• Position yourself and your screen in frame\n• Check all criteria before submitting\n• Ensure good lighting and audio'
          }
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  cameraContainer: {
    flex: 1,
    position: 'relative',
  },
  cameraPlaceholder: {
    flex: 1,
    backgroundColor: '#1f2937',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#e5e7eb',
    marginTop: 16,
  },
  cameraSubtext: {
    fontSize: 14,
    color: '#9ca3af',
    marginTop: 8,
  },
  recordingIndicator: {
    position: 'absolute',
    top: 60,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ef4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 8,
  },
  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'white',
  },
  recordingText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  timerContainer: {
    position: 'absolute',
    top: 60,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  timerText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    fontFamily: 'Courier New',
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  flipButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ef4444',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'white',
  },
  recordButtonActive: {
    backgroundColor: '#dc2626',
  },
  criteriaContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 16,
    maxHeight: 280,
  },
  criteriaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  criteriaTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  criteriaProgress: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  criteriaList: {
    gap: 12,
    marginBottom: 16,
  },
  criteriaItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  criteriaText: {
    flex: 1,
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
  },
  criteriaTextCompleted: {
    color: '#10b981',
    textDecorationLine: 'line-through',
  },
  progressContainer: {
    gap: 8,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#10b981',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    fontWeight: '500',
  },
  instructionsContainer: {
    backgroundColor: '#f8fafc',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  instructionsText: {
    fontSize: 12,
    color: '#6b7280',
    lineHeight: 16,
  },
});

export default RecordScreen; 
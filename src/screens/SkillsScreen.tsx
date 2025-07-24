import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  FlatList,
} from 'react-native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {useQuery} from '@tanstack/react-query';
import {RootTabParamList, RootStackParamList} from '../types/navigation';
import {useAuthStore} from '../stores/authStore';
import {DataService} from '../services/dataService';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, 'Skills'>,
  NativeStackScreenProps<RootStackParamList>
>;

const {width} = Dimensions.get('window');

// Mock skills data - replace with actual API call
const mockSkills = [
  {
    id: '1',
    name: 'JavaScript',
    description: 'Master modern JavaScript fundamentals',
    category: 'Technology',
    icon: 'code',
    color: '#f7df1e',
    participants: 1247,
    difficulty: 'Beginner',
  },
  {
    id: '2',
    name: 'Public Speaking',
    description: 'Build confidence in public presentations',
    category: 'Life Skills',
    icon: 'record-voice-over',
    color: '#10b981',
    participants: 892,
    difficulty: 'Intermediate',
  },
  {
    id: '3',
    name: 'Photography',
    description: 'Learn composition and camera techniques',
    category: 'Arts & Creative',
    icon: 'camera-alt',
    color: '#f59e0b',
    participants: 567,
    difficulty: 'Beginner',
  },
  {
    id: '4',
    name: 'Guitar',
    description: 'Master chords and strumming patterns',
    category: 'Arts & Creative',
    icon: 'music-note',
    color: '#8b5cf6',
    participants: 445,
    difficulty: 'Intermediate',
  },
  {
    id: '5',
    name: 'Python',
    description: 'Learn Python programming basics',
    category: 'Technology',
    icon: 'code',
    color: '#3b82f6',
    participants: 1103,
    difficulty: 'Beginner',
  },
  {
    id: '6',
    name: 'Leadership',
    description: 'Develop leadership and management skills',
    category: 'Life Skills',
    icon: 'group',
    color: '#ef4444',
    participants: 334,
    difficulty: 'Advanced',
  },
  {
    id: '7',
    name: 'Fitness',
    description: 'Build strength and endurance',
    category: 'Fitness & Sports',
    icon: 'fitness-center',
    color: '#ef4444',
    participants: 789,
    difficulty: 'Beginner',
  },
];

const SKILL_CATEGORIES = [
  {id: 'all', name: 'All Skills', icon: 'apps'},
  {id: 'technology', name: 'Technology', icon: 'computer'},
  {id: 'life-skills', name: 'Life Skills', icon: 'psychology'},
  {id: 'arts-creative', name: 'Arts & Creative', icon: 'palette'},
  {id: 'fitness-sports', name: 'Fitness & Sports', icon: 'fitness-center'},
];

const SkillsScreen: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const {userProfile} = useAuthStore();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter skills based on selected category and search query
  const filteredSkills = mockSkills.filter(skill => {
    const matchesCategory = selectedCategory === 'all' || 
      skill.category.toLowerCase().includes(selectedCategory.replace('-', ' '));
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSkillPress = (skillId: string) => {
    // Navigate to skill detail or start a challenge
    navigation.navigate('ChallengeDetail', {
      challengeId: `skill-${skillId}-challenge`,
      skillId: skillId,
    });
  };

  const handleStartLearning = (skillId: string) => {
    // Get a random challenge for this skill
    navigation.navigate('ChallengeDetail', {
      challengeId: `skill-${skillId}-challenge`,
      skillId: skillId,
    });
  };

  const handleFindDuel = (skillId: string) => {
    // Navigate to duel screen with this skill
    navigation.navigate('Duel', { selectedSkillId: skillId });
  };

  const renderSkillItem = ({item}: {item: typeof mockSkills[0]}) => (
    <TouchableOpacity
      style={styles.skillCard}
      onPress={() => handleSkillPress(item.id)}>
      <View style={styles.skillHeader}>
        <View style={[styles.skillIcon, {backgroundColor: item.color}]}>
          <Icon name={item.icon} size={24} color="white" />
        </View>
        <View style={styles.skillInfo}>
          <Text style={styles.skillName}>{item.name}</Text>
          <Text style={styles.skillCategory}>{item.category}</Text>
        </View>
        <View style={styles.skillMeta}>
                     <Text style={styles.participantsCount}>{item.participants} {t('skills.learners')}</Text>
          <View style={[styles.difficultyBadge, {backgroundColor: item.color + '20'}]}>
            <Text style={[styles.difficultyText, {color: item.color}]}>
              {item.difficulty}
            </Text>
          </View>
        </View>
      </View>
      <Text style={styles.skillDescription}>{item.description}</Text>
             <View style={styles.skillActions}>
         <TouchableOpacity 
           style={styles.startButton}
           onPress={() => handleStartLearning(item.id)}>
           <Icon name="play-arrow" size={16} color="white" />
           <Text style={styles.startButtonText}>{t('skills.startLearning')}</Text>
         </TouchableOpacity>
         <TouchableOpacity 
           style={styles.duelButton}
           onPress={() => handleFindDuel(item.id)}>
           <Icon name="sports-esports" size={16} color="#6366f1" />
           <Text style={styles.duelButtonText}>{t('skills.findDuel')}</Text>
         </TouchableOpacity>
       </View>
    </TouchableOpacity>
  );

  const renderCategoryItem = ({item}: {item: typeof SKILL_CATEGORIES[0]}) => (
    <TouchableOpacity
      style={[
        styles.categoryChip,
        selectedCategory === item.id && styles.categoryChipSelected,
      ]}
      onPress={() => setSelectedCategory(item.id)}>
      <Icon 
        name={item.icon} 
        size={16} 
        color={selectedCategory === item.id ? 'white' : '#6366f1'} 
      />
      <Text style={[
        styles.categoryChipText,
        selectedCategory === item.id && styles.categoryChipTextSelected,
      ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('skills.title')}</Text>
        <Text style={styles.subtitle}>{t('skills.subtitle')}</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Category Filter */}
        <View style={styles.categoriesSection}>
          <FlatList
            data={SKILL_CATEGORIES}
            renderItem={renderCategoryItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        {/* Skills List */}
        <View style={styles.skillsSection}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === 'all' ? t('skills.allSkills') : `${SKILL_CATEGORIES.find(c => c.id === selectedCategory)?.name}`}
            {' '}({filteredSkills.length})
          </Text>
          
          <FlatList
            data={filteredSkills}
            renderItem={renderSkillItem}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.skillsList}
          />
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
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  content: {
    flex: 1,
  },
  categoriesSection: {
    paddingVertical: 16,
    backgroundColor: 'white',
    marginBottom: 12,
  },
  categoriesList: {
    paddingHorizontal: 20,
    gap: 12,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: 'white',
    gap: 6,
  },
  categoryChipSelected: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6366f1',
  },
  categoryChipTextSelected: {
    color: 'white',
  },
  skillsSection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  skillsList: {
    gap: 16,
  },
  skillCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
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
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  skillInfo: {
    flex: 1,
  },
  skillName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  skillCategory: {
    fontSize: 14,
    color: '#6b7280',
  },
  skillMeta: {
    alignItems: 'flex-end',
  },
  participantsCount: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '500',
  },
  skillDescription: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
    marginBottom: 16,
  },
  skillActions: {
    flexDirection: 'row',
    gap: 12,
  },
  startButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10b981',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 6,
  },
  startButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  duelButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#6366f1',
    gap: 6,
  },
  duelButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6366f1',
  },
});

export default SkillsScreen; 
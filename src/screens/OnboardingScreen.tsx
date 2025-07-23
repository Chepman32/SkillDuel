import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {RootStackParamList} from '../types/navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

const {width} = Dimensions.get('window');

const SKILL_CATEGORIES = [
  {
    id: 'tech',
    name: 'Technology',
    description: 'Coding, AI, Design, Digital Skills',
    icon: 'computer',
    color: '#6366f1',
    skills: ['JavaScript', 'React Native', 'Python', 'UI/UX Design', 'Data Science'],
  },
  {
    id: 'life',
    name: 'Life Skills',
    description: 'Productivity, Communication, Leadership',
    icon: 'psychology',
    color: '#10b981',
    skills: ['Public Speaking', 'Time Management', 'Negotiation', 'Leadership', 'Mindfulness'],
  },
  {
    id: 'arts',
    name: 'Arts & Creative',
    description: 'Music, Drawing, Photography, Writing',
    icon: 'palette',
    color: '#f59e0b',
    skills: ['Guitar', 'Photography', 'Creative Writing', 'Digital Art', 'Music Production'],
  },
  {
    id: 'fitness',
    name: 'Fitness & Sports',
    description: 'Physical Training, Sports, Wellness',
    icon: 'fitness-center',
    color: '#ef4444',
    skills: ['Basketball', 'Yoga', 'Running', 'Weightlifting', 'Swimming'],
  },
];

const OnboardingScreen: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const handleContinue = () => {
    if (selectedCategory && selectedSkill) {
      // TODO: Save selected skill to user profile
      console.log('Selected:', {category: selectedCategory, skill: selectedSkill});
      navigation.navigate('Main');
    }
  };

  const selectedCategoryData = SKILL_CATEGORIES.find(cat => cat.id === selectedCategory);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('onboarding.title')}</Text>
        <Text style={styles.subtitle}>
          {t('onboarding.subtitle')}
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Category Selection */}
        <Text style={styles.sectionTitle}>Category</Text>
        <View style={styles.categoriesContainer}>
          {SKILL_CATEGORIES.map(category => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryCard,
                {borderColor: category.color},
                selectedCategory === category.id && {
                  backgroundColor: category.color + '10',
                  borderWidth: 2,
                },
              ]}
              onPress={() => {
                setSelectedCategory(category.id);
                setSelectedSkill(null); // Reset skill selection
              }}>
              <Icon name={category.icon} size={32} color={category.color} />
              <Text style={styles.categoryName}>{category.name}</Text>
              <Text style={styles.categoryDescription}>{category.description}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Skill Selection */}
        {selectedCategoryData && (
          <View style={styles.skillsSection}>
            <Text style={styles.sectionTitle}>
              Choose from {selectedCategoryData.name}
            </Text>
            <View style={styles.skillsContainer}>
              {selectedCategoryData.skills.map(skill => (
                <TouchableOpacity
                  key={skill}
                  style={[
                    styles.skillChip,
                    {borderColor: selectedCategoryData.color},
                    selectedSkill === skill && {
                      backgroundColor: selectedCategoryData.color,
                    },
                  ]}
                  onPress={() => setSelectedSkill(skill)}>
                  <Text
                    style={[
                      styles.skillText,
                      selectedSkill === skill && {color: 'white'},
                    ]}>
                    {skill}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            selectedCategory && selectedSkill
              ? {backgroundColor: '#6366f1'}
              : {backgroundColor: '#9ca3af'},
          ]}
          onPress={handleContinue}
          disabled={!selectedCategory || !selectedSkill}>
          <Text style={styles.continueButtonText}>
            Start Learning {selectedSkill || 'Your Skill'}
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
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 24,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 32,
  },
  categoryCard: {
    width: (width - 60) / 2,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'center',
    gap: 8,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
  },
  categoryDescription: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 16,
  },
  skillsSection: {
    marginBottom: 32,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  skillChip: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  skillText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    paddingTop: 16,
  },
  continueButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});

export default OnboardingScreen; 
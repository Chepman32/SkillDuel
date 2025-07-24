export interface Challenge {
  id: string;
  title: string;
  skill: string;
  skillId: string;
  level: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimated_time: string;
  xp_reward: number;
  description: string;
  instruction_video_url?: string;
  success_criteria: string[];
  example_code?: string;
  tips?: string[];
}

export const CHALLENGES: Challenge[] = [
  // TECHNOLOGY - JavaScript
  {
    id: 'js-array-methods',
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
  },
  {
    id: 'js-async-await',
    title: 'Async/Await Promise Handling',
    skill: 'JavaScript',
    skillId: '1',
    level: 2,
    difficulty: 'Intermediate',
    estimated_time: '8 min',
    xp_reward: 75,
    description: 'Demonstrate your understanding of async/await by creating a function that fetches and processes data from multiple APIs.',
    success_criteria: [
      'Create an async function that uses await',
      'Handle multiple promises concurrently',
      'Implement proper error handling with try/catch',
      'Return processed data in the correct format',
      'Use Promise.all() for parallel execution',
    ],
    example_code: `async function fetchUserData(userId) {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
  }
}`,
    tips: [
      'Use try/catch for error handling',
      'Promise.all() for parallel requests',
      'Always handle rejected promises'
    ]
  },
  {
    id: 'js-dom-manipulation',
    title: 'DOM Manipulation Challenge',
    skill: 'JavaScript',
    skillId: '1',
    level: 1,
    difficulty: 'Beginner',
    estimated_time: '6 min',
    xp_reward: 60,
    description: 'Create dynamic web content by manipulating the DOM with JavaScript. Add, remove, and modify elements.',
    success_criteria: [
      'Create new DOM elements programmatically',
      'Add event listeners to elements',
      'Modify element attributes and content',
      'Remove elements from the DOM',
      'Use querySelector and getElementById',
    ],
    example_code: `// Create and append a new element
const newDiv = document.createElement('div');
newDiv.textContent = 'Hello World';
newDiv.className = 'greeting';
document.body.appendChild(newDiv);`,
    tips: [
      'Use createElement() for new elements',
      'addEventListener() for events',
      'querySelector() for finding elements'
    ]
  },
  {
    id: 'js-closures',
    title: 'Closures and Scope Mastery',
    skill: 'JavaScript',
    skillId: '1',
    level: 3,
    difficulty: 'Advanced',
    estimated_time: '10 min',
    xp_reward: 100,
    description: 'Demonstrate advanced JavaScript concepts by creating closures that maintain state and implement private variables.',
    success_criteria: [
      'Create a closure that maintains state',
      'Implement private variables using closures',
      'Use closures for data encapsulation',
      'Create a counter function with closure',
      'Explain the scope chain in your code',
    ],
    example_code: `function createCounter() {
  let count = 0;
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count
  };
}`,
    tips: [
      'Closures remember their lexical scope',
      'Use for data privacy',
      'Be careful with memory leaks'
    ]
  },

  // TECHNOLOGY - Python
  {
    id: 'python-lists-comprehension',
    title: 'Python List Comprehensions',
    skill: 'Python',
    skillId: '5',
    level: 1,
    difficulty: 'Beginner',
    estimated_time: '5 min',
    xp_reward: 50,
    description: 'Master Python list comprehensions by transforming and filtering data efficiently.',
    success_criteria: [
      'Create a list comprehension with a condition',
      'Use list comprehension to filter data',
      'Transform data using list comprehension',
      'Write readable and efficient code',
      'Complete within the time limit',
    ],
    example_code: `# Filter even numbers
numbers = [1, 2, 3, 4, 5, 6]
even_numbers = [x for x in numbers if x % 2 == 0]
print(even_numbers)  # [2, 4, 6]`,
    tips: [
      'Use [expression for item in iterable]',
      'Add conditions with if',
      'Keep comprehensions readable'
    ]
  },
  {
    id: 'python-dictionaries',
    title: 'Dictionary Operations Challenge',
    skill: 'Python',
    skillId: '5',
    level: 2,
    difficulty: 'Intermediate',
    estimated_time: '7 min',
    xp_reward: 70,
    description: 'Work with Python dictionaries to create, modify, and process key-value data structures.',
    success_criteria: [
      'Create a dictionary with various data types',
      'Add and remove key-value pairs',
      'Use dictionary methods (get, update, pop)',
      'Iterate through dictionary items',
      'Handle missing keys gracefully',
    ],
    example_code: `# Dictionary operations
user = {'name': 'John', 'age': 30}
user['email'] = 'john@example.com'
age = user.get('age', 0)  # Safe access
print(user)`,
    tips: [
      'Use .get() for safe access',
      '.update() merges dictionaries',
      'Iterate with .items()'
    ]
  },
  {
    id: 'python-file-handling',
    title: 'File I/O Operations',
    skill: 'Python',
    skillId: '5',
    level: 2,
    difficulty: 'Intermediate',
    estimated_time: '8 min',
    xp_reward: 75,
    description: 'Demonstrate file handling skills by reading, writing, and processing text files.',
    success_criteria: [
      'Open and read a text file',
      'Write data to a new file',
      'Handle file exceptions properly',
      'Process file content line by line',
      'Use context managers (with statement)',
    ],
    example_code: `# Reading and writing files
with open('data.txt', 'r') as file:
    content = file.read()

with open('output.txt', 'w') as file:
    file.write('Hello World')`,
    tips: [
      'Always use context managers',
      'Handle exceptions with try/except',
      'Choose appropriate file modes'
    ]
  },
  {
    id: 'python-decorators',
    title: 'Function Decorators',
    skill: 'Python',
    skillId: '5',
    level: 3,
    difficulty: 'Advanced',
    estimated_time: '12 min',
    xp_reward: 120,
    description: 'Create and use function decorators to add functionality to existing functions.',
    success_criteria: [
      'Create a simple decorator function',
      'Use the @decorator syntax',
      'Pass arguments to decorators',
      'Create a timing decorator',
      'Understand decorator execution order',
    ],
    example_code: `def timer(func):
    def wrapper(*args, **kwargs):
        import time
        start = time.time()
        result = func(*args, **kwargs)
        print(f"Time: {time.time() - start}s")
        return result
    return wrapper`,
    tips: [
      'Decorators are functions that return functions',
      'Use *args and **kwargs for flexibility',
      'Remember the @ syntax sugar'
    ]
  },

  // LIFE SKILLS - Public Speaking
  {
    id: 'speaking-elevator-pitch',
    title: '30-Second Elevator Pitch',
    skill: 'Public Speaking',
    skillId: '2',
    level: 1,
    difficulty: 'Beginner',
    estimated_time: '3 min',
    xp_reward: 40,
    description: 'Deliver a compelling 30-second elevator pitch about yourself or a project. Focus on clarity and confidence.',
    success_criteria: [
      'Speak clearly and at appropriate pace',
      'Maintain eye contact with camera',
      'Use confident body language',
      'Include key points: who, what, why',
      'Stay within 30-second time limit',
    ],
    tips: [
      'Start with a hook',
      'Practice your opening line',
      'End with a call to action'
    ]
  },
  {
    id: 'speaking-storytelling',
    title: 'Personal Story Narration',
    skill: 'Public Speaking',
    skillId: '2',
    level: 2,
    difficulty: 'Intermediate',
    estimated_time: '5 min',
    xp_reward: 65,
    description: 'Tell a personal story with emotional engagement and clear narrative structure.',
    success_criteria: [
      'Use storytelling structure (beginning, middle, end)',
      'Include emotional elements and personal connection',
      'Use vocal variety and pacing',
      'Maintain audience engagement',
      'Deliver a clear moral or lesson',
    ],
    tips: [
      'Start with a strong opening',
      'Use descriptive language',
      'Include conflict and resolution'
    ]
  },
  {
    id: 'speaking-persuasion',
    title: 'Persuasive Argument Delivery',
    skill: 'Public Speaking',
    skillId: '2',
    level: 3,
    difficulty: 'Advanced',
    estimated_time: '7 min',
    xp_reward: 90,
    description: 'Present a persuasive argument on a topic of your choice using rhetorical devices and evidence.',
    success_criteria: [
      'Use logical structure and clear thesis',
      'Include supporting evidence and examples',
      'Employ rhetorical devices (ethos, pathos, logos)',
      'Address potential counterarguments',
      'End with a strong call to action',
    ],
    tips: [
      'Start with a hook',
      'Use the three appeals',
      'Anticipate objections'
    ]
  },
  {
    id: 'speaking-improv',
    title: 'Impromptu Speaking Challenge',
    skill: 'Public Speaking',
    skillId: '2',
    level: 2,
    difficulty: 'Intermediate',
    estimated_time: '4 min',
    xp_reward: 70,
    description: 'Deliver a 2-minute impromptu speech on a random topic with minimal preparation time.',
    success_criteria: [
      'Organize thoughts quickly and coherently',
      'Speak confidently without notes',
      'Use clear structure and transitions',
      'Maintain audience engagement',
      'Handle unexpected topics gracefully',
    ],
    tips: [
      'Use the PREP method (Point, Reason, Example, Point)',
      'Take a moment to think',
      'Stay on topic'
    ]
  },

  // LIFE SKILLS - Leadership
  {
    id: 'leadership-team-motivation',
    title: 'Team Motivation Speech',
    skill: 'Leadership',
    skillId: '6',
    level: 2,
    difficulty: 'Intermediate',
    estimated_time: '6 min',
    xp_reward: 80,
    description: 'Deliver an inspiring speech to motivate a team facing a challenging project deadline.',
    success_criteria: [
      'Use inspiring and positive language',
      'Acknowledge team challenges and concerns',
      'Provide clear vision and direction',
      'Show empathy and understanding',
      'End with actionable next steps',
    ],
    tips: [
      'Start with appreciation',
      'Address concerns honestly',
      'Focus on shared goals'
    ]
  },
  {
    id: 'leadership-conflict-resolution',
    title: 'Conflict Resolution Role Play',
    skill: 'Leadership',
    skillId: '6',
    level: 3,
    difficulty: 'Advanced',
    estimated_time: '8 min',
    xp_reward: 100,
    description: 'Demonstrate conflict resolution skills by mediating a simulated workplace disagreement.',
    success_criteria: [
      'Listen actively to both parties',
      'Identify underlying issues and concerns',
      'Facilitate constructive dialogue',
      'Propose fair and practical solutions',
      'Maintain neutrality and professionalism',
    ],
    tips: [
      'Listen more than you speak',
      'Focus on interests, not positions',
      'Seek win-win solutions'
    ]
  },
  {
    id: 'leadership-vision-statement',
    title: 'Vision Statement Creation',
    skill: 'Leadership',
    skillId: '6',
    level: 1,
    difficulty: 'Beginner',
    estimated_time: '5 min',
    xp_reward: 60,
    description: 'Create and deliver a compelling vision statement for a project or organization.',
    success_criteria: [
      'Articulate a clear and inspiring vision',
      'Use memorable and impactful language',
      'Connect vision to practical goals',
      'Demonstrate passion and conviction',
      'Make vision relatable to audience',
    ],
    tips: [
      'Keep it simple and memorable',
      'Make it aspirational',
      'Include measurable outcomes'
    ]
  },

  // ARTS & CREATIVE - Photography
  {
    id: 'photo-composition-basics',
    title: 'Rule of Thirds Photography',
    skill: 'Photography',
    skillId: '3',
    level: 1,
    difficulty: 'Beginner',
    estimated_time: '10 min',
    xp_reward: 55,
    description: 'Take 5 photos demonstrating the rule of thirds composition technique with different subjects.',
    success_criteria: [
      'Position subjects on intersection points',
      'Use both horizontal and vertical compositions',
      'Include variety of subjects (landscape, portrait, still life)',
      'Ensure proper focus and exposure',
      'Explain your compositional choices',
    ],
    tips: [
      'Enable grid lines on your camera',
      'Look for natural lines and shapes',
      'Don\'t always center your subject'
    ]
  },
  {
    id: 'photo-lighting-techniques',
    title: 'Natural Light Portraiture',
    skill: 'Photography',
    skillId: '3',
    level: 2,
    difficulty: 'Intermediate',
    estimated_time: '15 min',
    xp_reward: 85,
    description: 'Create a portrait using only natural light, demonstrating understanding of lighting direction and quality.',
    success_criteria: [
      'Use soft, diffused natural light',
      'Position subject relative to light source',
      'Avoid harsh shadows on face',
      'Create catch lights in eyes',
      'Achieve proper exposure and focus',
    ],
    tips: [
      'Use window light for soft illumination',
      'Position subject at 45-degree angle',
      'Use reflectors to fill shadows'
    ]
  },
  {
    id: 'photo-street-photography',
    title: 'Street Photography Story',
    skill: 'Photography',
    skillId: '3',
    level: 3,
    difficulty: 'Advanced',
    estimated_time: '20 min',
    xp_reward: 110,
    description: 'Capture 3-5 street photography images that tell a story or convey emotion about urban life.',
    success_criteria: [
      'Capture candid moments and expressions',
      'Use leading lines and framing',
      'Include environmental context',
      'Demonstrate timing and anticipation',
      'Create emotional connection with subjects',
    ],
    tips: [
      'Be respectful of subjects',
      'Look for interesting interactions',
      'Use wide apertures for subject isolation'
    ]
  },
  {
    id: 'photo-macro-challenge',
    title: 'Macro Photography Exploration',
    skill: 'Photography',
    skillId: '3',
    level: 2,
    difficulty: 'Intermediate',
    estimated_time: '12 min',
    xp_reward: 75,
    description: 'Take close-up photographs of small objects, focusing on texture, detail, and creative composition.',
    success_criteria: [
      'Achieve sharp focus on small details',
      'Use shallow depth of field effectively',
      'Find interesting textures and patterns',
      'Create abstract compositions',
      'Demonstrate technical macro skills',
    ],
    tips: [
      'Use manual focus for precision',
      'Stabilize your camera',
      'Look for patterns and textures'
    ]
  },

  // ARTS & CREATIVE - Guitar
  {
    id: 'guitar-basic-chords',
    title: 'Open Chord Progression',
    skill: 'Guitar',
    skillId: '4',
    level: 1,
    difficulty: 'Beginner',
    estimated_time: '8 min',
    xp_reward: 60,
    description: 'Play a simple chord progression using open chords (C, G, Am, F) with proper strumming technique.',
    success_criteria: [
      'Play each chord clearly without buzzing',
      'Maintain consistent strumming rhythm',
      'Transition smoothly between chords',
      'Keep steady tempo throughout',
      'Demonstrate proper hand positioning',
    ],
    tips: [
      'Practice chord changes slowly',
      'Use a metronome for timing',
      'Keep your thumb behind the neck'
    ]
  },
  {
    id: 'guitar-fingerpicking',
    title: 'Fingerpicking Pattern',
    skill: 'Guitar',
    skillId: '4',
    level: 2,
    difficulty: 'Intermediate',
    estimated_time: '10 min',
    xp_reward: 80,
    description: 'Play a fingerpicking pattern using thumb and fingers, maintaining consistent rhythm and tone.',
    success_criteria: [
      'Use thumb for bass notes',
      'Alternate fingers for melody notes',
      'Maintain consistent fingerpicking pattern',
      'Keep steady tempo and rhythm',
      'Produce clear, distinct notes',
    ],
    tips: [
      'Start with simple patterns',
      'Use thumb for 4th, 5th, and 6th strings',
      'Keep fingers close to strings'
    ]
  },
  {
    id: 'guitar-barre-chords',
    title: 'Barre Chord Mastery',
    skill: 'Guitar',
    skillId: '4',
    level: 3,
    difficulty: 'Advanced',
    estimated_time: '12 min',
    xp_reward: 100,
    description: 'Demonstrate barre chord technique by playing major and minor barre chords in different positions.',
    success_criteria: [
      'Play clean barre chords without buzzing',
      'Transition between different barre chord shapes',
      'Maintain proper finger pressure',
      'Play both major and minor barre chords',
      'Demonstrate understanding of chord theory',
    ],
    tips: [
      'Position your index finger correctly',
      'Use the side of your finger for the barre',
      'Practice with a capo to build strength'
    ]
  },
  {
    id: 'guitar-strumming-patterns',
    title: 'Advanced Strumming Patterns',
    skill: 'Guitar',
    skillId: '4',
    level: 2,
    difficulty: 'Intermediate',
    estimated_time: '8 min',
    xp_reward: 70,
    description: 'Play complex strumming patterns with syncopation and rhythm variations while maintaining chord changes.',
    success_criteria: [
      'Execute syncopated strumming patterns',
      'Maintain consistent rhythm and timing',
      'Combine strumming with chord changes',
      'Use dynamics (loud/soft strumming)',
      'Keep steady tempo throughout',
    ],
    tips: [
      'Practice patterns without chords first',
      'Use a metronome for timing',
      'Start slow and gradually increase speed'
    ]
  },

  // FITNESS & SPORTS
  {
    id: 'fitness-bodyweight-circuit',
    title: 'Bodyweight Circuit Training',
    skill: 'Fitness',
    skillId: '7',
    level: 1,
    difficulty: 'Beginner',
    estimated_time: '15 min',
    xp_reward: 70,
    description: 'Complete a circuit of bodyweight exercises demonstrating proper form and technique.',
    success_criteria: [
      'Perform push-ups with proper form',
      'Execute squats with full range of motion',
      'Complete planks with proper alignment',
      'Maintain consistent pace throughout circuit',
      'Demonstrate proper breathing technique',
    ],
    tips: [
      'Focus on form over speed',
      'Keep core engaged throughout',
      'Breathe steadily during exercises'
    ]
  },
  {
    id: 'fitness-yoga-flow',
    title: 'Sun Salutation Flow',
    skill: 'Fitness',
    skillId: '7',
    level: 2,
    difficulty: 'Intermediate',
    estimated_time: '12 min',
    xp_reward: 75,
    description: 'Perform a complete sun salutation sequence with proper alignment and breathing.',
    success_criteria: [
      'Execute each pose with proper alignment',
      'Synchronize movement with breath',
      'Maintain smooth transitions between poses',
      'Demonstrate flexibility and strength',
      'Complete full sequence with mindfulness',
    ],
    tips: [
      'Move with your breath',
      'Keep your core engaged',
      'Don\'t rush through poses'
    ]
  },
  {
    id: 'fitness-strength-training',
    title: 'Dumbbell Strength Workout',
    skill: 'Fitness',
    skillId: '7',
    level: 2,
    difficulty: 'Intermediate',
    estimated_time: '20 min',
    xp_reward: 90,
    description: 'Complete a strength training workout using dumbbells with proper form and progressive overload.',
    success_criteria: [
      'Perform compound movements with proper form',
      'Maintain controlled movement throughout',
      'Demonstrate understanding of rep ranges',
      'Use appropriate weight selection',
      'Complete full workout with proper rest periods',
    ],
    tips: [
      'Start with lighter weights',
      'Focus on form first',
      'Control the movement in both directions'
    ]
  },
  {
    id: 'fitness-cardio-interval',
    title: 'High-Intensity Interval Training',
    skill: 'Fitness',
    skillId: '7',
    level: 3,
    difficulty: 'Advanced',
    estimated_time: '25 min',
    xp_reward: 110,
    description: 'Complete a HIIT workout alternating between high-intensity exercises and active recovery periods.',
    success_criteria: [
      'Maintain high intensity during work periods',
      'Use active recovery during rest periods',
      'Demonstrate proper form under fatigue',
      'Complete full interval structure',
      'Show cardiovascular endurance',
    ],
    tips: [
      'Push yourself during work intervals',
      'Keep moving during recovery',
      'Listen to your body'
    ]
  }
];

// Helper function to get challenges by skill
export const getChallengesBySkill = (skillId: string): Challenge[] => {
  return CHALLENGES.filter(challenge => challenge.skillId === skillId);
};

// Helper function to get challenge by ID
export const getChallengeById = (challengeId: string): Challenge | undefined => {
  return CHALLENGES.find(challenge => challenge.id === challengeId);
};

// Helper function to get random challenge for a skill
export const getRandomChallengeForSkill = (skillId: string): Challenge | undefined => {
  const skillChallenges = getChallengesBySkill(skillId);
  if (skillChallenges.length === 0) return undefined;
  
  const randomIndex = Math.floor(Math.random() * skillChallenges.length);
  return skillChallenges[randomIndex];
}; 
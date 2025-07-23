# SkillDuel - Master any skill, challenge the world

SkillDuel is a gamified learning platform that transforms educational content into competitive, AI-powered challenges. Users can learn new skills through daily micro-challenges and compete against friends and rivals in skill-based duels.

## 🚀 Features Implemented

### ✅ Core Navigation & UI
- **Authentication Flow**: Social login with Google/Apple placeholders
- **Onboarding**: Skill category selection with beautiful carousel UI
- **Bottom Tab Navigation**: Home, Duel, and Profile tabs
- **Screen Stack**: Challenge details, recording, and results screens

### ✅ Main Screens
- **Dashboard**: Daily challenges, user stats, skill progress tracking
- **Duel System**: Skill selection, opponent matching, active duel management
- **Profile**: User stats, badges, recent activity, settings
- **Challenge Detail**: Instructions, success criteria, tips, and examples
- **Recording**: Camera interface with criteria checklist and progress tracking
- **Duel Results**: Side-by-side comparison with AI feedback and sharing

### ✅ Technical Foundation
- **React Navigation**: Stack and bottom tab navigators with TypeScript
- **State Management**: Zustand for client state, TanStack Query for server state
- **Supabase Integration**: Database schema, authentication, and client setup
- **Modern UI**: Clean, responsive design with React Native Vector Icons

## 🛠 Tech Stack

- **Frontend**: React Native CLI (not Expo)
- **Navigation**: React Navigation v7
- **State Management**: Zustand + TanStack Query
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Icons**: React Native Vector Icons (Material Icons)
- **Package Manager**: Yarn

## 📱 Database Schema

The app implements a comprehensive database schema with the following entities:
- `users` - User profiles and authentication data
- `skills` - Available skills with categories and metadata
- `user_skills` - User progress in specific skills
- `challenges` - Learning challenges with AI judging criteria
- `challenge_submissions` - User submissions with AI scoring
- `duels` - Competitive matches between users
- `duel_participants` - Individual submissions within duels

## 🔧 Setup Instructions

### Prerequisites
- Node.js 18+
- React Native development environment
- iOS: Xcode, CocoaPods
- Android: Android Studio, Java JDK
- Yarn package manager

### 1. Installation

```bash
# Navigate to the project directory
cd SkillDuel

# Install dependencies
yarn install

# iOS setup
cd ios && pod install && cd ..
```

### 2. Supabase Configuration

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Copy your project URL and anon key
3. Update `src/services/supabase.ts`:

```typescript
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';
```

4. Run the database schema setup in your Supabase SQL editor:

```sql
-- Create users table
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    auth_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) NOT NULL,
    profile_avatar_url TEXT,
    xp_total INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Create skills table
CREATE TABLE skills (
    skill_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL,
    icon_url TEXT,
    is_premium BOOLEAN DEFAULT FALSE
);

-- Create user_skills table
CREATE TABLE user_skills (
    user_skill_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    skill_id UUID REFERENCES skills(skill_id) ON DELETE CASCADE,
    current_level INTEGER DEFAULT 1,
    xp_in_skill INTEGER DEFAULT 0
);

-- Create challenges table
CREATE TABLE challenges (
    challenge_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    skill_id UUID REFERENCES skills(skill_id) ON DELETE CASCADE,
    level INTEGER NOT NULL,
    title VARCHAR(200) NOT NULL,
    instruction_video_url TEXT,
    ai_judging_prompt TEXT
);

-- Create challenge_submissions table
CREATE TABLE challenge_submissions (
    submission_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    challenge_id UUID REFERENCES challenges(challenge_id) ON DELETE CASCADE,
    submission_video_url TEXT,
    ai_score INTEGER,
    ai_feedback_text TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Create duels table
CREATE TABLE duels (
    duel_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    challenge_id UUID REFERENCES challenges(challenge_id) ON DELETE CASCADE,
    status TEXT DEFAULT 'pending',
    winner_id UUID REFERENCES users(user_id),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Create duel_participants table
CREATE TABLE duel_participants (
    participant_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    duel_id UUID REFERENCES duels(duel_id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    submission_video_url TEXT,
    score INTEGER
);
```

### 3. Running the App

```bash
# Start Metro bundler
yarn start

# Run on iOS (in a new terminal)
yarn ios

# Run on Android (in a new terminal)
yarn android
```

## 🏗 Project Structure

```
src/
├── components/         # Reusable UI components
├── navigation/         # Navigation configuration
├── screens/           # Screen components
├── services/          # API clients and utilities
├── stores/            # Zustand state stores
├── types/             # TypeScript type definitions
└── utils/             # Helper functions
```

## 🎯 Next Steps for Full Implementation

### Authentication & Social Login
- [ ] Implement Google OAuth integration
- [ ] Implement Apple Sign-In
- [ ] Add email/password authentication fallback

### Media & Camera
- [ ] Integrate react-native-camera for video recording
- [ ] Implement video upload to Supabase Storage
- [ ] Add video playback with react-native-video

### AI Integration
- [ ] OpenAI GPT-4 Vision API for challenge scoring
- [ ] AssemblyAI for speech analysis
- [ ] Real-time AI feedback generation

### Core Features
- [ ] Real-time duel notifications with Supabase Realtime
- [ ] In-app purchases with RevenueCat
- [ ] Push notifications for challenges and duels
- [ ] Skill tree progression system
- [ ] Leaderboards and social features

### Polish & Production
- [ ] Error handling and loading states
- [ ] Offline support and caching
- [ ] Performance optimization
- [ ] Testing (unit, integration, e2e)
- [ ] App store deployment

## 🤝 Contributing

This is a comprehensive foundation for the SkillDuel app. The core navigation, state management, and UI components are implemented with mock data. To continue development:

1. Set up your Supabase backend
2. Replace mock data with real API calls
3. Implement camera and video functionality
4. Add AI integration for challenge scoring
5. Enhance UI with animations and micro-interactions

## 📄 License

This project is part of a development demonstration. Please refer to your specific licensing requirements.

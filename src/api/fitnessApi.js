import axios from 'axios';

const API_BASE_URL = 'https://api.api-ninjas.com/v1';
const API_KEY = 'YOUR_API_KEY_HERE';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'X-Api-Key': API_KEY,
  },
  timeout: 10000,
});

export const fetchExercises = async (muscle = 'biceps', offset = 0) => {
  try {
    const response = await apiClient.get('/exercises', {
      params: {
        muscle,
        offset,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching exercises:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch exercises');
  }
};

export const fetchExerciseByName = async (name) => {
  try {
    const response = await apiClient.get('/exercises', {
      params: {
        name,
      },
    });
    return response.data?.[0] || null;
  } catch (error) {
    console.error('Error fetching exercise:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch exercise');
  }
};

export const getFallbackExercises = () => {
  return [
    {
      name: 'Push-ups',
      type: 'strength',
      muscle: 'chest',
      equipment: 'body only',
      difficulty: 'beginner',
      instructions: 'Start in plank position, lower body until chest nearly touches floor, push back up.',
    },
    {
      name: 'Squats',
      type: 'strength',
      muscle: 'quadriceps',
      equipment: 'body only',
      difficulty: 'beginner',
      instructions: 'Stand with feet shoulder-width apart, lower body as if sitting, return to standing.',
    },
    {
      name: 'Plank',
      type: 'strength',
      muscle: 'abdominals',
      equipment: 'body only',
      difficulty: 'beginner',
      instructions: 'Hold body in straight line, supported on forearms and toes.',
    },
    {
      name: 'Lunges',
      type: 'strength',
      muscle: 'quadriceps',
      equipment: 'body only',
      difficulty: 'intermediate',
      instructions: 'Step forward into lunge position, lower back knee toward ground, push back to start.',
    },
    {
      name: 'Burpees',
      type: 'strength',
      muscle: 'full body',
      equipment: 'body only',
      difficulty: 'intermediate',
      instructions: 'Squat down, jump back to plank, do push-up, jump feet forward, jump up.',
    },
  ];
};


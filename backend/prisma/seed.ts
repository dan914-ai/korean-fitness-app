import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const exercises = [
  // Chest exercises
  {
    exerciseName: '벤치프레스',
    category: '근력운동',
    muscleGroup: '가슴',
    equipment: '바벨',
    difficulty: '중급',
    instructions: '벤치에 누워 바벨을 가슴까지 내렸다가 밀어올립니다.',
    caloriesPerMinute: 8
  },
  {
    exerciseName: '덤벨 플라이',
    category: '근력운동',
    muscleGroup: '가슴',
    equipment: '덤벨',
    difficulty: '초급',
    instructions: '덤벨을 양손에 들고 가슴 근육을 늘렸다가 모읍니다.',
    caloriesPerMinute: 6
  },
  
  // Back exercises
  {
    exerciseName: '랫풀다운',
    category: '근력운동',
    muscleGroup: '등',
    equipment: '케이블',
    difficulty: '초급',
    instructions: '바를 가슴쪽으로 당겨 등 근육을 수축시킵니다.',
    caloriesPerMinute: 7
  },
  {
    exerciseName: '데드리프트',
    category: '근력운동',
    muscleGroup: '등',
    equipment: '바벨',
    difficulty: '고급',
    instructions: '바닥의 바벨을 허리를 곧게 펴고 들어올립니다.',
    caloriesPerMinute: 10
  },
  
  // Leg exercises
  {
    exerciseName: '스쿼트',
    category: '근력운동',
    muscleGroup: '하체',
    equipment: '바벨',
    difficulty: '중급',
    instructions: '바벨을 어깨에 메고 앉았다가 일어섭니다.',
    caloriesPerMinute: 9
  },
  {
    exerciseName: '레그프레스',
    category: '근력운동',
    muscleGroup: '하체',
    equipment: '머신',
    difficulty: '초급',
    instructions: '발판을 밀어 다리를 펴고 천천히 굽힙니다.',
    caloriesPerMinute: 8
  },
  
  // Shoulder exercises
  {
    exerciseName: '숄더프레스',
    category: '근력운동',
    muscleGroup: '어깨',
    equipment: '덤벨',
    difficulty: '중급',
    instructions: '덤벨을 어깨 위로 밀어올립니다.',
    caloriesPerMinute: 7
  },
  {
    exerciseName: '사이드 래터럴 레이즈',
    category: '근력운동',
    muscleGroup: '어깨',
    equipment: '덤벨',
    difficulty: '초급',
    instructions: '덤벨을 옆으로 들어올려 어깨 높이까지 올립니다.',
    caloriesPerMinute: 5
  },
  
  // Arm exercises
  {
    exerciseName: '바벨 컬',
    category: '근력운동',
    muscleGroup: '팔',
    equipment: '바벨',
    difficulty: '초급',
    instructions: '바벨을 들고 팔을 굽혀 이두근을 수축시킵니다.',
    caloriesPerMinute: 5
  },
  {
    exerciseName: '트라이셉스 익스텐션',
    category: '근력운동',
    muscleGroup: '팔',
    equipment: '덤벨',
    difficulty: '초급',
    instructions: '덤벨을 머리 뒤로 들고 팔을 펴서 삼두근을 자극합니다.',
    caloriesPerMinute: 4
  },
  
  // Core exercises
  {
    exerciseName: '플랭크',
    category: '코어운동',
    muscleGroup: '복근',
    equipment: '맨몸',
    difficulty: '초급',
    instructions: '팔꿈치로 지탱하며 몸을 일직선으로 유지합니다.',
    caloriesPerMinute: 4
  },
  {
    exerciseName: '크런치',
    category: '코어운동',
    muscleGroup: '복근',
    equipment: '맨몸',
    difficulty: '초급',
    instructions: '누워서 상체를 들어올려 복근을 수축시킵니다.',
    caloriesPerMinute: 5
  },
  
  // Cardio exercises
  {
    exerciseName: '트레드밀 러닝',
    category: '유산소',
    muscleGroup: '전신',
    equipment: '트레드밀',
    difficulty: '초급',
    instructions: '트레드밀에서 일정한 속도로 달립니다.',
    caloriesPerMinute: 12
  },
  {
    exerciseName: '사이클',
    category: '유산소',
    muscleGroup: '하체',
    equipment: '사이클',
    difficulty: '초급',
    instructions: '사이클 머신에서 일정한 속도로 페달을 밟습니다.',
    caloriesPerMinute: 10
  },
  {
    exerciseName: '로잉머신',
    category: '유산소',
    muscleGroup: '전신',
    equipment: '로잉머신',
    difficulty: '중급',
    instructions: '로잉머신에서 노 젓기 동작을 반복합니다.',
    caloriesPerMinute: 11
  }
];

async function main() {
  console.log('🌱 Starting seed...');
  
  // Clear existing exercises
  await prisma.exercise.deleteMany();
  
  // Insert exercises
  for (const exercise of exercises) {
    await prisma.exercise.create({
      data: exercise
    });
  }
  
  console.log(`✅ Seeded ${exercises.length} exercises`);
  
  // Create sample achievements
  const achievements = [
    {
      achievementName: '첫 운동',
      description: '첫 번째 운동을 완료했습니다!',
      category: '운동',
      requiredValue: 1,
      points: 10
    },
    {
      achievementName: '일주일 연속 운동',
      description: '7일 연속으로 운동했습니다!',
      category: '운동',
      requiredValue: 7,
      points: 50
    },
    {
      achievementName: '100kg 클럽',
      description: '벤치프레스, 스쿼트, 데드리프트 합계 100kg 달성!',
      category: '근력',
      requiredValue: 100,
      points: 100
    },
    {
      achievementName: '다이어트 성공',
      description: '목표 체중을 달성했습니다!',
      category: '체중',
      requiredValue: 1,
      points: 75
    }
  ];
  
  await prisma.achievement.deleteMany();
  
  for (const achievement of achievements) {
    await prisma.achievement.create({
      data: achievement
    });
  }
  
  console.log(`✅ Seeded ${achievements.length} achievements`);
  
  console.log('🎉 Seed completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
import app from './app';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

// Test database connection
async function startServer() {
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully');
    
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`🏋️ Korean Fitness App Backend Ready!`);
    });
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

startServer();
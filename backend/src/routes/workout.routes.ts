import { Router } from 'express';
import { WorkoutController } from '../controllers/workout.controller';

const router = Router();
const workoutController = new WorkoutController();

router.post('/', workoutController.createWorkout);
router.get('/', workoutController.getWorkouts);
router.get('/:id', workoutController.getWorkoutById);
router.put('/:id', workoutController.updateWorkout);
router.delete('/:id', workoutController.deleteWorkout);

export default router;
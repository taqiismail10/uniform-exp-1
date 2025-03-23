import { Router } from 'express';
import applicationFormController from '../controllers/applicationFormControllers.js';
import authController from '../controllers/authController.js';
import profileController from '../controllers/profileController.js';
import authMiddleware from '../middleware/authenticate.js';

const router = Router()


router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);

// * Profile routes
router.get("/profile", authMiddleware, profileController.index); // Private route


router.post("/application-form", authMiddleware, applicationFormController.create);

export default router;
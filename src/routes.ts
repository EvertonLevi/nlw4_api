import { Router } from 'express';
import { SurveysController } from './controllers/SurveysController';
import { UserController } from './controllers/UserController';
import { SendMailController } from './controllers/SendMailController';

const router = Router();

const sendMailController = new SendMailController();

const userController = new UserController();
const surveyController = new SurveysController();

router.post('/users', userController.create);

router.post('/surveys', surveyController.create);
router.get('/surveys', surveyController.show);

router.post('/sendMail', sendMailController.execute);

export { router };
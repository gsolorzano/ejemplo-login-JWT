import { Router } from "express";
import Login_Controller from "../controllers/login.controller";
import verify from '../lib/verificarToken'

const router = Router();

router.post("/register", Login_Controller.Login);
router.post("/", Login_Controller.testUser);
router.post("/test", verify,Login_Controller.testToken);

export default router;
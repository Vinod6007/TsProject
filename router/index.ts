import { Router } from 'express';
const router: Router = Router();

import Company from './company.routes';
import Login from './login.routes';
import userData  from "./userdata.routes";
import post  from "./post.router";
import contact  from "./contactUs.routes";
import  help  from "./helpUs.routes";
import faq from "./faq.routes";
import  policy  from "./privacyPolicy.routes";
import  dating  from "./datingApp.routes";

router.use('/company', Company)
router.use('/login', Login)
router.use('/userData',userData)
router.use("/post",post)
router.use("/contact",contact)
router.use("/help",help)
router.use("/faq",faq)
router.use("/policy",policy)
router.use("/dating",dating)


export default router
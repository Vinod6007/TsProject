import {Router} from 'express';
import { saveCompany,updateUser } from '../controller/company.controller';
import { checkRequestBodyParams } from '../middleware/Validators';
import { basicAuthUser } from '../middleware/checkAuth';
import { checkSession } from '../utils/tokenManager';
const router:Router=Router();

router.post('/',
    basicAuthUser,
    checkRequestBodyParams('email'),
    checkRequestBodyParams('password'),
    saveCompany
);

router.put("/",
    basicAuthUser,
    checkSession,
    checkRequestBodyParams('_id'),
    updateUser
);
export default router;
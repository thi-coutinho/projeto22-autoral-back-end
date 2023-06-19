import { Router } from 'express';

import { validateBody } from '@/middlewares';
import { createIdeiaSchema } from '@/schemas';
import { createIdeia } from '@/controllers';
import { AuthMiddleware } from '@/middlewares/auth-middleware';

const ideiasRouter = Router();

ideiasRouter.post('/', validateBody(createIdeiaSchema), AuthMiddleware, createIdeia);

export { ideiasRouter };

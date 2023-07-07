import { Router } from 'express';

import { createElements, createOrUpdateProject, deleteProject, getAllElements, getAllProjects } from '@/controllers';
import { validateBody } from '@/middlewares';
import { createOrUpdateProjectSchema } from '@/schemas';
import { AuthMiddleware } from '@/middlewares/auth-middleware';
import { createManyElements } from '@/schemas/elements-schema';

const projectRouter = Router();

projectRouter.get('/', AuthMiddleware, getAllProjects);
projectRouter.get('/:id/elements', AuthMiddleware, getAllElements);
projectRouter.put('/', validateBody(createOrUpdateProjectSchema), AuthMiddleware, createOrUpdateProject);
projectRouter.post('/:id/elements', validateBody(createManyElements), AuthMiddleware, createElements);
projectRouter.delete('/:id', AuthMiddleware, deleteProject);

export { projectRouter };

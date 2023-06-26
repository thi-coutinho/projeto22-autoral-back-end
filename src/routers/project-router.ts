import { Router } from 'express';

import { createOrUpdateProject, deleteProject, getAllElements, getAllProjects } from '@/controllers';
import { validateBody } from '@/middlewares';
import { createOrUpdateProjectSchema, deleteProjectSchema } from '@/schemas';
import { AuthMiddleware } from '@/middlewares/auth-middleware';

const projectRouter = Router();

projectRouter.get('/', AuthMiddleware, getAllProjects);
projectRouter.get('/:id/elements', AuthMiddleware, getAllElements);
projectRouter.put('/', validateBody(createOrUpdateProjectSchema), AuthMiddleware, createOrUpdateProject);
projectRouter.delete('/', validateBody(deleteProjectSchema), AuthMiddleware, deleteProject);

export { projectRouter };

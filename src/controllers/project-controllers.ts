import { NextFunction, Request } from 'express';
import httpStatus from 'http-status';
import { AuthorizedResponse } from '@/middlewares/auth-middleware';
import projectService from '@/services/project-service';

type bodyCreateOrUpdateProject = {
  id?: string | number;
  objective: string;
  name: string;
  imageURL?: string | null;
};

export async function createOrUpdateProject(req: Request, res: AuthorizedResponse, next: NextFunction) {
  const { objective, name, imageURL } = req.body as bodyCreateOrUpdateProject;
  const id = parseInt(req.body.id);
  const userId = res.locals.userId;
  try {
    const project = await projectService.createProject({ objective, name, id, userId, imageURL });
    res.send(project).status(httpStatus.CREATED);
  } catch (error) {
    next(error);
  }
}

export async function getAllElements(req: Request, res: AuthorizedResponse, next: NextFunction) {
  const { id } = req.params as { id: string };
  const userId = res.locals.userId;
  try {
    const projectElements = await projectService.getAllElements(parseInt(id), userId);
    res.send(projectElements);
  } catch (error) {
    next(error);
  }
}

export async function getAllProjects(req: Request, res: AuthorizedResponse, next: NextFunction) {
  const userId = res.locals.userId;
  try {
    const projects = await projectService.getAllProjects(userId);
    res.send(projects);
  } catch (error) {
    next(error);
  }
}

export async function deleteProject(req: Request, res: AuthorizedResponse, next: NextFunction) {
  const { id } = req.params as { id: string };
  const userId = res.locals.userId;
  try {
    await projectService.deleteProject(parseInt(id), userId);
    res.sendStatus(httpStatus.OK);
  } catch (error) {
    next(error);
  }
}

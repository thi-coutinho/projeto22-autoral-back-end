import { Project, Prisma } from '@prisma/client';
import projectRepository from '@/repositories/project-repository';
import { forBiddenError } from '@/errors';

export async function createProject(project: Prisma.ProjectUncheckedCreateWithoutElementInput): Promise<Project> {
  if (project.id) await checkOwnerProject(project.id, project.userId);
  return await projectRepository.createOrUpdate(project);
}

async function checkOwnerProject(id: number, userId: number) {
  const project = await projectRepository.findById(id);
  if (project.userId !== userId) throw forBiddenError();
}

async function deleteProject(id: number, userId: number) {
  await checkOwnerProject(id, userId);
  await projectRepository.deleteProject(id);
}

async function getAllElements(id: number, userId: number) {
  await checkOwnerProject(id, userId);
  const projectAllElements = await projectRepository.getAllElements(id);
  return projectAllElements;
}

async function getAllProjects(userId: number) {
  const projectAllElements = await projectRepository.findAllProjects(userId);
  return projectAllElements;
}

const projectService = {
  createProject,
  deleteProject,
  getAllElements,
  getAllProjects,
};

export default projectService;

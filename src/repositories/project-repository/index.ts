import { Prisma } from '@prisma/client';
import { prisma } from '@/config';

async function createOrUpdate(data: Prisma.ProjectUncheckedCreateWithoutElementInput) {
  return prisma.project.upsert({
    where: {
      id: data.id ? data.id : 0,
    },
    create: { name: data.name, objective: data.objective, userId: data.userId },
    update: { name: data.name, objective: data.objective },
  });
}

async function findById(id: number) {
  return prisma.project.findUnique({ where: { id } });
}

async function createManyElements(data: Prisma.ElementUncheckedCreateInput[]) {
  return prisma.element.createMany({ data });
}

async function findAllProjects(userId: number) {
  return prisma.project.findMany({
    where: {
      userId,
    },
  });
}

async function deleteProject(id: number) {
  return prisma.project.delete({
    where: {
      id,
    },
  });
}

async function getAllElements(id: number) {
  return prisma.project.findUnique({
    where: { id },
    include: {
      Element: {
        include: { Property: true },
      },
    },
  });
}

const projectRepository = {
  createOrUpdate,
  findById,
  findAllProjects,
  createManyElements,
  deleteProject,
  getAllElements,
};

export default projectRepository;

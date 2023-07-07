import { Prisma } from '@prisma/client';
import { prisma } from '@/config';
import { ElementsCreateInput } from '@/schemas';

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

async function createManyElements({ projectId, Elements: elementsList }: ElementsCreateInput) {
  console.log(projectId, JSON.stringify(elementsList));
  const ElementsCreated = [];
  for (let i = 0; i < elementsList.length; i++) {
    const { Type, Property } = elementsList[i];
    const params = {
      data: { Type, projectId, Property: { create: Property } },
      include: { Property: true },
    };
    try {
      const elementCreated = await prisma.element.create(params);
      ElementsCreated.push(elementCreated);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          console.log('There is a unique constraint violation');
        }
      }
      throw e;
    }
  }
  return ElementsCreated;
}
async function updateManyElements(data: Prisma.ElementUncheckedCreateInput[]) {
  return prisma.element.updateMany({ data });
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
  updateManyElements,
};

export default projectRepository;

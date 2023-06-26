import { Prisma } from '@prisma/client';
import Joi from 'joi';

export const createOrUpdateProjectSchema = Joi.object<Prisma.ProjectUncheckedCreateInput>({
  name: Joi.string().min(3).required(),
  objective: Joi.string().min(3).required(),
  id: Joi.string(),
});

export const deleteProjectSchema = Joi.object({
  id: Joi.string(),
});

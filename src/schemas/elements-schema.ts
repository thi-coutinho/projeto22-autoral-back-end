import { Prisma } from '@prisma/client';
import Joi from 'joi';

export const createElements = Joi.object<Prisma.ElementUncheckedCreateInput>({
  Type: Joi.string().valid('Box', 'Arrow', 'Text', 'Line'),
  projectId: Joi.number().integer().required(),
  Property: Joi.array<Prisma.PropertyCreateManyInput[]>().items(
    Joi.object({
      name: Joi.string().required(),
      value: Joi.string().required(),
    }),
  ),
});

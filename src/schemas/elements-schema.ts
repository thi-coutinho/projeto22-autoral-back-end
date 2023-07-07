import { ElementType } from '@prisma/client';
import Joi from 'joi';

type Property = {
  name: string;
  value: string;
};

type Element = {
  Type: ElementType;
  Property?: Property[];
};
export type ElementsCreateInput = {
  projectId: number;
  Elements: Element[];
};

export const createManyElements = Joi.object<ElementsCreateInput>({
  projectId: Joi.number().integer().required(),
  Elements: Joi.array().items(
    Joi.object<Element>({
      Type: Joi.string().valid('Box', 'Arrow', 'Text', 'Line').required(),
      Property: Joi.array<Property>().items(
        Joi.object<Property>({
          name: Joi.string().required(),
          value: Joi.string().required(),
        }),
      ),
    }),
  ),
});

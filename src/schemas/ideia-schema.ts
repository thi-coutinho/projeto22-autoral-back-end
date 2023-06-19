import Joi from 'joi';

export const createIdeiaSchema = Joi.object<CreateIdeiaParams>({
  ideia: Joi.string().min(2).required(),
  objective: Joi.string().min(2).required(),
  position: Joi.object<Iposition>({
    top: Joi.number().positive().integer(),
    left: Joi.number().positive().integer(),
  }).required(),
});

export type CreateIdeiaParams = {
  ideia: string;
  objective: string;
  position: Iposition;
};

export type Iposition = {
  top: number;
  left: number;
};

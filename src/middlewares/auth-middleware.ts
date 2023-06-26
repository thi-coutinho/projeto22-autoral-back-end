import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import httpStatus from 'http-status';
import { unauthorizedError } from '@/errors';
import userRepository from '@/repositories/user-repository';

export function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (!authorization) return generateUnauthorizedResponse(res);
  const parts = authorization.split(' ');
  if (parts.length !== 2) return generateUnauthorizedResponse(res);

  const [schema, token] = parts;
  if (schema !== 'Bearer') return generateUnauthorizedResponse(res);
  jwt.verify(token, process.env.JWT_SECRET, async (error, decoded: JwtPayload) => {
    try {
      if (error !== null) return generateUnauthorizedResponse(res);

      const userId = await userRepository.findById(parseInt(decoded.userId), { id: true });

      if (!userId) return generateUnauthorizedResponse(res);

      res.locals.userId = userId.id;
      next();
    } catch (err) {
      return generateUnauthorizedResponse(res);
    }
  });
}

type userId = {
  userId: number;
};

export type AuthorizedResponse = Response & { locals: userId };

function generateUnauthorizedResponse(res: Response) {
  res.status(httpStatus.UNAUTHORIZED).send(unauthorizedError());
}

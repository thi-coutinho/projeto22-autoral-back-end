import { ApplicationError } from '@/protocols';

export function badRequestError(details?: string): ApplicationError {
  return {
    name: 'BadRequestError',
    message: details ?? 'Bad Request Error!',
  };
}

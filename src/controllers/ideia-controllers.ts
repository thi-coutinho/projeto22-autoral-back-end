import { Request, Response } from 'express';
import httpStatus from 'http-status';
// import authenticationService, { SignInParams } from '@/services/authentication-service';
import { CreateIdeiaParams } from '@/schemas';
import openai from '@/config/openai';

export async function createIdeia(req: Request, res: Response) {
  const { ideia, position, objective } = req.body as CreateIdeiaParams;
  console.log(ideia, position);
  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `Meu objetivo é :'${objective}'. Você deve me ajudar a fazer um brainstorm de ideias e deve responder 
          sempre em uma única linha separandas por ';'. Exemplo de resposta: 'texto1; texto2; texto3.' Cada 'texto' deve conter no máximo 5 palavras`,
        },
        { role: 'user', content: `Me dê 3 ideias relacionadas com: ${ideia}` },
      ],
    });
    console.log(completion.data.choices[0].message, position.left, position.top);
    return res.status(httpStatus.OK).send(completion.data.choices[0].message);
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
    return res.status(httpStatus.UNAUTHORIZED).send({});
  }
}

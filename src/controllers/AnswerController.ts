import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { AppError } from '../errors/AppError';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';

class AnswerController {
	async execute(request: Request, response: Response) {
		const { value } = request.params;
		const { u } = request.query;

		const surveysUserRepositoy = getCustomRepository(SurveysUsersRepository);

		const surveyUser = await surveysUserRepositoy.findOne({
			id: String(u)
		})

		if (!surveyUser) {
			// estrutura de lançamentos de erros
			throw new AppError("Survey User does not exists");
		}

		surveyUser.value = Number(value);

		await surveysUserRepositoy.save(surveyUser);

		return response.json(surveyUser);

	}
}

export { AnswerController };

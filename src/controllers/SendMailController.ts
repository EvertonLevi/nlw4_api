import { Request, Response } from 'express';
import path from 'path';
import { getCustomRepository } from "typeorm";
import { AppError } from '../errors/AppError';
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { UserRepository } from "../repositories/UserRepository";
import SendMailService from "../services/SendMailService";

class SendMailController {
	async execute(request: Request, response: Response) {
		const { email, survey_id } = request.body;

		const usersRepository = await getCustomRepository(UserRepository);
		const sursveysRepository = await getCustomRepository(SurveysRepository);
		const surveysUserRepositoy = await getCustomRepository(SurveysUsersRepository);

		const user = await usersRepository.findOne({ email });

		if (!user) {
			throw new AppError("User does not exists");
		}

		const survey = await sursveysRepository.findOne({ id: survey_id });

		if (!survey) {
			throw new AppError("Survey does not exists");
		};

		const surveysUserAlreadyExists = await surveysUserRepositoy.findOne({
			where: [
				{ user_id: user.id },
				{ value: null }
			],
			relations: ['user', 'survey']
		});

		const npsPath = path.resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs');

		const variables = {
			name: user.name,
			title: survey.title,
			description: survey.description,
			id: "",
			link: process.env.URL_MAIL,
		};

		if (surveysUserAlreadyExists) {
			variables.id = surveysUserAlreadyExists.id;
			await SendMailService.execute(email, survey.title, variables, npsPath);
			return response.json(surveysUserAlreadyExists);
		}

		const surveyUser = surveysUserRepositoy.create({
			user_id: user.id,
			survey_id,
		});

		await surveysUserRepositoy.save(surveyUser);

		variables.id = surveyUser.id;

		await SendMailService.execute(email, survey.title, variables, npsPath)

		return response.json(surveyUser);
	}
}

export { SendMailController };
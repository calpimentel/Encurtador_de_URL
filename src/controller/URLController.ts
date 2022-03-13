// Controler que vai ser a classe do shorten url

import { Request, Response } from 'express'
import shortId from 'shortid'
import { config } from '../config/Constants'
import { URLModel } from '../database/model/URL'

// Class do shorten url
export class URLController {

	public async shorten(req: Request, response: Response): Promise<void> {
		// pegando a url do body da request
		const { originURL } = req.body
		// Localiza a url no banco
		const url = await URLModel.findOne({ originURL })
		// ver se a url existe
		if (url) {
			response.json(url)
			return
		}
		// gerar um hashunico para cada url
		const hash = shortId.generate()
		const shortURL = `${config.API_URL}/${hash}`
		// Caso a url não exista , salvar no banco
		const newURL = await URLModel.create({ hash, shortURL, originURL })

		response.json(newURL)
	}

	// Funcao para o redirect
	public async redirect(req: Request, response: Response): Promise<void> {
		// Pegar o hash da url
		const { hash } = req.params
		// Encontrar a url original pelo hash
		const url = await URLModel.findOne({ hash })
		// testa se a url exist
		if (url) {
			// usar o rsponse paraa redirecionar a url
			response.redirect(url.originURL)
			return
		}
		// Caso a us
		response.status(400).json({ error: 'URL not found' })
	}
}

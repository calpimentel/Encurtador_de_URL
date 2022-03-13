import { prop, Typegoose } from '@hasezoey/typegoose'

//  Modelo para banco do MONGODB
// instalar o @typegose/
// npm install @hasezoey/typegoose
export class URL extends Typegoose {
	//Propiedade required para hash
	@prop({ required: true })
	hash: string

	// originURL : string Required
	@prop({ required: true })
	originURL: string

	@prop({ required: true })
	shortURL: string
}

export const URLModel = new URL().getModelForClass(URL)

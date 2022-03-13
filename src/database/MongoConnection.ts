import mongoose from 'mongoose'
import { config } from '../config/Constants'
export class MongoConnection {
	// Conxão com o banco de dados
	public async connect(): Promise<void> {
		try {
			await mongoose.connect(config.MONGO_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
			console.log('Database connected')
		} catch (err) {
			console.error(err.message)
			process.exit(1)
		}
	}
}

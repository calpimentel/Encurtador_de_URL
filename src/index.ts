import express from 'express'
import { URLController } from './controller/URLController'
import { MongoConnection } from './database/MongoConnection'


// Criando a App API
const api = express()
// Adicionando o JSON
api.use(express.json())

// Database  connection
const database = new MongoConnection()
database.connect()


const urlController = new URLController()
// Post para a utl / shorten
api.post('/shorten', urlController.shorten)
// get para receber o hash para a url original
api.get('/:hash', urlController.redirect)

// Escutando na porta 5000
api.listen(5000, () => console.log('Express listening'))

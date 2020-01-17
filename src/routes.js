const { Router } = require('express')
const DevController = require('./controllers/DevController')
const SearchController = require('./controllers/SearchController')


//Query Params: request.query (filtros, ordenação) No postman aba params (?bla= blabla)
//Routes Params: request.params (identificar um recurso na alteração e remoção) "/users/:id"
//Body: request.body (dados para a criação ou alteração de registro)

const routes = Router()

routes.get('/devs', DevController.index)
routes.post('/devs', DevController.store)
routes.put('/devs', DevController.update)
routes.delete('/devs', DevController.destroy)

routes.get('/search', SearchController.index)

module.exports = routes;
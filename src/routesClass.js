'use strict';
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

module.exports = class Routes {

  static apllyRoutes(router){
    router.get('/devs', DevController.index);
    router.post('/devs', DevController.store);
    router.put('/devs', DevController.update);
    router.delete('/devs', DevController.destroy);

    router.get('/search', SearchController.index);

  }

};


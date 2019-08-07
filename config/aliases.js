const path = require('path');

const aliases = {
  // модули
  node_modules: 'node_modules',

  // конфиги
  app_config: 'config',

  // приложение
  app: 'src/app',

  // главные модули
  app_components: 'src/app/components',
  app_routes: 'src/app/routes',
  app_containers: 'src/app/containers',

  app_pages: 'src/app/components/pages',
  app_controls: 'src/app/components/controls',


  // сервисы и компоненты redux
  app_redux: 'src/app/redux',
  app_services: 'src/app/services',

  redux_store: 'src/app/redux/configureStore',
  redux_reducers: 'src/app/redux/rootReducer.js',

  // ресурсы приложения
  assets_img: 'src/assets/img',

  //хелперы
  helpers : 'src/app/helpers',
}

function returnWebpackAliases(als) {
  const newAliases = {};

  for(let key in als) {
    if ( als.hasOwnProperty(key) ) {
      const newValue = path.resolve(__dirname, `./../${als[key]}`);
      newAliases[key] = newValue;
    }
  }

  return newAliases;
}

module.exports = {
  webpack: returnWebpackAliases(aliases),
  jestAliases: aliases
}

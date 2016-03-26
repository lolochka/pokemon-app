var pokedexApp = angular.module('pokedexApp', ['ngRoute']);

pokedexApp.config(['$routeProvider', function ($routeProvider) {
    
    $routeProvider
    
    .when('/', {
        templateUrl: 'views/main.html',
        controller: 'mainController'
    })
    
    .when('/pokemon/:id', {
        templateUrl: 'views/pokemon-info.html',
        controller: 'pokemonController'
    })
    
}]);

//add loading interceptor
pokedexApp.config(['$httpProvider',function($httpProvider){
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.interceptors.push('HttpInterceptor');
}]);


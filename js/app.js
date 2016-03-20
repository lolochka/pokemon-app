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

pokedexApp.config(['$httpProvider',function($httpProvider){
    $httpProvider.interceptors.push('HttpInterceptor');
    console.log($httpProvider);
}]);


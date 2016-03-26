var pokedexApp = angular.module('pokedexApp', ['ngRoute']);

pokedexApp.config(['$routeProvider', function ($routeProvider) {
    
    $routeProvider
    
    .when('/pokemons', {
        templateUrl: 'views/main.html',
        controller: 'mainController'
    })
    
    .when('/pokemon/:id', {
        templateUrl: 'views/pokemon-info.html',
        controller: 'pokemonController'
    })
    
    .when('/404', {
        templateUrl: 'views/404.html'
    })
    
    .otherwise({
        redirectTo: '/pokemons'
    })
    
}]);

//add loading interceptor
pokedexApp.config(['$httpProvider',function($httpProvider){
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.interceptors.push('HttpInterceptor');
}]);


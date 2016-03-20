pokedexApp.factory('PokemonApi', ['$http', function ($http) {
    var api = {},
        url = 'http://pokeapi.co/api/v1/pokemon/';
    
    api.getAll = function (options) {
        return $http.get(url, {
            params: options,
            data: {req: 'all'}
        });
    };
    
    api.get = function (id) {
        return $http.get(url + id, {data: {req: 'single'}});
    };
    
    return api;
}]);

pokedexApp.factory('HttpInterceptor', ['$rootScope', '$q', '$timeout', function ($rootScope, $q, $timeout) {

    return {
        'request': function (config) {
            var data = config.data || {};
            if (data.req === 'single') {
                $rootScope.isLoadingSingle = true;
            } else if (data.req === 'all') {
                $rootScope.isLoadingList = true;
            }
            return config || $q.when(config);
        },
        'requestError': function (rejection) {
            
            return $q.reject(rejection);
        },
        'response': function (response) {

            var data = response.config.data || {};
            if (data.req === 'single') {
                $rootScope.isLoadingSingle = false;
            } else if (data.req === 'all') {
                $rootScope.isLoadingList = false;
            }
            return response || $q.when(response);
        },
        'responseError': function (rejection) {
            return $q.reject(rejection);
        }
    };
}]);
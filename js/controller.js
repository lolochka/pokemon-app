pokedexApp.controller('mainController', ['$scope', 'PokemonApi', function ($scope,PokemonApi) {
    
    $scope.limit = 12;
    $scope.offset = $scope.limit;
    
    PokemonApi.getAll({
        limit: $scope.limit
    }).success(function(data){
        $scope.total = data.meta.total_count;
        $scope.pokemons = data.objects;
    });
    
    $scope.loadMore = function() {
        PokemonApi.getAll({
            limit: $scope.limit,
            offset: $scope.offset
        }).success(function(data){
            var newPokemons = data.objects;
            $scope.pokemons = $scope.pokemons.concat(newPokemons);
            $scope.offset += $scope.limit;
        })
    };
    
    $scope.pop = false;
    
    $scope.popOn = function() {
        $scope.pop = true;
    };
    
    $scope.popOff = function() {
        $scope.pop = false;
    };
}]);

pokedexApp.controller('pokemonController', ['$scope', '$routeParams', 'PokemonApi', function ($scope, $routeParams, PokemonApi) {
    
    PokemonApi.get($routeParams.id).success(function(data){
        $scope.pokemon = data;
    });
    
}])
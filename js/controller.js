pokedexApp.controller('mainController', ['$scope', '$filter', 'PokemonApi', 'ColorSevice', function ($scope, $filter, PokemonApi, ColorSevice) {
    
    $scope.limit = 12;
    $scope.offset = $scope.limit;
    
    PokemonApi.getAll({
        limit: $scope.limit
    }).success(function (data) {
        $scope.total = data.meta.total_count;
        $scope.pokemons = data.objects;
    });
    
    $scope.loadMore = function () {
        PokemonApi.getAll({
            limit: $scope.limit,
            offset: $scope.offset
        }).success(function (data) {
            var newPokemons = data.objects;
            $scope.pokemons = $scope.pokemons.concat(newPokemons);
            $scope.offset += $scope.limit;
        });
    };
    
    PokemonApi.getTypes().success(function (data) {
        var types = data.objects;
        types.map(function(obj){
            obj.color = ColorSevice.getHsvGolden(0.5, 0.8).toRgbString();
        });
        $scope.types= types;
    });
    
    $scope.pop = false;
    
    $scope.popToggle = function () {
        $scope.pop = !$scope.pop;
    };
    
    $scope.typeFilter = function (data) {
        $scope.search = {
            types: {
                name: data
            }
        }
    };
    
    $scope.colorType = function(type) {
        var type = $filter('filter')($scope.types, {name: type});
        if (type) {
            return type[0].color;
        }
    }
    
}]);

pokedexApp.controller('pokemonController', ['$scope', '$routeParams', 'PokemonApi', function ($scope, $routeParams, PokemonApi) {
    
    PokemonApi.get($routeParams.id).success(function (data) {
        $scope.pokemon = data;
    });
    
}]);
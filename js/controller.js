pokedexApp.controller('mainController', ['$scope', '$filter', 'PokemonApi', 'ColorSevice', function ($scope, $filter, PokemonApi, ColorSevice) {
    
    $scope.pop = false;
    $scope.errorSrc = '/img/pokemon.png';
    $scope.limit = 12;
    $scope.offset = $scope.limit;
    $scope.selected = {};
    
    PokemonApi.getAll({
        limit: $scope.limit
    }).success(function (data) {
        $scope.total = data.meta.total_count;
        $scope.pokemons = data.objects;
        PokemonApi.getTypes().success(function (data) {
            var types = data.objects;
            types.map(function(obj){
                obj.color = ColorSevice.getHsvGolden(0.5, 0.8).toRgbString();
            });
            $scope.types= types;
        });
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
      
    $scope.popToggle = function () {
        $scope.pop = !$scope.pop;
    };
    
    $scope.showPokemon = function (item) {
        $scope.popToggle();
        $scope.selected.pokemon = item;
    }
    
    $scope.typeFilter = function (data) {
        $scope.search = {types: {name: data.name}};
        $scope.selected.type = data;
    };
    
    $scope.colorType = function(type) {
        var type = $filter('filter')($scope.types, {name: type});
        if (type) {
            return type[0].color;
        }
    };
    
    $scope.isActive = function(name,item) {
        return $scope.selected[name] === item;
    };
    
    $scope.checkType = function(item) {
        return $filter('filter')($scope.pokemons, {types: {name: item.name}}).length > 0;
    };
}]);

pokedexApp.controller('pokemonController', ['$scope', '$routeParams', 'PokemonApi', function ($scope, $routeParams, PokemonApi) {
    
    PokemonApi.get($routeParams.id).success(function (data) {
        $scope.pokemon = data;
    });
    
    $scope.errorSrc = '/img/pokemon.png';
    
}]);
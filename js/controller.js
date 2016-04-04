pokedexApp.controller('mainController', ['$scope', '$filter', 'PokemonApi', 'ColorSevice', function ($scope, $filter, PokemonApi, ColorSevice) {
    
    $scope.pop = false;
    $scope.errorSrc = 'img/logo.svg';
    $scope.selected = {};
    
    $scope.limit = 12;
    $scope.offset = $scope.limit;
    
    //get pokemons and their types
    PokemonApi.getTypes().success(function (data) {
        var types = data.objects;
        types.map(function(obj){
            obj.color = ColorSevice.getHsvGolden(0.5, 0.8).toRgbString();
        });
        $scope.types= types;
        PokemonApi.getAll({
            limit: $scope.limit
        }).success(function (data) {
            $scope.total = data.meta.total_count;
            $scope.pokemons = data.objects;
            //show only actual types
            $scope.checkType = function(item) {
                return $filter('filter')($scope.pokemons, {types: {name: item.name}}).length > 0;
            };
        });
    });
    
    //loading more pokemons
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
    
    //filtering pokemon by types
    $scope.typeFilter = function (data) {
        $scope.search = {types: {name: data.name}};
        $scope.selected.type = data;
    };
    
    
    //coloring types labels
    $scope.colorType = function(type) {
        var type = $filter('filter')($scope.types, {name: type});
        if (type) {
            return type[0].color;
        }
    };
    
    //show single pokemon
    $scope.showPokemon = function (item) {
        $scope.popUp();
        $scope.selected.pokemon = item;
    }
    
    //pop up for responsive view
    $scope.popUp = function () {
        $scope.pop = true;
    };
    
    $scope.popDown = function () {
        $scope.pop = false;
    };
    
    //check if thi pokemon selected
    $scope.isActive = function(name,item) {
        return $scope.selected[name] === item;
    };
}])
    
    .controller('pokemonController', ['$scope', '$routeParams', 'PokemonApi', '$location', function ($scope, $routeParams, PokemonApi, $location) {
    
    $scope.popUp(); 
        
    PokemonApi.get($routeParams.id).success(function (data) {
        $scope.pokemon = data;
    }).error(function(){
        $location.path("/404").replace();
    });
    
    $scope.errorSrc = 'img/logo.svg';
    
}]);
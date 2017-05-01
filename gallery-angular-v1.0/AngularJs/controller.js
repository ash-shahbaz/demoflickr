'use strict';

// the storeController contains one object:
// - store: contains the Images list

function storeController($scope, $routeParams, DataService) {

    // get store from service
    $scope.store = DataService.store;
    
    // use routing to pick the selected Images
    if ($routeParams.ImageID != null) {
        $scope.product = $scope.store.getProduct($routeParams.ImageID);
    }
}

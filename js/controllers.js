angular.module('app.controllers', [])
  
.controller('hangoutsCtrl', ['$scope', '$stateParams', 'Hangouts', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, Hangouts) {

    $scope.items = Hangouts.items;

}])
      
.controller('hangoutDetailsCtrl', ['$scope', '$stateParams', 'Hangouts', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, Hangouts) {
    
    $scope.item = Hangouts.items[Hangouts.items.$indexFor($stateParams.item)];

}])
   
.controller('makeAHangoutCtrl', ['$scope', '$stateParams', 'Hangouts', '$ionicModal', function ($scope, $stateParams, Hangouts, $ionicModal) {

    $scope.items = Hangouts.items;
    
    $scope.data = {
        'hangoutName': '',
        'hostName': '',
        'phoneNumber': '',
        'email': '',
        'location': '',
        'hangoutDate': '',
        'hangoutStartTime': '',
        'hangoutEndTime': '',
        'description': '',
        'maxGuests': 1
    }
    
    $scope.addItem = function(){
        Hangouts.addItem($scope.data.hangoutName, $scope.data.hostName, $scope.data.email, $scope.data.phoneNumber, $scope.data.location, $scope.data.hangoutDate, $scope.data.hangoutStartTime, $scope.data.hangoutEndTime, $scope.data.description, $scope.data.maxGuests);
    }
    
}])
 
angular.module('app.controllers', [])
  
.controller('hangoutsCtrl', ['$scope', '$stateParams', 'Hangouts', '$ionicModal', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, Hangouts, $ionicModal) {

    $scope.items = Hangouts.items;
    
    $scope.data = {
        'hangoutName': '',
        'hostName': '',
        'phoneNumber': '',
        'email': '',
        'location': '',
        'hangoutDate': '',
        'hangoutTime': '',
        'description': '',
        'maxGuests': 1
    }
    
    $scope.modal = $ionicModal.fromTemplate("<ion-modal-view>" +
    "<ion-header-bar class='bar-balanced'>" +
      "<h1 class='title'>Make a Hangout</h1>" +
      '<button class="button button-clear" ng-click="closeModal()">Close</button>' +
    "</ion-header-bar>" +
    "<ion-content class='padding'>" +
      "Name of your Hangout?<label class='item item-input'><input type='text' placeholder='e.g., Board Game Night' ng-model='data.hangoutName' /></label>" + "<br>" + 
      "Your name?<label class='item item-input'><input type='text' placeholder='e.g., Kris B.' ng-model='data.hostName' /></label>" + "<br>" +
      "Your email?<label class='item item-input'><input type='text' placeholder='e.g., john@gmail.com' ng-model='data.email' /></label>" + "<br>" +
      "Your number? (so guests can contact you) <label class='item item-input'><input type='text' placeholder='e.g., 408-323-1222' ng-model='data.phoneNumber' /></label>" + "<br>" +
      "Location of your Hangout?<label class='item item-input'><input type='text' placeholder='e.g., Game Castle' ng-model='data.location' /></label>" + "<br>" + 
      "Hangout date?<label class='item item-input'><input type='text' placeholder='e.g., Tuesday 11/28/16' ng-model='data.hangoutDate' /></label>" + "<br>" + 
      "Hangout time?<label class='item item-input'><input type='text' placeholder='e.g., 6pm - 8pm' ng-model='data.hangoutTime' /></label>" + "<br>" + 
      "Brief description of hangout<label class='item item-input'><input type='text' placeholder='e.g., We need one more player for Civilization' ng-model='data.description' /></label>" + "<br>" + 
    //   "Max # of guests?<label class='item item-input'><input type='text' placeholder='e.g., 1' ng-model='data.maxGuests' /></label>" + "<br>" +
      "<label class='item item-input item-select'><div class='input-label'>Max Guests</div><select name='guests' ng-model='data.maxGuests'><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option><option value='5'>5</option></select></label>" + "<br>" +
      "<button ng-click='addItem()' class='button button-balanced button-block'>Make</button>" +
    "</ion-content>" +
  "</ion-modal-view>", {
        scope: $scope,
        animation: 'slide-in-up'
    })
    
    $scope.showModal = function(){
        $scope.modal.show();
    }
    
    $scope.closeModal = function(){
        $scope.data.hangoutName = '';
        $scope.data.hostName = '';
        $scope.data.email = '';
        $scope.data.phoneNumber = '';
        $scope.data.location = '';
        $scope.data.hangoutDate = '';
        $scope.data.hangoutTime = '';
        $scope.data.description = '';
        $scope.data.maxGuests = '';
        $scope.modal.hide();
    }
    
    $scope.addItem = function(){
        Hangouts.addItem($scope.data.hangoutName, $scope.data.hostName, $scope.data.email, $scope.data.phoneNumber, $scope.data.location, $scope.data.hangoutDate, $scope.data.hangoutTime, $scope.data.description, $scope.data.maxGuests);
        $scope.closeModal();   
    }


}])
      
.controller('hangoutDetailsCtrl', ['$scope', '$stateParams', 'Hangouts', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, Hangouts) {

    // $scope.itemid = $stateParams.item;
    
    $scope.item = Hangouts.items[Hangouts.items.$indexFor($stateParams.item)];
    
    // $scope.toggleFinished = function(){
    //     if ($scope.item.finished){
    //         Hangouts.setFinished($scope.item, false);
    //     }else{
    //         Hangouts.setFinished($scope.item, true);
    //     }
    // }

}])
 
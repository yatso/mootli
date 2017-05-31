angular.module('app.controllers', [])
.controller('hangoutsCtrl', ['$scope', '$stateParams', 'Hangouts', 'fbloginService', '$ionicPopup', '$state', 'mobileCheckService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName

function ($scope, $stateParams, Hangouts, fbloginService, $ionicPopup, $state, mobileCheckService) {
 console.log('hangoutsCtrl:', $scope);
 $scope.items = Hangouts.items;
 $scope.fbUserData = fbloginService.fbUserData;
 $scope.mobileCheckService = mobileCheckService.check;
 $scope.checkLogin = function (userGoalMsg) {
  console.log('checkLogin user:', $scope.fbUserData.user);
  if ($scope.fbUserData.user) {
   return true;
  }
  $ionicPopup.show({
   template: '<button id="menu-button3" ng-click="fbUserData.signIn()" class="button button-positive  button-block" data-componentid="button3">Facebook Login</button>',
   title: 'Please log in before ' + userGoalMsg,
   subTitle: '',
   scope: $scope,
   buttons: [{text: 'Cancel'}]
  }).then(function () {
   console.log('User clicked cancel on Login Popup');
  });
 };
 $scope.joinHangout = function (item) {
   if (!this.checkLogin('joining a hangout')) {
    return false;
   }
  // Note: Even if the join fails (due to network connection, etc.), this will still bring the user to the detail page
  // If that's not desired, use the returned Promise from join() to change state only upon resolve
  Hangouts.join(item);
  $state.go('hangoutsDetails', {
   item: item
  });
 };
 $scope.makeHangout = function () {
  if (!this.checkLogin('making a hangout')) {
   return false;
  }
  $state.go('makeAHangout');
 };
 $scope.getGuestCount = Hangouts.getGuestCount;
 $scope.isGuestOfHangout = Hangouts.isGuestOfHangout;
 $scope.timeNow = new Date();
}])

.controller('mootliFAQCtrl', ['$scope', '$stateParams', 'Hangouts', 'fbloginService', '$ionicPopup', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName

function ($scope, $stateParams, Hangouts, fbloginService, $ionicPopup, $state) {
 $scope.items = Hangouts.items;
 $scope.fbUserData = fbloginService.fbUserData;
 $scope.routeBasedOnUserStatus = function (userGoal, userGoalMsg, itemId) {
  if ($scope.fbUserData.user && userGoal == 'make') {
   // route them to the make page
   $state.go('makeAHangout');
  } else if ($scope.fbUserData.user && userGoal == 'join') {
   // route them to the hangoutDetails page
   $state.go('hangoutsDetails', {item: itemId});
  } else {
   $ionicPopup.show({
    template: '<button id="menu-button3" ng-click="fbUserData.signIn()" class="button button-positive  button-block" data-componentid="button3">Facebook Login</button>',
    title: 'Please log in before ' + userGoalMsg,
    subTitle: '',
    scope: $scope,
    buttons: [{text: 'Cancel'}]
   }).then(function () {
    console.log('User clicked cancel on ' + userGoal + ' Login Popup');
   });
  }
 };
}])

.controller('hangoutsDetailsCtrl', ['$scope', '$stateParams', 'Hangouts', 'fbloginService', '$ionicPopup', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, Hangouts, fbloginService, $ionicPopup, $state) {
 // $indexFor takes the itemId(passed from $stateParams from the hangouts page) and finds the firebase array position so that we can get the corresponding item object from firebase.
 console.debug('hangoutsDetailsCtrl ($scope, $stateParams, Hangouts, fbloginService, $state): ', this, arguments);
 $scope.fbUserData = fbloginService.fbUserData;
 $scope.checkLogin = function (userGoalMsg) {
  console.log('checkLogin user:', $scope.fbUserData.user);
  if ($scope.fbUserData.user) {
   return true;
  }
  $ionicPopup.show({
   template: '<button id="menu-button3" ng-click="fbUserData.signIn()" class="button button-positive  button-block" data-componentid="button3">Facebook Login</button>',
   title: 'Please log in before ' + userGoalMsg,
   subTitle: '',
   scope: $scope,
   buttons: [{text: 'Cancel'}]
  }).then(function () {
   console.log('User clicked cancel on Login Popup');
  });
 };
 $scope.joinHangout = function (item) {
  if (!this.checkLogin('joining a hangout')) {
   return false
  };
  Hangouts.join(item);
 };
 $scope.leaveHangout = function () {
  Hangouts.leave($scope.item);
 };
 $scope.deleteHangout = function () {
  if (!confirm('Are you sure you want to delete the hangout?\nIt will be removed immediately.')) {
   return false;
  }
  Hangouts.delete($scope.item).then(function () {
   $state.go('hangouts');
  }).catch(function () {
   alert('There was an error deleting your hangout');
  });
 };
 $scope.getGuestCount = Hangouts.getGuestCount;
 $scope.isGuestOfHangout = Hangouts.isGuestOfHangout;
 $scope.timeNow = new Date();
 Hangouts.items.$loaded(function (items) {
  var item = items.$getRecord($stateParams.hangoutId);
  if (!item) {
   console.warn('No hangout with id: ', $stateParams.hangoutId);
  }
  $scope.item = item;
 });
}])
.controller('menuCtrl', ['$scope', '$stateParams', 'fbloginService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName

function ($scope, $stateParams, fbloginService) {
 fbloginService.fbUserData.onAuth();
 $scope.fbUserData = fbloginService.fbUserData;
}])

.controller('makeAHangoutCtrl', ['$scope', '$stateParams', 'Hangouts', 'fbloginService', '$state', function ($scope, $stateParams, Hangouts, fbloginService, $state) {
 // everything is wrapped in onAuthStateChanged so that user data is generated only after the observer detects that they are logged in. Solves alot of user === 'null' issues.
 firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
   $scope.user = user;
   var defaultStart = new Date();
   defaultStart.setSeconds(0);
   defaultStart.setMilliseconds(0);
   $scope.data = {
    'hostFbUid': user.providerData[0].uid,
    'hostUid': user.uid,
    'hostPhotoURL': user.photoURL,
    'hostName': '',
    'email': '',
    'hangoutName': '',
    'phoneNumber': '',
    'location': '',
    'hangoutStartTime': defaultStart,
    'hangoutDurationMinutes': '60',
    'description': '',
    'maxGuests': 2
   }
   $scope.addItem = function () {
    var hangoutData = angular.copy($scope.data);
    hangoutData.hangoutDurationMinutes = parseInt(hangoutData.hangoutDurationMinutes);
    hangoutData.hangoutEndTime = new Date(hangoutData.hangoutStartTime.valueOf() + $scope.data.hangoutDurationMinutes * 60 * 1000);
    Hangouts.addItem(hangoutData).then(function () {
     $state.go('hangouts');
    }, function (err) {
     console.warn('Unable to make hangout: ', err);
     if (err && err.code == 'PERMISSION_DENIED') {
      alert('Please fill out everything properly and try again.');
     } else {
      alert('Unable to make your hangout. Please try again later.');
     }
    });
   }
   console.log('scope:', $scope.data);
  } else {
   // No user is signed in.
  }
 });
}])
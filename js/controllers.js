angular.module('app.controllers', [])
  
.controller('hangoutsCtrl', ['$scope', '$stateParams', 'Hangouts', 'fbloginService', '$ionicPopup', '$state', 'mobileCheckService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName

function ($scope, $stateParams, Hangouts, fbloginService, $ionicPopup, $state, mobileCheckService) {
		console.log('hangoutsCtrl:', $scope);
    $scope.items = Hangouts.items;
    $scope.fbUserData = fbloginService.fbUserData;
    $scope.mobileCheckService = mobileCheckService.check;
	
	$scope.checkLogin = function(userGoalMsg) {
			console.log('checkLogin user:', $scope.fbUserData.user);
			if ($scope.fbUserData.user) {
					return true;
			}
			$ionicPopup.show({
				template: '<button id="menu-button3" ng-click="fbUserData.signIn()" class="button button-positive  button-block" data-componentid="button3">Facebook Login</button>',
				title: 'Please log in before ' + userGoalMsg,
				subTitle: '',
				scope: $scope,
				buttons: [
					{ text: 'Cancel' }
				]
			}).then(function() {
				console.log('User clicked cancel on Login Popup');
			});
	};
	$scope.viewHangoutDetails = function(item) {
		// No user login is checked. Logged out user can still see details page.
		$state.go('hangoutsDetails', { item: item });
	};
	$scope.joinHangout = function(item) {
		if (!this.checkLogin('joining a hangout')) {
				return false;
		}
		// Note: Even if the join fails (due to network connection, etc.), this will still bring the user to the detail page
		// If that's not desired, use the returned Promise from join() to change state only upon resolve
		Hangouts.join(item);
		$state.go('hangoutsDetails', { item: item });
	};
	$scope.makeHangout = function() {
		if (!this.checkLogin('making a hangout')) {
				return false;
		}
		$state.go('makeAHangout');
	};
	$scope.getGuestCount = Hangouts.getGuestCount;
    
}])
   
.controller('mootliFAQCtrl', ['$scope', '$stateParams', 'Hangouts', 'fbloginService', '$ionicPopup', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName

function ($scope, $stateParams, Hangouts, fbloginService, $ionicPopup, $state) {

    $scope.items = Hangouts.items;
    $scope.fbUserData = fbloginService.fbUserData;
		
	$scope.routeBasedOnUserStatus = function(userGoal, userGoalMsg, itemId) {
		if ($scope.fbUserData.user && userGoal == 'make') {
			// route them to the make page
			$state.go('makeAHangout');	
		} else if ($scope.fbUserData.user && userGoal == 'join') {
			// route them to the hangoutDetails page
			$state.go('hangoutsDetails', { item: itemId });	
		} else {
			$ionicPopup.show({
				template: '<button id="menu-button3" ng-click="fbUserData.signIn()" class="button button-positive  button-block" data-componentid="button3">Facebook Login</button>',
				title: 'Please log in before ' + userGoalMsg,
				subTitle: '',
				scope: $scope,
				buttons: [
					{ text: 'Cancel' }
				]
			}).then(function() {
				console.log('User clicked cancel on ' + userGoal + ' Login Popup');
			});
		}		
	};
    
}])
   
.controller('hangoutsDetailsCtrl', ['$scope', '$stateParams', 'Hangouts', 'fbloginService', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, Hangouts, fbloginService, $state) {
    
    // $indexFor takes the itemId(passed from $stateParams from the hangouts page) and finds the firebase array position so that we can get the corresponding item object from firebase.
    $scope.user = fbloginService.fbUserData.user;
    $scope.item = $stateParams.item;
		$scope.joinHangout = Hangouts.join.bind(Hangouts);
		$scope.leaveHangout = function() {
				Hangouts.leave($scope.item);
		};
		$scope.deleteHangout = function() {
				if (!confirm('Are you sure you want to delete the hangout?\nIt will be removed immediately.')) {
						return false;
				}
				Hangouts.delete($scope.item).then(function() {
						$state.go('hangouts');
				}).catch(function() {
						alert('There was an error deleting your hangout');
				});
		};
		$scope.getGuestCount = Hangouts.getGuestCount;
}])
      
.controller('menuCtrl', ['$scope', '$stateParams', 'fbloginService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName

function ($scope, $stateParams, fbloginService) {
	console.log("$scope: ", $scope);	
	fbloginService.fbUserData.onAuth();
	$scope.fbUserData = fbloginService.fbUserData;
}])
   
.controller('makeAHangoutCtrl', ['$scope', '$stateParams', 'Hangouts', 'fbloginService', function ($scope, $stateParams, Hangouts, fbloginService) {
    
    // everything is wrapped in onAuthStateChanged so that user data is generated only after the observer detects that they are logged in. Solves alot of user === 'null' issues.
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			$scope.currentUserUid = user.uid;
			$scope.currentUserDisplayName = user.displayName;
			$scope.currentUserEmail = user.email;
			$scope.currentUserPhotoURL = user.photoURL;
			
			var defaultStart = new Date();
			defaultStart.setSeconds(0);
			defaultStart.setMilliseconds(0);
			var defaultEnd = new Date(defaultStart.valueOf() + 60*60*1000);
			
			$scope.data = {
				'hostUid': $scope.currentUserUid,
				'hostPhotoURL': $scope.currentUserPhotoURL,
				'hostName': '',
				'email': '',
				'hangoutName': '',
				'phoneNumber': '',
				'location': '',
				'hangoutStartTime': defaultStart,
				'hangoutEndTime': defaultEnd,
				'description': '',
				'maxGuests': 2
            }
			$scope.addItem = function(){
				Hangouts.addItem($scope.data);
			}
			console.log('scope:', $scope.data);
		} else {
			// No user is signed in.
		}
	});  
}])
 
angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('hangouts', {
    url: '/hangouts',
    templateUrl: 'templates/hangouts.html',
    controller: 'hangoutsCtrl'
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('hangoutDetails', {
    url: '/details',
	params: {
		item: ""		
},
    templateUrl: 'templates/hangoutDetails.html',
    controller: 'hangoutDetailsCtrl'
  })

  .state('makeAHangout', {
    url: '/make',
    templateUrl: 'templates/makeAHangout.html',
    controller: 'makeAHangoutCtrl'
  })

$urlRouterProvider.otherwise('/hangouts')

  

});
angular.module('app.routes', [])
.config(
  function ($stateProvider, $urlRouterProvider) {
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider.state('hangouts', {
      url: '/hangouts',
      templateUrl: 'templates/hangouts.html',
      controller: 'hangoutsCtrl'
    }).state('mootliFAQ', {
      url: '/faq',
      templateUrl: 'templates/mootliFAQ.html',
      controller: 'mootliFAQCtrl'
    }).state('hangoutsDetails', {
      url: '/details/:hangoutId',
      params: {item: ""},
      templateUrl: 'templates/hangoutsDetails.html',
      controller: 'hangoutsDetailsCtrl'
    }).state('tabsController', {
      url: '/tabsController',
      templateUrl: 'templates/tabsController.html',
      abstract: true
    }).state('makeAHangout', {
      url: '/make',
      templateUrl: 'templates/makeAHangout.html',
      controller: 'makeAHangoutCtrl'
    });
    $urlRouterProvider.otherwise('/hangouts');
  });
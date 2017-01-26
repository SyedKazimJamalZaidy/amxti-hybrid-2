var app = angular.module('demo', ['ionic', 'ngMessages'])
    
    .run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
    .config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider', function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
   
       $ionicConfigProvider.backButton.text('').previousTitleText(false);
       $ionicConfigProvider.views.transition('none');

        $stateProvider
        // Pre-Login Pages
            //First Page
           /* .state('first',{
                url: '/first',
                templateUrl: 'templates/first.html',
                controller: 'FirstController'
            })*/
            //Login Page
            .state('login',{
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'LoginController'
            })
            //Registration Page
            .state('registration',{
                url: '/registration',
                templateUrl: 'templates/registration.html'
            })
        //Page after login
            //Abstract page
            .state('menu', {
                url : '/menu',
                templateUrl : 'templates/menu-abstract.html',
                abstract : true,
                controller : 'MenuController'
            })
			//First Start page
			.state('menu.homepage', {
                url: '/homepage',
                views: {
                    'view-content': {
                        templateUrl: 'templates/homepage.html',
                        controller: 'HomePageController'
                    }
                }
            })
            //Roundtrip Page/Tab
            .state('menu.round', {
                url: '/round',
                views: {
                    'view-content': {
                        templateUrl: 'templates/round.html',
                        controller : 'RoundController'
                    }
                }
            })
           
            //Single Flight Tab
            .state('menu.single', {
                url: '/single',
                views: {
                    'view-content': {
                        templateUrl: 'templates/single.html',
                        controller: 'SingleController'
                    }
                }
            })
            //Multi City Tab
            .state('menu.multicity', {
                url: '/multicity',
                views: {
                    'view-content': {
                        templateUrl: 'templates/multicity.html',
                        controller: "MutliCityController"
                    }
                }
            })
            //Flight details for multi city
            .state('menu.flightdetailsmulti0',{
                url: '/flightdetailsmulti0',
                views: {
                    'view-content': {
                    templateUrl: 'templates/flightdetailsmulti0.html',
                    controller: 'FlightDetailMultiController0'
                    }
                }
            })
            //Flight details for multi city
            .state('menu.flightdetailsmulti1',{
                url: '/flightdetailsmulti1',
                views: {
                    'view-content': {
                    templateUrl: 'templates/flightdetailsmulti1.html',
                    controller: 'FlightDetailMultiController1'
                    }
                }
            })
            //Flight details for multi city
            .state('menu.flightdetailsmulti2',{
                url: '/flightdetailsmulti2',
                views: {
                    'view-content': {
                    templateUrl: 'templates/flightdetailsmulti2.html',
                    controller: 'FlightDetailMultiController2'
                    }
                }
            })
             //Flight Details after selection of tour
            .state('menu.flightdetails',{
                url: '/flightdetails',
                views: {
                    'view-content': {
                        templateUrl: 'templates/flightdetails.html',
                        controller: 'FlightDetailController'
                    }
                }
            })
            //Flight confirmation page
            .state('menu.flightconfirmation',{
                url: '/flightconfirmation',
                views: {
                    'view-content' : {
                        templateUrl: 'templates/flightconfirmation.html',
                        controller: 'FlightConfirmationController'
                    }
                }
            })
            //Flight confirmation page
            .state('menu.flightconfirmationMulti',{
                url: '/flightconfirmationMulti',
                views: {
                    'view-content' : {
                        templateUrl: 'templates/flightconfirmationMulti.html',
                        controller: 'FlightConfirmationMultiController'
                    }
                }
            })
            //User Details Page
            .state('menu.userdetails',{
                url: '/userdetails',
                views: {
                    'view-content' : {
                        templateUrl: 'templates/userdetails.html',
                        controller: 'UserDetailsController'
                    }
                }
            })
            //Payment Method Page
            .state('menu.paymentmethod',{
                url: '/paymentmethod',
                views: {
                    'view-content' : {
                        templateUrl: 'templates/paymentmethod.html',
                        controller: 'PaymentMethodController'
                    }
                }
            })
            .state('menu.drink', {
                url: '/drink',
                views: {
                    'view-content': {
                        templateUrl: 'templates/drink.html',
                        controller : 'DrinkController'
                    }
                }
            })
            .state('menu.chat-single', {
                url: '/chat-single',
                views: {
                    'view-content': {
                        templateUrl: 'templates/chat-single.html',
                        controller : 'ChatSingleController'
                  }
                }
            })
            .state('menu.tab-1', {
                url: '/tab-1',
                views: {
                    'view-content': {
                        templateUrl: 'templates/tab-1.html',
                        controller : 'TabOneController'
                    }
                }
            })
            .state('menu.tab-2', {
                url: '/tab-2',
                views: {
                    'view-content': {
                        templateUrl: 'templates/tab-2.html',
                        controller : 'TabTwoController'
                    }
                }
            })
            .state('menu.tab-3', {
                url: '/tab-3',
                views: {
                    'view-content': {
                        templateUrl: 'templates/tab-3.html',
                        controller : 'TabThreeController'
                    }
                }
            })

        $urlRouterProvider.otherwise('/login');
    }])
    


    //Date formatting function
   .filter('time', function() {

    var conversions = {
      'ss': angular.identity,
      'mm': function(value) { return value * 60; },
      'hh': function(value) { return value * 3600; }
    };

    var padding = function(value, length) {
      var zeroes = length - ('' + (value)).length,
          pad = '';
      while(zeroes-- > 0) pad += '0';
      return pad + value;
    };

    return function(value, unit, format, isPadded) {
      var totalSeconds = conversions[unit || 'ss'](value),
          hh = Math.floor(totalSeconds / 3600),
          mm = Math.floor((totalSeconds % 3600) / 60),
          ss = totalSeconds % 60;

      format = format || 'hh:mm:ss';
      isPadded = angular.isDefined(isPadded)? isPadded: true;
      hh = isPadded? padding(hh, 2): hh;
      mm = isPadded? padding(mm, 2): mm;
      ss = isPadded? padding(ss, 2): ss;

      return format.replace(/hh/, hh).replace(/mm/, mm).replace(/ss/, ss);
    }
     });
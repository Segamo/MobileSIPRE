angular.module('starter.controllers', [])

angular.module('myApp', ['auth0', 'angular-storage', 'angular-jwt'])
.run(function($rootScope, auth, store, jwtHelper, $location) {
  // This events gets triggered on refresh or URL change
  $rootScope.$on('$locationChangeStart', function() {
    if (!auth.isAuthenticated) {
      var token = store.get('token');
      if (token) {
        if (!jwtHelper.isTokenExpired(token)) {
          auth.authenticate(store.get('profile'), token);
        } else {
          auth.refreshIdToken(refreshToken).then(function(idToken) {
            store.set('token', idToken);
            auth.authenticate(store.get('profile'), idToken);
            return idToken;
          });
        }
      }
    }
  });
});

app.controller('LoginCtrl', function($scope, auth, $state, store) {
  auth.signin({
    authParams: {
      // This asks for the refresh token
      // So that the user never has to log in again
      scope: 'openid offline_access',
      // This is the device name
      device: 'Mobile device'
    },
    // Make the widget non closeable
    standalone: true
  }, function(profile, token, accessToken, state, refreshToken) {
          // Login was successful
    // We need to save the information from the login
    store.set('profile', profile);
    store.set('token', token);
    store.set('refreshToken', refreshToken);
    $state.go('tab.dash');
  }, function(error) {
    // Oops something went wrong during login:
    console.log("There was an error logging in", error);
  });
})


.controller('DashCtrl', function($scope, $http) {

  $scope.callApi = function() {
    // Just call the API as you'd do using $http
    $http({
      url: 'http://auth0-nodejsapi-sample.herokuapp.com/secured/ping',
      method: 'GET'
    }).then(function() {
      alert("We got the secured data successfully");
    }, function() {
      alert("Please download the API seed so that you can call it.");
    });
  }
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope, auth, $state, store) {

  $scope.logout = function() {
    auth.signout();
    store.remove('token');
    store.remove('profile');
    store.remove('refreshToken');
    $state.go('login');
  }
});

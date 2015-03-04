var url = "http://localhost:8888/mobileSIPRE/servicios/";

angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {
    $scope.data = {};
 
    $scope.login = function() {
        
        var name, email;
        
        email        = $scope.data.email;
        password     = $scope.data.password;
      
        console.log(email +  " " + password);

        
        var urlService 	= url + "ServicioUsuario.php";
        var params      = "nombreServicio=login" + "&email=" + email + "&password=" + password;
        
      console.log(urlService);
      console.log(params);
      //callService(urlService, params, 'procesoLogin');
      
      if ($scope.data.email && $scope.data.password){
        $.ajax({
        dataType:       'jsonp',
        url:            urlService,
        data:           params,
        type:           "GET",
        crossDomain:    true,
        jsonpCallback:  "procesoLogin",
        success: function (data) {
            //$state.go('tab.dash');
	    var x = data[0];
	    if (x.email == email && x.password == password) {
		$state.go('tab.dash');
	    }
        }});
      }
        
        
      /*
        LoginService.loginUser($scope.data.email, $scope.data.password).success(function(data) {
            $state.go('tab.dash');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });*/
    }
})

.controller('SignupCtrl', function($scope) {
    $scope.data = {};
    
    $scope.signup = function() {
    
    var name, lastname, email, code, id, career, password, passwordc;    
        
    name        = $scope.data.name;
    lastname    = $scope.data.lastName;
    email       = $scope.data.email;
    code        = $scope.data.code;
    id          = $scope.data.id;
    career      = $scope.data.career;
    password    = $scope.data.password;
    passwordc   = $scope.data.passwordc;
    
    var urlService 	= url + "ServicioUsuario.php";
    var params	= "nombreServicio=registro" + "&name=" + name + "&lastname=" + lastname + "&email=" + email + "&code=" + code + "&id=" + id + "&career=" + career  + "&password=" + password + "&passwordc=" + passwordc;
        
    callService(urlService, params, 'exito');
    }
})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});

function callService(urlService, params, cb){
    $.ajax({
        dataType:       'jsonp',
        url:            urlService,
        data:           params,
        type:           "GET",
        crossDomain:    true,
        jsonpCallback:  cb,
        error: function(xhr, status, error) {
            console.log(xhr);
            console.log(status);
            console.log(error);
        }});
}

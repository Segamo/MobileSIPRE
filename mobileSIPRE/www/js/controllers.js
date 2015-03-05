var url = "http://ec2-52-0-162-106.compute-1.amazonaws.com/services/servicios/";

angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {
    $scope.data = {};
 
    $scope.login = function() {
        
        var name, email;
        
        email        = $scope.data.email;
        password     = $scope.data.password;
        
        var urlService 	= url + "ServicioUsuario.php";
        var params      = "nombreServicio=login" 
        + "&email=" + email 
        + "&password=" + password;
      
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

.controller('SignupCtrl', function($scope, $ionicPopup, $state) {
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
      
      var pattern=/^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
      
      if (pattern.test(email)) {
        var urlService 	= url + "ServicioUsuario.php";
        var params	= "nombreServicio=registro" 
        + "&name=" + name 
        + "&lastname=" + lastname 
        + "&email=" + email 
        + "&code=" + code 
        + "&id=" + id 
        + "&career=" + career  
        + "&password=" + password 
        + "&passwordc=" + passwordc;
        pattern = /^([a-zA-Z0-9_.-])/;
        if (pattern.test(name) && 
            pattern.test(lastname) && 
            pattern.test(career) &&
            pattern.test(password)) {
            pattern = /^([0-9_.-])/;
            if( pattern.test(code) && pattern.test(id)){
              if (password == passwordc) {
                callService(urlService, params, 'exito');
                $ionicPopup.alert({
                    title: 'Successful!',
                    template: 'Sign up successful!'
                });
                $state.go('login');
              }else{
                $ionicPopup.alert({
                    title: 'Failed!',
                    template: 'Sign up failed, please check your password!'
                }); 
              }
            }else{
                $ionicPopup.alert({
                    title: 'Failed!',
                    template: 'Sign up failed, please check your Code or ID!'
                });  
            }
        } else {
          $ionicPopup.alert({
                title: 'Failed!',
                template: 'Sign up failed, please check your basic information!'
          });
        }
      } else {
        $ionicPopup.alert({
                title: 'Failed!',
                template: 'Sign up failed, please check your email!'
        });
      }
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
        success: function (data) {
          
        }
    });
}

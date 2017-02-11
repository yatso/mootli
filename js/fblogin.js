angular.module('fbloginService', [])

.service('fbloginService', ['$rootScope', '$firebaseArray', function($rootScope, $firebaseArray) {
  
  var fbUserData = {
    user: null,
    onAuth: function() {
        var self = this;
        
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            var userObj = {
              firebaseUid: user.uid,
              fbUserData: {
                displayName: user.providerData[0].displayName,
                email: user.providerData[0].email,
                photoURL: user.providerData[0].photoURL,
                providerId: user.providerData[0].providerId,
                uid: user.providerData[0].uid
              }
            };
            self.writeUserData(userObj);
          }  
          self.user = user;
          console.log("onAuth, User: ", self.user);
          $rootScope.$apply();
                });
    },
    writeUserData: function(userObj) {
      firebase.database().ref('users/' + userObj.firebaseUid).set(userObj);
    },
    signIn: function() {
      // Shows in the console that the signIn function ran.
      console.log("signIn function called");
        
        var provider = new firebase.auth.FacebookAuthProvider();
        
        firebase.auth().signInWithRedirect(provider);
        
        firebase.auth().getRedirectResult().then(function(result) {
          if (result.credential) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // ...
          }
          // The signed-in user info.
          var user = result.user;
        
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
          });
    },
    signOut: function() {
      // shows in the console that signout function ran
      console.log("signOut function called");
    
      // Binds self to fbUserData object's 'this'
      var self = this;
      
            firebase.auth().signOut().then(function() {
      
      // onAuth function called so the ng-show's in the sidemenu works properly after sign out.
      self.onAuth();
      
      // Sign-out successful.
            console.log("signOut sucessful");                   
          
            }, function(error) {
              // An error happened.
              console.log("an error happened", error);
            });
    },
    deleteAccount: function() {
      console.log("deleteAccount function called");
      
      firebase.auth().currentUser.delete().catch(function(error) {
        if (error.code == 'auth/requires-recent-login') {
          // The user's credential is too old. She needs to sign in again.
          firebase.auth().signOut().then(function() {
            // The timeout allows the message to be displayed after the UI has
            // changed to the signed out state.
            setTimeout(function() {
              console.log('Please sign in again to delete your account.');
              alert('Please sign in again to delete your account.');
            }, 1);
          });
        }
      });
      
    }
  }
  return {fbUserData: fbUserData};
}]);





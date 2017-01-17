angular.module('firebaseConfig', ['firebase'])

.run(function(){

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDHpDv8RDvgU5qp41z3jM7PlDogyLwWywI",
    authDomain: "mootli-c5f77.firebaseapp.com",
    databaseURL: "https://mootli-c5f77.firebaseio.com",
    storageBucket: "mootli-c5f77.appspot.com",
    messagingSenderId: "300022475674"
  };
  firebase.initializeApp(config);

})


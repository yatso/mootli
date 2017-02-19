angular.module('firebaseConfig', ['firebase'])

.run(function(){
	
	// Initialize Firebase

  // Actual Database for Mootli
  var config = {
    apiKey: "AIzaSyDHpDv8RDvgU5qp41z3jM7PlDogyLwWywI",
    authDomain: "mootli-c5f77.firebaseapp.com",
    databaseURL: "https://mootli-c5f77.firebaseio.com",
    storageBucket: "mootli-c5f77.appspot.com",
    messagingSenderId: "300022475674"
  };
  firebase.initializeApp(config);

//// Test Database for Mootli
//	var config = {
//    apiKey: "AIzaSyC1vR9o_LXlCuLw3IJer0sRx4ndM3IBztA",
//    authDomain: "testdatabase-59382.firebaseapp.com",
//    databaseURL: "https://testdatabase-59382.firebaseio.com",
//    storageBucket: "testdatabase-59382.appspot.com",
//    messagingSenderId: "446711854074"
//  };
//  firebase.initializeApp(config);
	
})


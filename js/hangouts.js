/* !!! IMPORTANT: Rename "mymodule" below and add your module to Angular Modules above. */

angular.module('hangouts', ['firebase'])

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


.service('Hangouts', ['$firebaseArray', function($firebaseArray){
    
    var ref = firebase.database().ref().child('hangouts');
    var items = $firebaseArray(ref);
    
    var hangouts = {
        'items': items,
        addItem: function(hangoutName, hostName, phoneNumber, location, hangoutTime, description, maxGuests){
            items.$add({
                'hangoutName': hangoutName,
                'hostName': hostName,
                'phoneNumber': phoneNumber,
                'location': location,
                'hangoutTime': hangoutTime,
                'description': description,
                'maxGuests': maxGuests
            });
        },
        setFinished: function(item, newV){
            item.finished = newV;
            items.$save(item);
        }
    }
    
    return hangouts;

}]);

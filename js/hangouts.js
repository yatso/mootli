angular.module('hangouts', ['firebase'])

.service('Hangouts', ['$firebaseArray', function($firebaseArray){
    
    var ref = firebase.database().ref().child('hangouts');
    var items = $firebaseArray(ref);

    var hangouts = {
        'items': items,
        addItem: function(hostUid, hostPhotoURL, hangoutName, hostName, email, phoneNumber, location, hangoutDate, hangoutStartTime, hangoutEndTime, description, maxGuests){
            items.$add({
                'hostUid': hostUid,
                'hostPhotoURL': hostPhotoURL,
                'hangoutName': hangoutName,
                'hostName': hostName,
                'email': email,
                'phoneNumber': phoneNumber,
                'location': location,
                'hangoutDate': hangoutDate.getTime(),
                'hangoutStartTime': hangoutStartTime.getTime(),
                'hangoutEndTime': hangoutEndTime.getTime(),
                'description': description,
                'maxGuests': maxGuests,
                'postDateTime': firebase.database.ServerValue.TIMESTAMP
            });
        }
    }
    return hangouts;
}]);

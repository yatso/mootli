angular.module('hangouts', ['firebase'])

.service('Hangouts', ['$firebaseArray', function($firebaseArray){
    
    var ref = firebase.database().ref().child('hangouts');
    var items = $firebaseArray(ref);

    var hangouts = {
        'items': items,
        addItem: function(data){
            items.$add({
                'hostUid': data.hostUid,
                'hostPhotoURL': data.hostPhotoURL,
                'hangoutName': data.hangoutName,
                'hostName': data.hostName,
                'email': data.email,
                'phoneNumber': data.phoneNumber,
                'location': data.location,
                'hangoutDate': data.hangoutDate.getTime(),
                'hangoutStartTime': data.hangoutStartTime.getTime(),
                'hangoutEndTime': data.hangoutEndTime.getTime(),
                'description': data.description,
                'maxGuests': data.maxGuests,
                'postDateTime': firebase.database.ServerValue.TIMESTAMP
            });
        }
    }
    return hangouts;
}]);

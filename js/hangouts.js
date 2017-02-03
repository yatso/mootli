angular.module('hangouts', ['firebase'])

.service('Hangouts', ['$firebaseArray', 'fbloginService',
											function($firebaseArray, fbloginService){
    
    var ref = firebase.database().ref().child('hangouts');
    var items = $firebaseArray(ref);

		function isGuestOfHangout(hangout, guest) {
				console.debug('isGuestOfHangout(hangout, guest):', hangout, guest);
				if (!hangout.guests || !hangout.guests.length) {
					// undefined or length 0
						return false;
				}
				return hangout.guests.find(g => g.uid == guest.uid);
		}
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
        },
				join: function(item) {
						var user = fbloginService.fbUserData.user;
						// We must be working with an object that's actually part of the firebaseArray
						console.assert(items.indexOf(item) != -1);
						// Check whether current user is already in guest list
						if (isGuestOfHangout(item, user)) {
								console.debug('join: Guest is already part of the guest, not doing anything');
								return false;
						}
						console.debug('join: Adding current user to guest list');
						if (!item.guests) {
								item.guests = [];
						}
						item.guests.unshift({
								displayName: user.displayName,
								photoURL: user.photoURL,
								uid: user.uid
						});
						return items.$save(item);
				}
    }
    return hangouts;
}]);

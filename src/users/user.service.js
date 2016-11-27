import firebase from 'firebase';

function UserService($q) {

    function getUser(name) {
        const defer = $q.defer();

        firebase.database().ref('users/' + name).once('value')
            .then(user => defer.resolve(user.val()))
            .catch(error => defer.reject(error));

        return defer.promise;
    }

    function setUser(name) {
        const defer = $q.defer();
        const user = {
            name: name,
            score: 0
        };

        firebase.database().ref('users/' + name).set()
            .then(user => defer.resolve(user.val()))
            .catch(error => defer.reject(error));

        return defer.promise;
    }

    Object.assign(this, {
        setUser,
        getUser
    });
}

UserService.$inject = ['$q'];
export default UserService;

import firebase from 'firebase';

function UserService($q) {

    function getUser(name) {
        const defer = $q.defer();

        firebase.database().ref('users/' + name).once('value')
            .then(response => defer.resolve(response.val()))
            .catch(error => defer.reject(error));

        return defer.promise;
    }

    function setUser(name) {
        const defer = $q.defer();
        const user = {
            name: name,
            score: 0
        };

        firebase.database().ref('users/' + name).set(user)
            .then(() => defer.resolve(user))
            .catch(error => defer.reject(error));

        return defer.promise;
    }

    Object.assign(this, {
        setUser,
        getUser,
        username: '',
        score: 0
    });
}

UserService.$inject = ['$q'];
export default UserService;

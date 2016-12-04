import firebase from 'firebase';

function UserService($q) {

    const USERS = 'users/';
    const userService = this;

    function setName(name) {
        userService.name = name;
    }

    function getName() {
        return userService.name;
    }

    function getUser(name) {
        const defer = $q.defer();

        firebase.database().ref(USERS + name).once('value')
            .then(response => defer.resolve(response.val()))
            .catch(error => defer.reject(error));

        return defer.promise;
    }

    function setScore(name, score) {
        const defer = $q.defer();

        firebase.database().ref(USERS + name).once('value')
            .then((response) => {
                const currentScore = response.val().score;
                if (score > currentScore) {
                    setNewScore();
                } else {
                    defer.resolve({name, currentScore});
                }
            })
            .catch(error => defer.reject(error));

        function setNewScore() {
            firebase.database().ref(USERS + name).set({name, score})
                .then(() => defer.resolve({name, score}))
                .catch(error => defer.reject(error));
        }

        return defer.promise;
    }

    function getScores() {
        const defer = $q.defer();

        firebase.database().ref(USERS).once('value')
            .then((response) => {
                const scores = response.val() || []; 
                defer.resolve(scores);
            })
            .catch(error => defer.reject(error));

        return defer.promise;
    }

    function setUser(name) {
        const defer = $q.defer();
        const user = {
            name: name,
            score: 0
        };

        firebase.database().ref(USERS + name).set(user)
            .then(() => defer.resolve(user))
            .catch(error => defer.reject(error));

        return defer.promise;
    }

    Object.assign(this, {
        setUser,
        getUser,
        setScore,
        setName,
        getName,
        getScores,
        name: '',
        score: 0
    });
}

UserService.$inject = ['$q'];
export default UserService;

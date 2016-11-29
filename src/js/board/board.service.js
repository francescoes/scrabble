import firebase from 'firebase';

function BoardService($q) {

    function getWord() {
        const defer = $q.defer();
        // TODO get the 1000 as length
        const index = Math.floor(Math.random() * 1000) + 1;

        firebase.database().ref('words/' + index).once('value')
            .then(word => defer.resolve(word.val()))
            .catch(error => defer.reject(error))

        return defer.promise;
    }

    Object.assign(this, {
        getWord
    })
}

BoardService.$inject = ['$q'];

export default BoardService;

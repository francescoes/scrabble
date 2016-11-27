import firebase from 'firebase';

function BoardService($q) {

    function getWord() {
        const defer = $q.defer();

        firebase.database().ref('words/0').once('value')
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

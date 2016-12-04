import firebase from 'firebase';
import {EMPTY_LETTER} from '../constants';

function ScoreService($q) {

    let score = 0;
    let maxScore;

    function calculateMaxScore(n) {
        maxScore = Math.floor(Math.pow(1.95, n/3)); 
    }

    function decrementMaxScore(decrementValue = 1) {
        if (maxScore === 0) return;
        maxScore -= decrementValue;
    }

    function calculateActualScore() {
        score = getScore() + maxScore;
    }

    function getScore() {
        return score;
    }

    function storeScore(username) {
        const defer = $q.defer();
        const score = getScore();
        
        const highScore = {
            username,
            score
        };

        firebase.database().ref('highScore/' + username).once('value')
            .then((response) => {
                const currentScore = response.val().score;
                if (score > currentScore) {
                    setNewScore();
                } else {
                    defer.resolve({username, currentScore});
                }
            })
            .catch(error => defer.reject(error));

        function setNewScore() {
            firebase.database().ref('highScore/' + username).set(highScore)
            .then(() => defer.resolve(highScore))
            .catch(error => defer.reject(error));
        }

        return defer.promise;
    }

    function getScores() {
        const defer = $q.defer();
        
        firebase.database().ref('highScore/').once('value')
            .then((response) => defer.resolve(response.val()))
            .catch(error => defer.reject(error));

        return defer.promise;
    }

    Object.assign(this, {
        calculateMaxScore,
        decrementMaxScore,
        calculateActualScore,
        getScore,
        storeScore,
        getScores
    });
}

ScoreService.$inject = ['$q'];
export default ScoreService;

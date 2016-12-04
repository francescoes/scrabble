import firebase from 'firebase';
import {EMPTY_LETTER} from '../constants';

function ScoreService($q, UserService) {

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

    function storeScore(name) {
        const score = getScore();
        return UserService.setScore(name, score);
    }

    function getScores() {
        return UserService.getScores();
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

ScoreService.$inject = ['$q', 'UserService'];
export default ScoreService;

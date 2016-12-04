import firebase from 'firebase';
import {EMPTY_LETTER} from '../constants';

function ScoreService() {

    let score;

    function initScore(n) {
        score = Math.floor(Math.pow(1.95, n/3)); 
    }

    function decrementScore() {
        if (score === 0) return;
        score -= 1;
    }

    function getScore() {
        return score;
    }

    Object.assign(this, {
        initScore,
        decrementScore,
        getScore
    });
}

export default ScoreService;

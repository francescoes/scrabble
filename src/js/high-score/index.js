import angular from 'angular';
import highScore from './high-score.component';

const name = 'highScore';

angular.module(name, [])
    .component('highScore', highScore);

export default {
    name
};

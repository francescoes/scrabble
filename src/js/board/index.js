import angular from 'angular';
import board from './board.component';
import BoardService from './board.service';
import ScoreService from './score.service';
import WordsService from './words.service';

const name = 'board';

angular.module(name, [])
    .component('board', board)
    .service('BoardService', BoardService)
    .service('ScoreService', ScoreService)
    .service('WordsService', WordsService);

export default {
    name
};

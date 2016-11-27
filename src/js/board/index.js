import angular from 'angular';
import boardComponent from './board.component';
import BoardService from './board.service';

const name = 'board';

angular.module(name, [])
    .component('boardComponent', boardComponent)
    .service('BoardService', BoardService);

export default {
    name
};

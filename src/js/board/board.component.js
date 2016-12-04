import angular from 'angular';
import boardTemplate from './board.html';
import BoardController from './board.controller';

const board = {
    controller: BoardController,
    template: boardTemplate
};

export default board;

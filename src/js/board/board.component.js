import angular from 'angular';
import boardTemplate from './board.html';
import BoardController from './board.controller';

const boardComponent = {
    controller: BoardController,
    template: boardTemplate,
    bindings: {
        enabled: '<'
    }
};

export default boardComponent;

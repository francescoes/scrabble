import boardTemplate from './board.html';

const boardComponent = {
    controller: BoardController,
    template: boardTemplate,
    bindings: {
        enabled: '<'
    }
};


function BoardController (BoardService) {

    this.$onChanges = function (changes) {
        if(changes.enabled.currentValue) {
            BoardService.getWord();
        }
    }
}

BoardController.$inject = ['BoardService'];

export default boardComponent;

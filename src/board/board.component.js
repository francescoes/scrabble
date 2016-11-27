import boardTemplate from './board.html';

const boardComponent = {
    controller: BoardController,
    template: boardTemplate,
    bindings: {
        enabled: '<'
    }
};


function BoardController (BoardService) {

    this.$onChanges = (changes) => {
        if(changes.enabled.currentValue) {
            BoardService.getWord()
                .then(word => this.word = word.scrabble)
                .catch(error => console.error(error))
        }
    }

    Object.assign(this, {
        word: ''
    });
}

BoardController.$inject = ['BoardService'];

export default boardComponent;

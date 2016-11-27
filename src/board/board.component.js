import boardTemplate from './board.html';

const boardComponent = {
    controller: BoardController,
    template: boardTemplate,
    bindings: {
        enabled: '<'
    }
};


function BoardController($interval, BoardService) {

    const $ctrl = this;
    $ctrl.secondsLeft = 40;

    $ctrl.$onChanges = (changes) => {
        if (!changes.enabled.currentValue) {
            return;
        }

        BoardService.getWord()
            .then(word => {
                $ctrl.word = word.scrabble;
                startCountdown();
            })
            .catch(error => console.error(error));
    };

    function startCountdown() {
        const stopInterval = $interval(() => {
            $ctrl.secondsLeft -= 1;
            if ($ctrl.secondsLeft === 0) {
                $interval.cancel(stopInterval);
            }
        }, 1000);
    }

    Object.assign(this, {
        word: ''
    });
}

BoardController.$inject = ['$interval', 'BoardService'];

export default boardComponent;

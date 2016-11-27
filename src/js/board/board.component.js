import angular from 'angular';
import boardTemplate from './board.html';

const boardComponent = {
    controller: BoardController,
    template: boardTemplate,
    bindings: {
        enabled: '<'
    }
};


function BoardController($element, $interval, BoardService) {

    const $ctrl = this;

    $ctrl.$onChanges = (changes) => {
        if (!changes.enabled.currentValue) return;

        BoardService.getWord()
            .then(word => {
                $ctrl.word = word.scrabble;
                console.log(word);
                showBoard();
                startCountdown();
            })
            .catch(error => console.error(error));
    };

    function showBoard() {
        console.log($element);
        angular.element($element[0].firstChild).removeClass('no-display');
    }

    function startCountdown() {
        const stopInterval = $interval(() => {
            $ctrl.secondsLeft -= 1;
            if ($ctrl.secondsLeft === 0) $interval.cancel(stopInterval);
        }, 1000);
    }

    Object.assign($ctrl, {
        word: '',
        secondsLeft: 40
    });
}

BoardController.$inject = ['$element', '$interval', 'BoardService'];

export default boardComponent;

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
    
    let solution;
    let scrabbledWord;

    $ctrl.$onChanges = (changes) => {
        if (!changes.enabled.currentValue) return;

        BoardService.getWord()
            .then(response => {
                $ctrl.scrabbledWord = response.scrabble;
                solution = response.word;
                $ctrl.resultWord = Array(response.scrabble.length).fill('-').join('');
                showBoard();
                startCountdown();
            })
            .catch(error => console.error(error));
    };

    function showBoard() {
        angular.element($element[0].firstChild).removeClass('no-display');
    }

    function startCountdown() {
        const stopInterval = $interval(() => {
            $ctrl.secondsLeft -= 1;
            if ($ctrl.secondsLeft === 0) $interval.cancel(stopInterval);
        }, 1000);
    }

    function checkSolution () {
        if ($ctrl.resultWord === solution) {
            console.log('yes');
        } else {
            console.log('no');
        }
    }

    function addToResult(index, element) {
        $ctrl.resultWord = replaceAt($ctrl.resultWord.indexOf('-'), $ctrl.resultWord, element.letter);
        if ($ctrl.resultWord.indexOf('-') === -1) {
            checkSolution();
        }
    }

    function deleteFromResult(index) {
        $ctrl.resultWord = replaceAt(index, $ctrl.resultWord, '-');
    }

    function replaceAt(index, string, char) {
        return string.replace(string.charAt(index), char);
    }

    Object.assign($ctrl, {
        secondsLeft: 40,
        addToResult,
        deleteFromResult
    });
}

BoardController.$inject = ['$element', '$interval', 'BoardService'];

export default boardComponent;

import angular from 'angular';
import boardTemplate from './board.html';

const boardComponent = {
    controller: BoardController,
    template: boardTemplate,
    bindings: {
        enabled: '<'
    }
};

// TODO: maybe refactor in a route resolve style

function BoardController($element, $interval, BoardService) {

    const $ctrl = this;
    
    let countdownStarted = false;
    let solution;
    let scrabbledWord;

    $ctrl.$onChanges = (changes) => {
        if (!changes.enabled.currentValue) return;
        getNewWord();
    };

    function showBoard() {
        angular.element($element[0].firstChild).removeClass('no-display');
    }

    function startCountdown() {
        countdownStarted = true;
        const stopInterval = $interval(() => {
            $ctrl.secondsLeft -= 1;
            if ($ctrl.secondsLeft === 0) $interval.cancel(stopInterval);
        }, 1000);
    }

    function getNewWord() {
        BoardService.getWord()
            .then(response => {
                $ctrl.scrabbledWord = response.scrabble;
                solution = response.word;
                $ctrl.resultWord = Array(response.scrabble.length).fill('-').join('');
                showBoard();
                if (!countdownStarted) startCountdown();
            })
            .catch(error => console.error(error));
    }

    function checkSolution () {
        return ($ctrl.resultWord === solution);
    }

    function addToResult(index, element) {
        // the result string is already full
        if (isBoardFull())  return;
        $ctrl.resultWord = replaceAt($ctrl.resultWord.indexOf('-'), $ctrl.resultWord, element.letter);
        if (isBoardFull() && checkSolution()) getNewWord();
    }

    function isBoardFull() {
        return $ctrl.resultWord.indexOf('-') === -1;
    }

    function deleteFromResult(index) {
        $ctrl.resultWord = replaceAt(index, $ctrl.resultWord, '-');
    }

    function replaceAt(index, string, char) {
        return `${string.substr(0, index)}${char}${string.substr(index + 1)}`;
    }

    Object.assign($ctrl, {
        secondsLeft: 40,
        addToResult,
        deleteFromResult
    });
}

BoardController.$inject = ['$element', '$interval', 'BoardService'];

export default boardComponent;

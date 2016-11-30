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
    let countdownStarted = false;
    let solution;

    function $onChanges(changes) {
        if (!changes.enabled.currentValue) return;
        getNewWord();
    }

    function showBoard() {
        angular.element($element[0].firstChild).removeClass('no-display');
    }

    function startCountdown() {
        countdownStarted = true;
        const stopInterval = $interval(() => {
            decrementSecondLeft();
            if (getSecondLeft() === 0) $interval.cancel(stopInterval);
        }, 1000);
    }

    function getNewWord() {
        BoardService.getWord()
            .then(response => {
                solution = response.word;
                setScrambledWord(response.scrabble);
                setResultWord(Array(response.scrabble).fill('-').join(''));
                showBoard();
                if (!countdownStarted) startCountdown();
            })
            .catch(error => console.error(error));
    }

    function checkSolution () {
        return (getResultWord() === solution);
    }

    function addToResult(index, element) {
        // the result string is already full
        if (isBoardFull())  return;
        let resultWord = getResultWord();
        setResultWord(replaceAt(resultWord.indexOf('-'), resultWord, element.letter));
        if (isBoardFull() && checkSolution()) getNewWord();
    }

    function isBoardFull() {
        return $ctrl.resultWord.indexOf('-') === -1;
    }

    function deleteFromResult(index) {
        setResultWord(replaceAt(index, $ctrl.resultWord, '-'));
    }

    function replaceAt(index, string, char) {
        return `${string.substr(0, index)}${char}${string.substr(index + 1)}`;
    }

    function resetBoard() {
        setResultWord(Array(getResultWord().length).fill('-').join(''));
    }

    // function that access directly the scope

    function decrementSecondLeft() {
        $ctrl.secondsLeft -= 1;
    }

    function getSecondLeft() {
        return $ctrl.secondsLeft;
    }

    function setScrambledWord(word) {
        $ctrl.scrabbledWord = word;
    }

    function setResultWord(word) {
        $ctrl.resultWord = word;
    }

    function getResultWord(word) {
        return $ctrl.resultWord;
    }

    Object.assign($ctrl, {
        secondsLeft: 40,
        $onChanges,
        addToResult,
        deleteFromResult,
        resetBoard,
    });
}

BoardController.$inject = ['$element', '$interval', 'BoardService'];
export default boardComponent;

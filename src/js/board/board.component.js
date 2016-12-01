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

    const EMPTY_LETTER = '-';
    const $ctrl = this;
    const wordsMappings = {};    
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
                wordsMappings.originalScrambledWord = response.scrabble;
                setScrambledWord(response.scrabble);
                setResultWord(Array(response.scrabble.length).fill(EMPTY_LETTER).join(''));
                showBoard();
                if (!countdownStarted) startCountdown();
            })
            .catch(error => console.error(error));
    }

    function checkSolution () {
        return (getResultWord() === solution);
    }

    function addMapping(scrambledIndex, resultIndex, letter) {
        wordsMappings[resultIndex] = { 
            scrambledIndex, 
            resultIndex, 
            letter
        };
    }

    function flushWordsMapping() {
        for (let [key, value] of Object.entries(wordsMappings)) {
            if (typeof value === 'object') {
                delete wordsMappings[key];
            }
        }
    }

    function deleteMapping(resultIndex) {
        const mapping = wordsMappings[resultIndex];
        delete wordsMappings[resultIndex];
        return mapping;
    }

    function addToResult(scrambledIndex, scrambledWordElement) {
        if (isBoardFull() || scrambledWordElement.letter === EMPTY_LETTER)  return;
        const resultWord = getResultWord();
        const resultIndex = resultWord.indexOf(EMPTY_LETTER);
        addMapping(scrambledIndex, resultIndex, scrambledWordElement.letter);
        setScrambledWord(replaceAt(scrambledIndex, getScrambledWord(), EMPTY_LETTER));
        setResultWord(replaceAt(resultIndex, resultWord, scrambledWordElement.letter));
        if (isBoardFull() && checkSolution()) getNewWord();
    }

    function isBoardFull() {
        return getResultWord().indexOf(EMPTY_LETTER) === -1;
    }

    function deleteFromResult(resultIndex, resultWordElement) {
        if (resultWordElement.letter === EMPTY_LETTER)  return;
        const mapping = deleteMapping(resultIndex);
        setResultWord(replaceAt(resultIndex, getResultWord(), EMPTY_LETTER));
        setScrambledWord(replaceAt(mapping.scrambledIndex, getScrambledWord(), mapping.letter));
    }

    function replaceAt(index, string, char) {
        return `${string.substr(0, index)}${char}${string.substr(index + 1)}`;
    }

    function resetBoard() {
        setResultWord(Array(getResultWord().length).fill(EMPTY_LETTER).join(''));
        setScrambledWord(wordsMappings.originalScrambledWord);
        flushWordsMapping();
    }

    // function that access directly the scope

    function decrementSecondLeft() {
        $ctrl.secondsLeft -= 1;
    }

    function getSecondLeft() {
        return $ctrl.secondsLeft;
    }

    function setScrambledWord(word) {
        $ctrl.scrambledWord = word;
    }

    function getScrambledWord() {
        return $ctrl.scrambledWord;
    }

    function setResultWord(word) {
        $ctrl.resultWord = word;
    }

    function getResultWord() {
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

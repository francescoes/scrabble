function BoardController($element, $interval, BoardService) {

    const $ctrl = this;
    let countdownStarted = false;

    function $onChanges(changes) {
        if (!changes.enabled.currentValue) return;
        getNextWord();
    }

    function showBoard() {
        angular.element($element[0].firstChild).removeClass('no-display');
    }

    function resetBoard() {
        const {scrambled, result} = BoardService.getOriginalWords();
        setWords({scrambled, result});
        BoardService.flushWordsMapping();
    }

    function startCountdown() {
        countdownStarted = true;
        const stopInterval = $interval(() => {
            decrementSecondLeft();
            if (getSecondLeft() === 0) $interval.cancel(stopInterval);
        }, 1000);
    }

    function getNextWord() {
        BoardService.getWord()
            .then(response => {
                BoardService.initWordsMapping(response.scrabble, response.word);
                setWords({
                    scrambled: response.scrabble,
                    result: BoardService.getOriginalWords().result
                });
                showBoard();
                if (!countdownStarted) startCountdown();
            })
            .catch(error => console.error(error));
    }

    function addToResult(scrambledIndex, scrambledWordElement) {
        if (isBoardFull() || scrambledWordElement.letter === EMPTY_LETTER)  return;
        const resultWord = getResultWord();
        const resultIndex = resultWord.indexOf(EMPTY_LETTER);
        const scrambled = BoardService.replaceAt(scrambledIndex, getScrambledWord(), EMPTY_LETTER);
        const result = BoardService.replaceAt(resultIndex, resultWord, scrambledWordElement.letter);
        BoardService.addToWordMapping(scrambledIndex, resultIndex, scrambledWordElement.letter);
        setWords({scrambled, result});
        if (isBoardFull() && checkSolution()) getNextWord();
    }

    function deleteFromResult(resultIndex, resultWordElement) {
        if (resultWordElement.letter === EMPTY_LETTER)  return;
        const mapping = BoardService.deleteFromWordMapping(resultIndex);
        const result = BoardService.replaceAt(resultIndex, getResultWord(), EMPTY_LETTER);
        const scrambled = BoardService.replaceAt(mapping.scrambledIndex, getScrambledWord(), mapping.letter);
        setWords({scrambled, result });
    }

    // checking functions

    function checkSolution() {
        return (getResultWord() === BoardService.getOriginalWords().solution);
    }

    function isBoardFull() {
        return getResultWord().indexOf(EMPTY_LETTER) === -1;
    }

    // function that access directly the scope

    function decrementSecondLeft() {
        $ctrl.secondsLeft -= 1;
    }

    function getSecondLeft() {
        return $ctrl.secondsLeft;
    }

    function setWords(words) {
        Object.assign($ctrl, words); 
    }

    function getScrambledWord() {
        return $ctrl.scrambled;
    }

    function getResultWord() {
        return $ctrl.result;
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
export default BoardController;
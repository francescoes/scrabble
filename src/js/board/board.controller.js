import {EMPTY_LETTER} from '../constants';

function BoardController($element, $interval, WordsService, BoardService) {

    const $ctrl = this;
    $ctrl.words = {};
    let countdownStarted = false;

    function $onChanges(changes) {
        if (!changes.enabled.currentValue) return;
        getNextWord();
    }

    function showBoard() {
        angular.element($element[0].firstChild).removeClass('no-display');
    }

    function resetBoard() {
        const {scrambled, result} = WordsService.getOriginalWords();
        setWords({scrambled, result});
        WordsService.flushWordsMapping();
    }

    function startCountdown() {
        countdownStarted = true;
        const stopInterval = $interval(() => {
            $ctrl.secondsLeft -= 1;
            if ($ctrl.secondsLeft === 0) $interval.cancel(stopInterval);
        }, 1000);
    }

    function getNextWord() {
        WordsService.getWord()
            .then(response => {
                WordsService.initWordsMapping(response.scrabble, response.word);
                setWords({
                    scrambled: response.scrabble,
                    result: WordsService.getOriginalWords().result
                });
                showBoard();
                if (!countdownStarted) startCountdown();
            })
            .catch(error => console.error(error));
    }

    function addToResult(scrambledIndex, letter) {
        const words = BoardService.addToResult(scrambledIndex, letter, $ctrl.words.scrambled, $ctrl.words.result);
        if (!words) return;
        setWords(words);
        if (BoardService.isResultBoardFull(words.result) && BoardService.checkSolution(words.result)) {
            getNextWord();
        }
    }

    function deleteFromResult(resultIndex, letter) {
        const words = BoardService.deleteFromResult(resultIndex, letter, $ctrl.words.scrambled, $ctrl.words.result);
        if (words) setWords(words);
    }

    function setWords(words) {
        Object.assign($ctrl.words, words); 
    }

    Object.assign($ctrl, {
        secondsLeft: 40,
        addToResult,
        $onChanges,
        deleteFromResult,
        resetBoard,
    });
}

BoardController.$inject = ['$element', '$interval', 'WordsService', 'BoardService'];
export default BoardController;
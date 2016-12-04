import {EMPTY_LETTER} from '../constants';

function BoardController($state, $interval, WordsService, BoardService, ScoreService, UserService) {

    const $ctrl = this;
    const secondsLeft = 40;
    $ctrl.words = {};
    $ctrl.user = {};
    let countdownStarted = false;

    $ctrl.$onInit = () => {
        setName(UserService.getName());
        setScore(0);
        getNextWord();
    };

    function resetBoard() {
        const {scrambled, result} = WordsService.getOriginalWords();
        const emptyLetterCount = (getCurrentResult().match(/-/g) || []).length;
        ScoreService.decrementMaxScore(result.length - emptyLetterCount); 
        setWords({scrambled, result});
        WordsService.flushWordsMapping();
    }

    function startCountdown() {
        countdownStarted = true;
        const stopInterval = $interval(() => {
            $ctrl.secondsLeft -= 1;
            if ($ctrl.secondsLeft === 0) {
                stopGame();
                $interval.cancel(stopInterval);
            }
        }, 1000);
    }

    function stopGame() {
        ScoreService.storeScore(UserService.getName())
            .then(() => $state.go('highScore', {name: UserService.getName(), score: ScoreService.getScore()}))
            .catch(error => console.error(error));
    }

    function getNextWord() {
        WordsService.getWord()
            .then(response => {
                setWords({
                    scrambled: response.scrambled,
                    result: WordsService.getOriginalWords().result
                });
                ScoreService.calculateMaxScore(response.scrambled.length);
                if (!countdownStarted) startCountdown();
            })
            .catch(error => console.error(error));
    }

    function addToResult(scrambledIndex, letter) {
        const words = BoardService.addToResult(scrambledIndex, letter, $ctrl.words.scrambled, $ctrl.words.result);
        if (!words) return;
        setWords(words);
        if (BoardService.isResultBoardFull(words.result) && BoardService.checkSolution(words.result)) {
            ScoreService.calculateActualScore();
            setScore(ScoreService.getScore());
            getNextWord();
        }
    }

    function deleteFromResult(resultIndex, letter) {
        const words = BoardService.deleteFromResult(resultIndex, letter, $ctrl.words.scrambled, $ctrl.words.result);
        ScoreService.decrementMaxScore();
        if (words) setWords(words);
    }

    function setWords(words) {
        Object.assign($ctrl.words, words); 
    }

    function getCurrentResult() {
        return $ctrl.words.result;
    }

    function setName(name) {
        $ctrl.name = name;
    }

    function setScore(score) {
        $ctrl.score = score;
    }

    Object.assign($ctrl, {
        secondsLeft,
        addToResult,
        deleteFromResult,
        resetBoard,
    });
}

BoardController.$inject = ['$state', '$interval', 'WordsService', 'BoardService', 'ScoreService', 'UserService'];
export default BoardController;
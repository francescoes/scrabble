import firebase from 'firebase';
import {EMPTY_LETTER} from '../constants';

function BoardService($q, WordsService) {

    function addToResult(scrambledIndex, letter, scrambledWord, resultWord) {
        if (isResultBoardFull(resultWord) || letter === EMPTY_LETTER)  return false;
        const resultIndex = resultWord.indexOf(EMPTY_LETTER);
        const scrambled = WordsService.replaceAt(scrambledIndex, scrambledWord, EMPTY_LETTER);
        const result = WordsService.replaceAt(resultIndex, resultWord, letter);
        WordsService.addToWordMapping(scrambledIndex, resultIndex, letter);
        return {scrambled, result};
    }

    function deleteFromResult(resultIndex, letter, scrambledWord, resultWord) {
        if (letter === EMPTY_LETTER)  return false;
        const mapping = WordsService.deleteFromWordMapping(resultIndex);
        const result = WordsService.replaceAt(resultIndex, resultWord, EMPTY_LETTER);
        const scrambled = WordsService.replaceAt(mapping.scrambledIndex, scrambledWord, mapping.letter);
        return {scrambled, result};
    }

    function checkSolution(word) {
        return word === WordsService.getOriginalWords().solution;
    }

    function isResultBoardFull(word) {
        return word.indexOf(EMPTY_LETTER) === -1;
    }

    Object.assign(this, {
        addToResult,
        deleteFromResult,
        isResultBoardFull,
        checkSolution
    });
}

BoardService.$inject = ['$q', 'WordsService'];
export default BoardService;

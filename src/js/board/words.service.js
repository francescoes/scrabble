import firebase from 'firebase';
import {EMPTY_LETTER} from '../constants';

function WordsService($q) {

    const wordsMappings = {};

    function replaceAt(index, string, char) {
        return `${string.substr(0, index)}${char}${string.substr(index + 1)}`;
    }

    function initWordsMapping(scrabbled, solution) {
        wordsMappings.originalScrambledWord = scrabbled;
        wordsMappings.originalResultWord = Array(scrabbled.length).fill(EMPTY_LETTER).join('');
        wordsMappings.solution = solution;
    }

    function addToWordMapping(scrambledIndex, resultIndex, letter) {
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

    function deleteFromWordMapping(resultIndex) {
        const mapping = wordsMappings[resultIndex];
        delete wordsMappings[resultIndex];
        return mapping;
    }

    function getOriginalWords() {
        return {
            scrambled: wordsMappings.originalScrambledWord,
            result: wordsMappings.originalResultWord,
            solution: wordsMappings.solution
        };
    }

    function getWord() {
        const defer = $q.defer();
        // TODO get the 1000 as length
        const index = Math.floor(Math.random() * 1000) + 1;

        firebase.database().ref('words/' + index).once('value')
            .then(word => defer.resolve(word.val()))
            .catch(error => defer.reject(error))

        return defer.promise;
    }

    Object.assign(this, {
        getWord,
        replaceAt,
        initWordsMapping,
        addToWordMapping, 
        deleteFromWordMapping,
        flushWordsMapping,
        getOriginalWords
    })
}

WordsService.$inject = ['$q'];
export default WordsService;

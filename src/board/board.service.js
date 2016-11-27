import firebase from 'firebase';

function BoardService() {

    function getWord() {
        firebase.database().ref('words/0').once('value', function(item) {
            console.log(item.val());
        });
    }

    Object.assign(this, {
        getWord
    })
}

export default BoardService;

import firebase from 'firebase';
import angular from 'angular';
import users from './src/users';
import board from './src/board';

// Initialize Firebase
firebase.initializeApp({
    apiKey: "AIzaSyAh2zsPL3FJsB2Y4ETGEh8ML6ntnf-I3hE",
    authDomain: "scrambler-b48ab.firebaseapp.com",
    databaseURL: "https://scrambler-b48ab.firebaseio.com",
    storageBucket: "scrambler-b48ab.appspot.com",
    messagingSenderId: "194228686950"
});


const app = {
    name: 'scrabble',
    version: '0.0.1'
}

angular.module(app.name, [
    users.name,
    board.name
    ]);
angular.bootstrap(document, [app.name]);

// const form = document.querySelector('form[name="play-scrabble"]');

// form.addEventListener('submit', function onSubmit(event) {
//     event.preventDefault();

//     const name = event.target[0].value;

//     if (!name) {
//         console.log('Name cannot be empty!');
//         return;
//     }

//     firebase.database().ref('users/' + name).once('value', function(item) {
//         if (item.val()) {
//             console.log('Name already exist!');
//             return;
//         }

//         firebase.database().ref('users/' + name).set({
//             name: name
//         });
//     });
// });

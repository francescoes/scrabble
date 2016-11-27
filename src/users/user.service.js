import firebase from 'firebase';

export default function UserService() {

    function getUser(name) {
        return firebase.database().ref('users/' + name);
    }

    function setUser(name) {
        return firebase.database().ref('users/' + name).set({
            name: name,
            score: 0
        });
    }

    Object.assign(this, {
        setUser,
        getUser
    });
}

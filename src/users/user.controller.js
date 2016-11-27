import firebase from 'firebase';

function UserController(UserService) {

    this.isValidUser = false;

    function play() {
        UserService.getUser(this.name)
            .then(user => {
                if (!user) {
                    UserService.setUser(this.name)
                        .then(user => this.isValidUser = true)
                        .catch((error) => console.error(error));
                } else {
                    this.isValidUser = true;
                }
            })
            .catch(error => console.error(error));
    }

    Object.assign(this, {
        play,
        name: ''
    });
}

UserController.$inject = ['UserService'];
export default UserController;

import firebase from 'firebase';

function UserController(UserService) {

    const $ctrl = this;

    function play() {
        UserService.getUser($ctrl.name)
            .then(user => {
                if (!user) {
                    UserService.setUser($ctrl.name)
                        .then(() => $ctrl.isValidUser = true)
                        .catch((error) => console.error(error));
                } else {
                    $ctrl.isValidUser = true;
                }
            })
            .catch(error => console.error(error));
    }

    Object.assign($ctrl, {
        play,
        name: ''
    });
}

UserController.$inject = ['UserService'];
export default UserController;

import firebase from 'firebase';

function UserController($state, UserService) {

    const $ctrl = this;

    function play() {
        if (!$ctrl.name) {
            // TODO: form validation
            return;
        } 

        UserService.getUser($ctrl.name)
            .then(user => {
                if (!user) {
                    UserService.setUser($ctrl.name)
                        .then(() => {
                            if($ctrl.name) {
                                UserService.setName($ctrl.name);
                                $state.go('game');
                            }
                        }) 
                        .catch((error) => console.error(error));
                } else {
                    UserService.setName($ctrl.name);
                    $state.go('game');
                }
            })
            .catch(error => console.error(error));
    }

    Object.assign($ctrl, {
        play
    });
}

UserController.$inject = ['$state', 'UserService'];
export default UserController;

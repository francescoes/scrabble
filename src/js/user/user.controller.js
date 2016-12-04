import firebase from 'firebase';

function UserController($state, UserService) {

    const $ctrl = this;

    function play() {
        UserService.getUser($ctrl.name)
            .then(user => {
                if (!user) {
                    UserService.setUser($ctrl.name)
                        .then(() => {
                            if($ctrl.name) {
                                UserService.username = $ctrl.name;
                                $state.go('game', {username: $ctrl.name, score: 0});
                            }
                        }) 
                        .catch((error) => console.error(error));
                } else {
                    UserService.username = $ctrl.name;
                    $state.go('game', {username: $ctrl.name, score: UserService.score});
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

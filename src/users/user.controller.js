function UserController(UserService) {

    const $ctrl = this;

    $ctrl.isValidUser = false;

    function play() {
        $ctrl.isValidUser = true;
        return $ctrl.name;
    }

    Object.assign(this, {
        play
    });
}

UserController.$inject = ['UserService'];
export default UserController;

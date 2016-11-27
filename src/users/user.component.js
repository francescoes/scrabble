import template from './user.html';

const userComponent = {
    bindings: {},
    template: template,
    controller: UserController
};

function UserController(UserService) {

    const $ctrl = this;

    function play() {
        console.log($ctrl.name);
    }

    Object.assign(this, {
        play
    });
}

UserController.$inject = ['UserService'];
export default userComponent;

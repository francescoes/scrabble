import firebase from 'firebase';

function UserController($scope, UserService) {

    this.isValidUser = false;

    function play() {
        UserService.getUser(this.name).once('value', (user) => {
            if (!user.val()) {
                UserService.setUser(this.name)
                    .then((user) => $scope.$apply(() => this.isValidUser = true))
                    .catch(() => console.error('Error in saving the user'));
            } else {
                $scope.$apply(() => this.isValidUser = true); 
            }
        });
    }

    Object.assign(this, {
        play,
        name: ''
    });
}

UserController.$inject = ['$scope', 'UserService'];
export default UserController;

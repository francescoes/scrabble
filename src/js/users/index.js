import angular from 'angular';
import UserService from './user.service';
import UserController from './user.controller';

const name = 'users';

angular.module(name, [])
    .controller('UserController', UserController)
    .service('UserService', UserService);

export default {
    name
};

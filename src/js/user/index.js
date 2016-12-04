import angular from 'angular';
import user from './user.component';
import UserController from './user.controller';
import UserService from './user.service';

const name = 'user';

angular.module(name, [])
    .component('user', user)
    .service('UserService', UserService);

export default {
    name
};

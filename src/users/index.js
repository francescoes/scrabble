import angular from 'angular';
import UserService from './user.service';
import userComponent from './user.component';

const name = 'users';

angular.module(name, [])
    .component('userComponent', userComponent)
    .service('UserService', UserService);

export default {
    name
};

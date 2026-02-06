import me from './paths/me.js';
import userGet from './paths/user/get.js';
import friendGet from './paths/friend/get.js';
import connectionAdd from './paths/connection/add.js';

export const routes = {
  '/me': me,

  '/user/get': userGet,

  '/friend/get': friendGet,

  '/connection/add': connectionAdd,
};

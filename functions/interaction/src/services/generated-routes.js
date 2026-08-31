
import auth_changePassword from '../paths/auth/changePassword.js';
import connection_add from '../paths/connection/add.js';
import connection_refresh from '../paths/connection/refresh.js';
import connection_update from '../paths/connection/update.js';
import friend_add from '../paths/friend/add.js';
import friend_get from '../paths/friend/get.js';
import friend_remove from '../paths/friend/remove.js';
import _me from '../paths/me.js';
import message_get from '../paths/message/get.js';
import message_send from '../paths/message/send.js';
import server_add from '../paths/server/add.js';
import _template from '../paths/template.js';
import user_get from '../paths/user/get.js';

export const routes = {
  '/auth/changePassword': auth_changePassword,
  '/connection/add': connection_add,
  '/connection/refresh': connection_refresh,
  '/connection/update': connection_update,
  '/friend/add': friend_add,
  '/friend/get': friend_get,
  '/friend/remove': friend_remove,
  '/me': _me,
  '/message/get': message_get,
  '/message/send': message_send,
  '/server/add': server_add,
  '/template': _template,
  '/user/get': user_get,
};

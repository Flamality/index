
import auth_changePassword from '../paths/auth/changePassword';
import connection_add from '../paths/connection/add';
import connection_refresh from '../paths/connection/refresh';
import connection_update from '../paths/connection/update';
import friend_add from '../paths/friend/add';
import friend_get from '../paths/friend/get';
import friend_remove from '../paths/friend/remove';
import _me from '../paths/me';
import message_send from '../paths/message/send';
import server_add from '../paths/server/add';
import _template from '../paths/template';
import user_get from '../paths/user/get';

export const routes = {
  '/auth/changePassword': auth_changePassword,
  '/connection/add': connection_add,
  '/connection/refresh': connection_refresh,
  '/connection/update': connection_update,
  '/friend/add': friend_add,
  '/friend/get': friend_get,
  '/friend/remove': friend_remove,
  '/me': _me,
  '/message/send': message_send,
  '/server/add': server_add,
  '/template': _template,
  '/user/get': user_get,
};

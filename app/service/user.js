'use strict';

const {
  tables,
  getOne,
  getAll,
  modify,
  getConn,
} = require('../utils/mysqlKit');

const { getToken } = require('../utils/jwt');
const { aesEncrypt, aesDecrypt } = require('../utils/aes');
const { userStatus } = require('../utils/status');

module.exports = app => {
  class User extends app.Service {
    * register(nickname, mobile, password) {
      const conn = yield getConn(app);
      const pass = aesEncrypt(password);
      try {
        yield conn.insert(tables.user, { nickname, mobile, password: pass });
        yield conn.commit();
      } catch (e) {
        console.log(e);
        yield conn.rollback();
        return false;
      }
      return true;
    }

    * searchUserById(id) {
      return yield getOne(app, tables.user, { id });
    }

    * getAllUser() {
      try {
        const res = yield getAll(app, tables.user, {
          status: userStatus.NORMAL,
        });
        return res.map(function(ele) {
          return {
            id: ele.id,
            nickname: ele.nickname,
            mobile: ele.mobile,
            status: ele.status,
          };
        });
      } catch (error) {
        return null;
      }
    }

    * modifyPassword(id, oldpass, newpass) {
      try {
        const info = yield getOne(app, tables.user, { id });
        if (aesDecrypt(info.password) === oldpass) {
          const pass = aesEncrypt(newpass);
          const res = yield modify(app, tables.user, { id, password: pass });
          return res.affectedRows;
        }
        return false;
      } catch (e) {
        return false;
      }
    }

    * ban(id) {
      try {
        const res = yield modify(app, tables.user, {
          id,
          status: userStatus.BANNED,
        });
        return res.affectedRows;
      } catch (error) {
        return false;
      }
    }

    * resume(id) {
      try {
        const res = yield modify(app, tables.user, {
          id,
          status: userStatus.NORMAL,
        });
        return res.affectedRows;
      } catch (error) {
        return false;
      }
    }

    * deleteUser(id) {
      try {
        const res = yield modify(app, tables.user, {
          id,
          status: userStatus.DELETED,
        });
        return res.affectedRows;
      } catch (error) {
        return false;
      }
    }

    * login(nickname, password) {
      try {
        const res = yield getOne(app, tables.user, { nickname });
        if (aesDecrypt(res.password) === password) {
          return getToken(app, res.id);
        }
        return false;
      } catch (error) {
        return false;
      }
    }

    * modifyInfo(id, mobile) {
      const conn = yield getConn(app);
      try {
        yield conn.update(tables.user, { id, mobile });
        yield conn.update(tables.userInfo, { id, mobile });
        yield conn.commit();
        return true;
      } catch (error) {
        yield conn.rollback();
        return false;
      }
    }

    * getUserInfoById(id) {
      try {
        const res = yield getOne(app, tables.userInfo, {
          id,
        });
        return res;
      } catch (e) {
        return null;
      }
    }
  }
  return User;
};

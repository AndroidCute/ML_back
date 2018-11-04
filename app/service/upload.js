'use strict';

const { tables, create, getAll } = require('../utils/mysqlKit');

module.exports = app => {
  class upload extends app.Service {
    * create(file) {
      try {
        const res = yield create(app, tables.file, file);
        return res.affectedRows;
      } catch (e) {
        app.logger.error('create err:', e);
        return false;
      }
    }

    * getList(where) {
      try {
        const res = yield getAll(app, tables.file, where);
        res.map(item => {
          item.key = item.id;
          return item;
        });
        return res;
      } catch (e) {
        return null;
      }
    }
  }

  return upload;
};

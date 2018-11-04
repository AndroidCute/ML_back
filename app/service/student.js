'use strict';

const { tables, create, getAll, modify, getOne, deleteOne, pieAgeCount } = require('../utils/mysqlKit');
const { goodsStatus } = require('../utils/status');

module.exports = app => {
  class student extends app.Service {
    * create(goodsInfo) {
      try {
        const res = yield create(app, tables.student, {
          name: goodsInfo.name,
          card: goodsInfo.card,
          sex: goodsInfo.sex,
          age: goodsInfo.age,
          avatar: goodsInfo.avatar,
          native: goodsInfo.native,
          science: goodsInfo.science,
          specialty: goodsInfo.specialty,
          class: goodsInfo.class,
        });
        return res.affectedRows;
      } catch (e) {
        app.logger.error('create err:', e);
        return false;
      }
    }

    * getAll() {
      try {
        const res = yield getAll(app, tables.student);
        res.map(item => {
          item.key = item.id;
          return item;
        });
        return res;
      } catch (e) {
        return null;
      }
    }

    * getList(where) {
      try {
        const res = yield getAll(app, tables.student, where);
        res.map(item => {
          item.key = item.id;
          return item;
        });
        return res;
      } catch (e) {
        return null;
      }
    }

    * modify(goodsInfo) {
      try {
        const goods = yield getOne(app, tables.student, { card: goodsInfo.card });
        console.log(goodsInfo);
        const res = yield modify(app, tables.student, {
          id: goods.id,
          card: goodsInfo.card ? goodsInfo.card : goods.card,
          name: goodsInfo.name ? goodsInfo.name : goods.name,
          sex: goodsInfo.sex ? goodsInfo.sex : goods.sex,
          age: goodsInfo.age ? goodsInfo.age : goods.age,
          avatar: goodsInfo.avatar ? goodsInfo.avatar : goods.avatar,
          native: goodsInfo.native ? goodsInfo.native : goods.native,
          science: goodsInfo.science ? goodsInfo.science : goods.science,
          specialty: goodsInfo.apecialty ? goodsInfo.specialty : goods.specialty,
          class: goodsStatus.class ? goodsInfo.class : goods.class,
        });
        return res.affectedRows;
      } catch (e) {
        return false;
      }
    }

    * delete(id) {
      try {
        const res = yield deleteOne(app, tables.student, {
          id,
        });
        return res.affectedRows;
      } catch (e) {
        return false;
      }
    }


    * pieAgeCount() {
      try {
        const res = yield pieAgeCount(app);
        return res;
      } catch (e) {
        return null;
      }
    }

  }
  return student;
};

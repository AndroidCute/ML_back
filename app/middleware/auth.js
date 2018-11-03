
'use strict';

module.exports = () => {
  return function* auth(next) {
    yield next;
  };
};

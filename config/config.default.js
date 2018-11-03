'use strict';

const path = require('path');

module.exports = appInfo => {
  const config = {};

  // should change to your own
  config.keys = appInfo.name + '_1501055229355_649';

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: '*',
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET, POST, OPTIONS',
  };

  return config;
};

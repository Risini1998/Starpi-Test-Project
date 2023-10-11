'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('select-type')
      .service('myService')
      .getWelcomeMessage();
  },
});

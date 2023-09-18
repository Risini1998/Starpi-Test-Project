'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('my-test-plugin')
      .service('myService')
      .getWelcomeMessage();
  },
});

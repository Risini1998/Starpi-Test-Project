'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('url-image')
      .service('myService')
      .getWelcomeMessage();
  },
});

'use strict';

module.exports = ({ strapi }) => {
  strapi.customFields.register({
    name: "url-image",
    plugin: "url-image",
    type: "string",
    inputSize: {
      // optional
      default: 4,
      isResizable: true,
    },
  });};

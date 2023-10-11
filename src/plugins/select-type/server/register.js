'use strict';

module.exports = ({ strapi }) => {
  strapi.customFields.register({
    name: "select-type",
    plugin: "select-type",
    type: "string",
    inputSize: {
      // optional
      default: 4,
      isResizable: true,
    },
  });};

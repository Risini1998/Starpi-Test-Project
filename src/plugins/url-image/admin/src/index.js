import { prefixPluginTranslations } from '@strapi/helper-plugin';
import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import Initializer from './components/Initializer';
import PluginIcon from './components/PluginIcon';
import PictureIcon from './components/PictureIcon';
import UrlImage from './components/UrlImage';
const name = pluginPkg.strapi.name;

export default {
  register(app) {
    app.addMenuLink({
      to: `/plugins/${pluginId}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: name,
      },
      Component: async () => {
        const component = await import(/* webpackChunkName: "[request]" */ './pages/App');

        return component;
      },
      permissions: [
        // Uncomment to set the permissions of the plugin here
        // {
        //   action: '', // the action name should be plugin::plugin-name.actionType
        //   subject: null,
        // },
      ],
    });
    app.registerPlugin({
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    });
    app.addFields({
      Component: UrlImage,
      type: pluginId
    });
    app.customFields.register({
      name: "url-image",
      pluginId: "url-image", // the custom field is created by a url-image plugin
      type: "string", // the color will be stored as a string
      intlLabel: {
        id: "url-image.url-image.label",
        defaultMessage: "Image",
      },
      intlDescription: {
        id: "url-image.url-image.description",
        defaultMessage: "Select any image with URL",
      },
      icon: PictureIcon, // don't forget to create/import your icon component
      components: {
        Input: async () =>
          // @ts-ignore
            import(
            /* webpackChunkName: "input-component" */ "./components/UrlImage/index.js"
          ),
      },
      // options: {
      //   base: [
      //     /*
      //       Declare settings to be added to the "Base settings" section
      //       of the field in the Content-Type Builder
      //     */
      //     {
      //       sectionTitle: {
      //         // Add a "Format" settings section
      //         id: "color-picker.color.section.format",
      //         defaultMessage: "Format",
      //       },
      //       items: [
      //         // Add settings items to the section
      //         {
      //           /*
      //             Add a "Color format" dropdown
      //             to choose between 2 different format options
      //             for the color value: hexadecimal or RGBA
      //           */
      //           intlLabel: {
      //             id: "color-picker.color.format.label",
      //             defaultMessage: "Color format",
      //           },
      //           name: "options.format",
      //           type: "select",
      //           value: "hex", // option selected by default
      //           options: [
      //             // List all available "Color format" options
      //             {
      //               key: "hex",
      //               defaultValue: "hex",
      //               value: "hex",
      //               metadatas: {
      //                 intlLabel: {
      //                   id: "color-picker.color.format.hex",
      //                   defaultMessage: "Hexadecimal",
      //                 },
      //               },
      //             },
      //             {
      //               key: "rgba",
      //               value: "rgba",
      //               metadatas: {
      //                 intlLabel: {
      //                   id: "color-picker.color.format.rgba",
      //                   defaultMessage: "RGBA",
      //                 },
      //               },
      //             },
      //           ],
      //         },
      //       ],
      //     },
      //   ],
      //   advanced: [
      //     /*
      //       Declare settings to be added to the "Advanced settings" section
      //       of the field in the Content-Type Builder
      //     */
      //   ],
      //   validator: (args) => ({
      //     format: yup.string().required({
      //       id: "options.color-picker.format.error",
      //       defaultMessage: "The color format is required",
      //     }),
      //   }),
      // },
    });
  },

  bootstrap(app) {
    // app.registerHook(
    //   "Admin/CM/pages/EditView/mutate-edit-view-layout",
    //   mutateEditViewHook
    // )
  },
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(
          /* webpackChunkName: "translation-[request]" */ `./translations/${locale}.json`
        )
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};

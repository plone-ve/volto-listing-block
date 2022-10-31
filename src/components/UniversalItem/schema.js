// import {
//   schemaEnhancerFactory,
//   enhanceStylingSchema,
// } from '@eeacms/volto-listing-block/schema-utils';
// import { defineMessages } from 'react-intl';
//
// const messages = defineMessages({
//   title: {
//     id: 'Item type',
//     defaultMessage: 'Item type',
//   },
// });
//
// export default function universalItemSchemaEnhancer(props) {
//   const { schema } = props;
//   props.formData = props.formData || props.data;
//
//   const enhanceItemModel = schemaEnhancerFactory({
//     extensionName: 'itemTemplates',
//     messages,
//     blockType: 'listing',
//     extensionField: '@type',
//   });
//
//   const baseSchema = {
//     ...schema,
//     fieldsets: [
//       ...schema.fieldsets,
//       {
//         id: 'itemDesigner',
//         title: 'Item',
//         fields: ['itemModel'],
//       },
//     ],
//     properties: {
//       ...schema.properties,
//       itemModel: {
//         title: 'Item model',
//         widget: 'object',
//         schema: enhanceItemModel({
//           ...props,
//           schema: ItemSchema(props),
//         }),
//       },
//     },
//   };
//
//   const styledSchema = enhanceStylingSchema({
//     ...props,
//     schema: baseSchema,
//     // schema: baseSchema.properties.styles.schema,
//     formData: props.formData,
//   });
//
//   return styledSchema;
// }

import { defineMessages } from 'react-intl';
import { DefaultCardModelSchema } from '@eeacms/volto-listing-block/schema-utils';

const messages = defineMessages({
  title: {
    id: 'Card type',
    defaultMessage: 'Card type',
  },
});

export default function universalCardSchemaEnhancer(props) {
  const { schema } = props;

  // props.formData = props.formData || props.data;
  // const enhancer = schemaEnhancerFactory({
  //   extensionName: 'cardTemplates',
  //   messages,
  //   blockType: 'listing',
  //   extensionField: '@type',
  // });
  //
  schema.fieldsets.push({
    id: 'cardDesigner',
    title: 'Card',
    fields: ['itemModel'],
  });

  const baseSchema = {
    ...schema,
    fieldsets: [...schema.fieldsets],
    properties: {
      ...schema.properties,
      itemModel: {
        title: 'Card model',
        widget: 'object',
        schema: DefaultCardModelSchema,
        // schema: enhancer({
        //   ...props,
        //   schema: CardSchema(props),
        // }),
      },
    },
  };

  return baseSchema;
}

// enhanceStylingSchema,

// const styledSchema = enhanceStylingSchema({
//   ...props,
//   schema: baseSchema,
//   // schema: baseSchema.properties.styles.schema,
//   formData: props.formData,
// });
// return styledSchema;

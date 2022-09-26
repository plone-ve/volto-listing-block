import { cloneDeep } from 'lodash';
import config from '@plone/volto/registry';

const addTypeSelect = ({ intl, schema, extensionName, messages }) => {
  const field = '@type';
  const extensions = config.blocks.blocksConfig.listing.extensions;
  const variations = extensions[extensionName];
  schema.properties[field] = {
    title: intl.formatMessage(messages.title),
    choices: variations.map(({ id, title }) => [id, title]),
    defaultValue: variations.find(({ isDefault }) => isDefault).id,
  };
  schema.fieldsets[0].fields.unshift(field);

  return schema;
};

export const enhanceSchema = ({
  extensionName,
  messages,
  blockType = 'listing',
}) => ({ schema: originalSchema, formData, intl }) => {
  const extensionType = '@type'; // the attribute name that's stored in the block data
  // it identifies the type of extension that's
  // applied. Similar in scope, for example, with the block @type
  const blockConfig = config.blocks.blocksConfig[blockType];
  const extensions = blockConfig.extensions;
  const variations = extensions[extensionName];

  const activeItemName = formData?.[extensionType];
  let activeItem = variations?.find((item) => item.id === activeItemName);
  if (!activeItem) activeItem = variations?.find((item) => item.isDefault);

  const schemaEnhancer = activeItem?.['schemaEnhancer'];

  let schema = schemaEnhancer
    ? schemaEnhancer({ schema: cloneDeep(originalSchema), formData, intl })
    : cloneDeep(originalSchema);

  return addTypeSelect({ schema, intl, extensionName, messages });
};

export const addStylingSchema = ({
  formData,
  schema,
  blockType = 'listing',
  extensionName = 'itemTemplates',
  intl,
}) => {
  const extensionType = '@type'; // the attribute name that's stored in the block data
  const activeItemName = formData?.[extensionType];
  const blockConfig = config.blocks.blocksConfig[blockType];
  const activeVariation =
    formData['variation'] ||
    blockConfig.variations?.find(({ isDefault }) => isDefault) ||
    {};
  const extensions = blockConfig.extensions;
  const variations = extensions[extensionName];
  let activeItem = variations?.find((item) => item.id === activeItemName);

  const variationStyleSchema = activeVariation.stylesSchema;
  schema = variationStyleSchema
    ? variationStyleSchema({ schema: cloneDeep(schema), formData, intl })
    : schema;

  const stylingSchema = activeItem?.['stylesSchema'];
  schema = stylingSchema
    ? stylingSchema({ schema: cloneDeep(schema), formData, intl })
    : schema;

  return schema;
};

export const getVoltoStyles = (props) => {
  const styles = props ? props : {};
  const output = {};
  for (const [key, value] of Object.entries(styles)) {
    if (styles[key] === true) {
      output[key] = key;
    } else {
      output[value] = value;
    }
  }
  return output;
};

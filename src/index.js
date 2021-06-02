import CustomSummaryListingBlockTemplate from './CustomSummaryListingBlockTemplate';

const applyConfig = (config) => {
  config.blocks.blocksConfig.listing.variations = [
    ...config.blocks.blocksConfig.listing.variations,
    {
      id: 'customSummaryVariationId',
      isDefault: false,
      title: 'Custom summary',
      template: CustomSummaryListingBlockTemplate,
      schemaEnhancer: ({ schema, formData, intl }) => {
        schema.fieldsets[0].fields = [
          ...schema.fieldsets[0].fields,
          'imageOnRightSide',
          'hasImage',
          'hasDate',
          'hasDescription',
        ];

        schema.properties = {
          ...schema.properties,
          hasImage: {
            title: 'Image',
            type: 'boolean',
          },
          imageOnRightSide: {
            title: 'Image on Right (Default is Left)',
            type: 'boolean',
          },
          hasDate: {
            title: 'Publication date',
            type: 'boolean',
          },
          hasDescription: {
            title: 'Description',
            type: 'boolean',
          },
        };
        return schema;
      },
    },
  ];

  return config;
};

export default applyConfig;

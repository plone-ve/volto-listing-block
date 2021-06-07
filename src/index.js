import CustomGalleryListingBlockTemplate from './CustomGalleryListingBlockTemplate';
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
    {
      id: 'customGalleryVariationId',
      isDefault: false,
      title: 'Custom Gallery',
      template: CustomGalleryListingBlockTemplate,
      schemaEnhancer: ({ schema, formData, intl }) => {
        schema.fieldsets[0].fields = [
          ...schema.fieldsets[0].fields,
          'gridSize',
          'hasDate',
          'hasDescription',
        ];

        schema.properties = {
          ...schema.properties,
          gridSize: {
            title: 'Grid Size',
            choices: [
              ['three', 'Three'],
              ['four', 'Four'],
            ],
            factory: 'Choice',
            type: 'string',
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

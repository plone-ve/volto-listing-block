import CardsCarousel from './CardsCarousel';
import CustomCardsGalleryTemplate from './CustomCardsGalleryTemplate';
import CustomNewsListTemplate from './CustomNewsListTemplate';
import CustomSummaryListingBlockTemplate from './CustomSummaryListingBlockTemplate';

const applyConfig = (config) => {
  config.blocks.blocksConfig.listing.variations = [
    ...config.blocks.blocksConfig.listing.variations,
    {
      id: 'cardsCarousel',
      isDefault: false,
      title: 'Cards carousel',
      template: CardsCarousel,
      schemaEnhancer: ({ schema }) => {
        return {
          ...schema,
          fieldsets: [
            ...schema.fieldsets,
            {
              id: 'carousel',
              title: 'Carousel',
              fields: ['slidesToShow', 'slidesToScroll'],
            },
          ],
          properties: {
            ...schema.properties,
            slidesToShow: {
              title: 'Slides to show',
              type: 'number',
              default: 4,
              minimum: 1,
            },
            slidesToScroll: {
              title: 'Slides to scroll',
              type: 'number',
              default: 1,
              minimum: 1,
            },
          },
        };
      },
    },
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
      id: 'customCardsGalleryVariationId',
      isDefault: false,
      title: 'Custom cards gallery',
      template: CustomCardsGalleryTemplate,
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
    {
      id: 'customNewsListVariationId',
      isDefault: false,
      title: 'Custom news list',
      template: CustomNewsListTemplate,
      schemaEnhancer: ({ schema, formData, intl }) => {
        schema.fieldsets[0].fields = [...schema.fieldsets[0].fields, 'hasDate'];

        schema.properties = {
          ...schema.properties,
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

  // moment date locale. See https://momentjs.com/ - Multiple Locale Support
  config.settings.dateLocale = config.settings.dateLocale || 'en';
  return config;
};

export default applyConfig;

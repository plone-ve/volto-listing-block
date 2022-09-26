import CardsCarousel from './templates/CardsCarousel';
import CardsGallery from './templates/CardsGallery';
import NewsList from './templates/NewsList';
import Summary from './templates/Summary';

import {
  DefaultCardLayout,
  ImageCardLayout,
  LeftImageCardLayout,
  RightImageCardLayout,
} from './CardTemplates';

import { DefaultItemLayout } from './ItemTemplates';
import { SearchItemLayout } from './SearchItemTemplate';

import { BasicListingBlockStylesSchema } from './schema';

// import { ListingStylingSchemaEnhancer } from './schema';

const applyConfig = (config) => {
  // moment date locale. See https://momentjs.com/ - Multiple Locale Support
  config.settings.dateLocale = config.settings.dateLocale || 'en';
  const { listing } = config.blocks.blocksConfig;

  const blacklist = ['summary'];

  const { schemaEnhancer } = listing;

  // listing.stylesSchema = BasicListingBlockStylesSchema;

  listing.schemaEnhancer = (props) => {
    // NOTE: this is a schema finalizer
    const schema = schemaEnhancer ? schemaEnhancer(props) : props.schema;

    // move querystring to its own fieldset;
    schema.fieldsets[0].fields = schema.fieldsets[0].fields.filter(
      (f) => f !== 'querystring',
    );
    schema.fieldsets.splice(1, 0, {
      id: 'querystring',
      title: 'Query',
      fields: ['querystring'],
    });

    return schema;
  };

  listing.variations = [
    ...listing.variations.filter(({ id }) => blacklist.indexOf(id) === -1),
    {
      id: 'summary',
      isDefault: false,
      title: 'Item listing',
      template: Summary,
      schemaEnhancer: Summary.schemaEnhancer,
      stylesSchema: Summary.styleSchemaEnhancer,
    },
    {
      id: 'cardsCarousel',
      isDefault: false,
      title: 'Cards carousel',
      template: CardsCarousel,
      schemaEnhancer: CardsCarousel.schemaEnhancer,
      stylesSchema: CardsCarousel.styleSchemaEnhancer,
    },
    {
      id: 'customCardsGalleryVariationId',
      isDefault: false,
      title: 'Cards gallery',
      template: CardsGallery,
      schemaEnhancer: CardsGallery.schemaEnhancer,
    },
    {
      id: 'customNewsListVariationId',
      isDefault: false,
      title: 'News List',
      template: NewsList,
      schemaEnhancer: NewsList.schemaEnhancer,
    },
  ];

  listing.extensions = {
    ...listing.extensions,
    itemTemplates: [
      {
        id: 'item',
        isDefault: true,
        title: 'Basic Item',
        view: DefaultItemLayout,
      },
      {
        id: 'searchItem',
        isDefault: false,
        title: 'Search Item',
        view: SearchItemLayout,
        // stylesSchema: ListingStylingSchemaEnhancer,
      },
    ],
    cardTemplates: [
      {
        id: 'card',
        isDefault: true,
        title: 'Card (default)',
        view: DefaultCardLayout,
      },
      {
        id: 'imageCard',
        title: 'Image Card',
        view: ImageCardLayout,
      },
      {
        id: 'imageOnLeft',
        title: 'Image on left',
        view: LeftImageCardLayout,
      },
      {
        id: 'imageOnRight',
        title: 'Image on right',
        view: RightImageCardLayout,
      },
    ],
  };

  // Theming
  // This bug needs to be fixed first: https://github.com/plone/volto/issues/3675
  // listing.enableStyling = true;

  return config;
};

export default applyConfig;

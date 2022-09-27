import { compose } from 'redux';
import TeaserCardTemplate from './Card';
import { CardStylingSchemaEnhancer } from '../Listing/schema';
import { adjustTeaserSchema } from './schema';
import UniversalCard from '@eeacms/volto-listing-block/components/UniversalCard/UniversalCard';

export default (config) => {
  // Teaser
  if (config.blocks.blocksConfig.teaser) {
    config.blocks.blocksConfig.teaser.variations = [
      // ...(config.blocks.blocksConfig.teaser.variations || []),
      {
        id: 'card',
        isDefault: true,
        title: 'Card (top image)',
        template: TeaserCardTemplate,
        schemaEnhancer: compose(
          adjustTeaserSchema,
          UniversalCard.schemaEnhancer,
        ),
      },
    ];
    config.blocks.blocksConfig.teaser.enableStyling = true;
    config.blocks.blocksConfig.teaser.stylesSchema = CardStylingSchemaEnhancer;
  }

  // Teaser Grid
  if (config.blocks.blocksConfig.teaserGrid) {
    config.blocks.blocksConfig.teaserGrid.title = 'Teaser (Cards)';
  }

  return config;
};

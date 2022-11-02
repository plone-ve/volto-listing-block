import config from '@plone/volto/registry';
import { resolveExtension } from '@plone/volto/helpers/Extensions/withBlockExtensions';
import { Item } from './model';

// import { getVoltoStyles } from '@eeacms/volto-listing-block/schema-utils';
import schemaEnhancer from './schema';

function UniversalCard(props) {
  const { itemModel = {}, item, ...rest } = props;
  const extension = resolveExtension(
    '@type',
    config.blocks.blocksConfig.listing.extensions.cardTemplates,
    itemModel,
  );
  const CardTemplate = extension.template;

  return <CardTemplate item={new Item(item)} itemModel={itemModel} {...rest} />;
}

UniversalCard.schemaEnhancer = schemaEnhancer;

export default UniversalCard;

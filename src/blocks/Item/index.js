import codeSVG from '@plone/volto/icons/code.svg';
import ItemEdit from './Edit';
import ItemView from './View';
import { setItemStyling } from './schema';

export default (config) => {
  config.blocks.blocksConfig.item = {
    id: 'item',
    title: 'Item',
    icon: codeSVG,
    group: 'common',
    edit: ItemEdit,
    view: ItemView,
    blockHasOwnFocusManagement: true,
    restricted: false,
    mostUsed: false,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
    schemaEnhancer: setItemStyling,
  };

  config.settings.blocksWithFootnotesSupport = {
    ...(config.settings.blocksWithFootnotesSupport || {}),
    item: ['description'],
  };

  return config;
};

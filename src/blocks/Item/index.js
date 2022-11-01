import { compose } from 'redux';
import { addStyling } from '@plone/volto/helpers';

import ItemEdit from './Edit';
import ItemView from './View';
import { setItemStyling } from './schema';

import codeSVG from '@plone/volto/icons/code.svg';

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
    schemaEnhancer: compose(addStyling, setItemStyling),
  };

  config.settings.blocksWithFootnotesSupport = {
    ...(config.settings.blocksWithFootnotesSupport || {}),
    item: ['description'],
  };

  return config;
};

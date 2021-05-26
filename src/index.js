import CustomSummaryListingBlockTemplate from './CustomSummaryListingBlockTemplate';

const applyConfig = (config) => {
  config.blocks.blocksConfig.listing.variations = [
    ...config.blocks.blocksConfig.listing.variations,
    {
      id: 'titleVariationId',
      isDefault: false,
      title: 'Title only summary',
      template: CustomSummaryListingBlockTemplate,
    },
    {
      id: 'titleDateVariationId',
      isDefault: false,
      title: 'Title & publication date summary',
      template: CustomSummaryListingBlockTemplate,
    },
    {
      id: 'leftThumbTitleVariationId',
      isDefault: false,
      title: 'Left thumb & title summary',
      template: CustomSummaryListingBlockTemplate,
    },
    {
      id: 'rightThumbTitleVariationId',
      isDefault: false,
      title: 'Right thumb & title summary',
      template: CustomSummaryListingBlockTemplate,
    },
    {
      id: 'leftThumbTitleDateVariationId',
      isDefault: false,
      title: 'Left thumb, title publication date summary',
      template: CustomSummaryListingBlockTemplate,
    },
    {
      id: 'rightThumbTitleDateVariationId',
      isDefault: false,
      title: 'Right thumb, title publication date summary',
      template: CustomSummaryListingBlockTemplate,
    },
  ];

  return config;
};

export default applyConfig;

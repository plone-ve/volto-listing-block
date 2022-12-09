export default ({ data }) => {
  const { assetType = 'image' } = data;
  return {
    title: 'Item',
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['assetType'],
      },
      ...(assetType === 'image'
        ? [{ id: 'image', title: 'Image', fields: ['image', 'imageSize'] }]
        : []),
      ...(assetType === 'icon'
        ? [
            {
              id: 'icon',
              title: 'Icon',
              fields: ['icon', 'iconSize', 'iconTheme'],
            },
          ]
        : []),
    ],
    properties: {
      assetType: {
        title: 'Asset type',
        choices: [
          ['image', 'Image'],
          ['icon', 'Icon'],
        ],
        default: 'image',
      },
      image: {
        title: 'Image',
        widget: 'attachedimage',
      },
      imageSize: {
        title: 'Image size',
        choices: [
          ['small', 'Small'],
          ['medium', 'Medium'],
          ['big', 'Large'],
          ['preview', 'Preview'],
        ],
        default: 'big',
      },
      icon: {
        title: 'Icon name',
      },
      iconSize: {
        title: 'Icon size',
        choices: [
          ['small', 'Small'],
          ['medium', 'Medium'],
          ['big', 'Large'],
        ],
        default: 'big',
      },
      iconTheme: {
        title: 'Icon theme',
        choices: [
          ['primary', 'Primary'],
          ['secondary', 'Secondary'],
          ['tertiary', 'Tertiary'],
        ],
      },
    },
    required: [],
  };
};

export const setItemStyling = ({ intl, schema }) => {
  // TODO: this should be an enhancer, don't overwrite the schema
  schema.properties.styles.schema = {
    title: 'Item style',
    block: 'item',
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['theme', 'verticalAlign'],
      },
    ],
    properties: {
      theme: {
        title: 'Theme',
        choices: [
          ['primary', 'Primary'],
          ['secondary', 'Secondary'],
          ['tertiary', 'Tertiary'],
        ],
      },
      verticalAlign: {
        title: 'Vertical align',
        choices: [
          ['top', 'Top'],
          ['middle', 'Middle'],
          ['bottom', 'Bottom'],
        ],
      },
    },
    required: [],
  };
};

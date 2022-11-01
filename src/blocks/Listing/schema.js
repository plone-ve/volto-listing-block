import messages from '@eeacms/volto-listing-block/messages';

import alignLeftSVG from '@plone/volto/icons/align-left.svg';
import alignCenterSVG from '@plone/volto/icons/align-center.svg';

const ALIGN_INFO_MAP = {
  align_left: [alignLeftSVG, 'Left'],
  align_center: [alignCenterSVG, 'Center'],
};

export const setBasicStylingSchema = (args) => {
  const { schema, intl } = args;
  console.log('setBasicStylingSchema', args);
  schema.properties.styles.schema = {
    fieldsets: [
      {
        id: 'styling',
        title: 'Styling',
        fields: ['theme', 'inverted', 'rounded'],
      },
    ],
    properties: {
      theme: {
        title: intl.formatMessage(messages.Theme),
        description: intl.formatMessage(messages.ThemeHelp),
        choices: [
          ['', intl.formatMessage(messages.ThemeDefault)],
          ['primary', intl.formatMessage(messages.ThemePrimary)],
          ['secondary', intl.formatMessage(messages.ThemeSecondary)],
          ['tertiary', intl.formatMessage(messages.ThemeTertiary)],
        ],
      },
      inverted: {
        title: intl.formatMessage(messages.Inverted),
        description: intl.formatMessage(messages.InvertedHelp),
        type: 'boolean',
      },
      rounded: {
        title: intl.formatMessage(messages.Rounded),
        description: intl.formatMessage(messages.RoundedHelp),
        type: 'boolean',
      },
    },
    required: [],
  };

  return schema;
};

const CallToActionSchema = ({ formData }) => {
  return {
    fieldsets: [
      {
        id: 'default',
        fields: [
          'enable',
          ...(formData?.itemModel?.callToAction?.enable
            ? [
                'label',
                formData?.['@type'] === 'listing' ? 'urlTemplate' : 'href',
              ]
            : []),
        ], //
        title: 'Default',
      },
    ],
    properties: {
      enable: {
        type: 'boolean',
        title: 'Show action',
      },
      label: {
        title: 'Action label',
        default: 'Read more',
        defaultValue: 'Read more',
      },
      href: {
        title: 'Action URL',
        widget: 'object_browser',
        mode: 'link',
        selectedItemAttrs: ['Title', 'Description'],
        allowExternals: true,
      },
      urlTemplate: {
        title: 'Action URL Template',
        description:
          'Enter a path. Available placeholders: $URL, $PORTAL_URL. If empty, the result URL will be used.',
      },
    },
    required: [],
  };
};

export const setCardModelSchema = (args) => {
  const { formData, schema } = args;
  console.log('setCardModelSchema', args);
  const CardSchema = {
    fieldsets: [
      {
        id: 'cardDesigner',
        title: 'Card',
        fields: [
          'hasDate',
          'hasDescription',
          ...(formData?.itemModel?.hasDescription ? ['maxDescription'] : []),
          'hasMetaType',
          'hasLabel',
          'hasTags',
          'callToAction',
        ],
      },
    ],
    properties: {
      hasDate: {
        title: 'Publication date',
        type: 'boolean',
      },
      hasDescription: {
        title: 'Description',
        type: 'boolean',
      },
      maxDescription: {
        title: 'Description max lines',
        description:
          "Limit description to a maximum number of lines by adding trailing '...'",
        type: 'number',
        default: 2,
        minimum: 0,
        maximum: 5,
      },
      hasMetaType: {
        title: 'Show portal type',
        type: 'boolean',
      },
      hasLabel: {
        title: 'Show new/archived label',
        type: 'boolean',
      },
      hasTags: {
        title: 'Show tags',
        type: 'boolean',
      },
      callToAction: {
        widget: 'object',
        schema: CallToActionSchema({ formData }),
      },
    },
    required: [],
  };

  schema.properties.itemModel.schema = CardSchema;
  return schema;
};

export const setItemModelSchema = (args) => {
  const { formData, schema } = args;
  console.log('setItemModelSchema', args);
  const ItemSchema = {
    fieldsets: [
      {
        id: 'itemDesigner',
        title: 'Item',
        fields: [
          'hasDate',
          'hasDescription',
          'maxDescription',
          'hasImage',
          ...(formData.itemModel?.hasImage ? ['imageOnRightSide'] : []),
          // 'hasMetaType',
          // 'hasLabel',
          // 'hasTags',
          // 'callToAction',
        ],
      },
    ],
    properties: {
      hasDate: {
        title: 'Publication date',
        type: 'boolean',
      },
      hasDescription: {
        title: 'Description',
        type: 'boolean',
        default: true,
      },
      maxDescription: {
        title: 'Description max lines',
        description:
          "Limit description to a maximum number of lines by adding trailing '...'",
        type: 'number',
        default: 2,
        minimum: 0,
        maximum: 5,
      },
      hasImage: {
        title: 'Image',
        type: 'boolean',
        default: true,
      },
      imageOnRightSide: {
        title: 'Image on Right (Default is Left)',
        type: 'boolean',
      },
      // hasMetaType: {
      //   title: 'Show portal type',
      //   type: 'boolean',
      // },
      // hasLabel: {
      //   title: 'Show new/archived label',
      //   type: 'boolean',
      // },
      // hasTags: {
      //   title: 'Show tags',
      //   type: 'boolean',
      // },
    },
    required: [],
  };
  schema.properties.itemModel.schema = ItemSchema;
  return schema;
};

export const setCardStylingSchema = ({ schema }) => {
  const styleSchema = schema.properties.styles.schema;
  styleSchema.fieldsets[0].fields.push('text_align');
  styleSchema.properties = {
    ...styleSchema.properties,
    text_align: {
      title: 'Text align',
      widget: 'style_text_align',
      actions: Object.keys(ALIGN_INFO_MAP),
      actionsInfoMap: ALIGN_INFO_MAP,
    },
  };

  return schema;
};

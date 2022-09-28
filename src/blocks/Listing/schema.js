import messages from '@eeacms/volto-listing-block/messages';

import alignLeftSVG from '@plone/volto/icons/align-left.svg';
import alignCenterSVG from '@plone/volto/icons/align-center.svg';
import clearSVG from '@plone/volto/icons/clear.svg';

export const ALIGN_VALUE_MAP = [
  ['align_left', alignLeftSVG],
  ['align_center', alignCenterSVG],
  ['', clearSVG],
];

export const CardStylingSchemaEnhancer = ({ schema }) => {
  const styleSchema = schema.properties.styles.schema;
  styleSchema.fieldsets[0].fields.push('text_align');
  styleSchema.properties = {
    ...styleSchema.properties,
    text_align: {
      title: 'Text align',
      widget: 'style_text_align',
      actions: ALIGN_VALUE_MAP,
    },
  };

  return schema;
};

export const BasicListingBlockStylesSchema = ({ intl }) => ({
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
});

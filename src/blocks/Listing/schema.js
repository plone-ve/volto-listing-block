import { defineMessages } from 'react-intl';

import alignLeftSVG from '@plone/volto/icons/align-left.svg';
import alignCenterSVG from '@plone/volto/icons/align-center.svg';
import clearSVG from '@plone/volto/icons/clear.svg';

const ALIGN_VALUE_MAP = [
  ['align_left', alignLeftSVG],
  ['align_center', alignCenterSVG],
  ['', clearSVG],
];

const messages = defineMessages({
  styling: {
    id: 'Styling',
    defaultMessage: 'Styling',
  },

  Type: {
    id: 'Listing',
    defaultMessage: 'Listing',
  },
  Theme: {
    id: 'Theme',
    defaultMessage: 'Theme',
  },
  ThemeHelp: {
    id: 'Theme',
    defaultMessage: 'Theme',
  },
  ThemeDefault: {
    id: 'Default',
    defaultMessage: 'Default',
  },
  ThemePrimary: {
    id: 'Primary',
    defaultMessage: 'Primary',
  },
  ThemeSecondary: {
    id: 'Secondary',
    defaultMessage: 'Secondary',
  },
  ThemeTertiary: {
    id: 'Tertiary',
    defaultMessage: 'Tertiary',
  },
  Rounded: {
    id: 'Rounded',
    defaultMessage: 'Rounded',
  },
  RoundedHelp: {
    id: 'Rounded Image',
    defaultMessage: 'Rounded Image',
  },
  Inverted: {
    id: 'Inverted',
    defaultMessage: 'Inverted',
  },
  InvertedHelp: {
    id: 'InvertedHelp',
    defaultMessage: 'Inverted theme',
  },
});

export const ListingStylingSchemaEnhancer = ({ schema, intl }) => {
  // console.log('schema', schema);

  schema.fieldsets.push({
    id: 'styling',
    title: intl.formatMessage(messages.styling),
    fields: ['styles'],
  });

  const stylesSchema = {
    title: intl.formatMessage(messages.Type),
    block: 'listing',
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['theme', 'text_align', 'rounded', 'inverted'],
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
      text_align: {
        title: 'Text align',
        widget: 'style_text_align',
        actions: ALIGN_VALUE_MAP,
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

  schema.properties.styles = {
    widget: 'object',
    title: intl.formatMessage(messages.styling),
    schema: stylesSchema,
  };

  return schema;
};

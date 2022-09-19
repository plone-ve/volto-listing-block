import { Button, Label, Card as UiCard } from 'semantic-ui-react';
import config from '@plone/volto/registry';
import { flattenToAppURL } from '@plone/volto/helpers';

const getCallToAction = (item, options) => {
  const { urlTemplate } = options;
  return urlTemplate
    ? urlTemplate
        .replace('$PORTAL_URL', config.settings.publicURL)
        .replace('$URL', flattenToAppURL(item['@id']))
    : options.href?.[0]?.['@id'] || item['@id'];
};

const CallToAction = ({ item, itemModel, styles }) => (
  <Button
    as="a"
    href={getCallToAction(item, itemModel.callToAction)}
    className={
      styles?.theme
        ? styles.inverted
          ? styles.theme + ' inverted'
          : 'inverted'
        : 'tertiary inverted'
    }
  >
    {itemModel.callToAction.label || 'Read more'}
  </Button>
);

const Tags = ({ item }) => {
  return !!item?.Subject
    ? item.Subject.map((tag, i) => <Label key={i}>{tag}</Label>)
    : null;
};

const CardExtra = ({ item, itemModel = {}, ...rest }) => {
  const showCallToAction = itemModel?.callToAction?.enable;
  const showTags = itemModel.hasTags;
  const show = showCallToAction || showTags;

  return show ? (
    <UiCard.Content extra>
      {showTags && <Tags item={item} itemModel={itemModel} {...rest} />}
      {showCallToAction && (
        <CallToAction item={item} itemModel={itemModel} {...rest} />
      )}
    </UiCard.Content>
  ) : null;
};

export default CardExtra;

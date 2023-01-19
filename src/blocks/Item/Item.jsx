import cx from 'classnames';
import { Item as UiItem, Icon } from 'semantic-ui-react';

function Item({
  assetType,
  children,
  description,
  extra,
  header,
  icon,
  iconSize = 'big',
  theme,
  verticalAlign,
  image,
  imageSize = 'big',
  meta,
  mode = 'view',
}) {
  return (
    <UiItem.Group unstackable className="row">
      <UiItem className={cx(theme)}>
        {assetType === 'image' && image && (
          <UiItem.Image
            src={`${image}/@@images/image/${imageSize}`}
            className={cx('ui', imageSize, verticalAlign, 'aligned')}
            alt={header || 'Item image'}
          />
        )}
        {assetType === 'icon' && icon && (
          <Icon
            className={cx(icon, theme, verticalAlign, 'aligned')}
            size={iconSize}
          />
        )}
        <UiItem.Content verticalAlign={verticalAlign}>
          {header && <UiItem.Header>{header}</UiItem.Header>}
          {meta && <UiItem.Meta>{meta}</UiItem.Meta>}
          {description && mode === 'view' && (
            <UiItem.Description>{description}</UiItem.Description>
          )}
          {mode === 'edit' && children}
          {extra && <UiItem.Extra>{extra}</UiItem.Extra>}
        </UiItem.Content>
      </UiItem>
    </UiItem.Group>
  );
}

export default Item;

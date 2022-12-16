import React from 'react';
import { ConditionalLink } from '@plone/volto/components';

import PreviewImage from '@eeacms/volto-listing-block/PreviewImage';

const getLabel = (props) => {
  const { item, itemModel = {} } = props;
  const text = item.isNew ? 'New' : item.isExpired ? 'Archived' : null;

  return itemModel?.hasLabel && text
    ? {
        text,
        side: 'left',
        // TODO: set the colors from css?
        color: item.isExpired ? 'yellow' : 'green',
      }
    : null;
};

const CardImage = (props) => {
  const { item, isEditMode, preview_image, itemModel } = props;
  const label = getLabel(props);

  return (
    <ConditionalLink
      className="image"
      item={item}
      condition={!isEditMode && itemModel?.hasLink}
    >
      {!isEditMode && itemModel?.hasLink ? (
        <PreviewImage
          item={item}
          preview_image={preview_image}
          alt={item.title}
          label={label}
        />
      ) : (
        <div className={'image'}>
          <PreviewImage
            item={item}
            preview_image={preview_image}
            alt={item.title}
            label={label}
          />
        </div>
      )}
    </ConditionalLink>
  );
};

export default CardImage;

import { ConditionalLink } from '@plone/volto/components';
import DefaultImageSVG from '@plone/volto/components/manage/Blocks/Listing/default-image.svg';
import { flattenToAppURL } from '@plone/volto/helpers';
import config from '@plone/volto/registry';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import './less/editor.less';

const CustomCardsGalleryTemplate = ({
  items,
  gridSize,
  isEditMode,
  hasDate,
  hasDescription,
}) => {
  const { settings } = config;

  const makeTextBody = (item) => (
    <div className="content">
      <div className="header">{item.title ? item.title : item.id}</div>
      <div className="meta">
        {hasDate && item.effective && (
          <span className="category">
            {moment(item.effective).format('ll')}
          </span>
        )}
      </div>
      {hasDescription && (
        <div className="description">
          <p>{item.description}</p>
        </div>
      )}
    </div>
  );

  const makeImage = (item) => (
    <ConditionalLink className="image" item={item} condition={!isEditMode}>
      <img
        src={
          item[settings.listingPreviewImageField]
            ? flattenToAppURL(
                item[settings.listingPreviewImageField].scales.preview.download,
              )
            : DefaultImageSVG
        }
        alt={item.title}
      />{' '}
    </ConditionalLink>
  );

  return (
    <>
      {items && items.length > 0 && (
        <div className={`ui fluid ${gridSize || ''} cards`}>
          {items.map((item) => (
            <div className="ui centered card" key={item['@id']}>
              {makeImage(item)}
              {makeTextBody(item)}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

CustomCardsGalleryTemplate.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  linkMore: PropTypes.any,
  isEditMode: PropTypes.bool,
};

export default CustomCardsGalleryTemplate;

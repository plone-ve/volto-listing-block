import { ConditionalLink } from '@plone/volto/components';
import DefaultImageSVG from '@plone/volto/components/manage/Blocks/Listing/default-image.svg';
import { flattenToAppURL } from '@plone/volto/helpers';
import config from '@plone/volto/registry';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';
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
    <Card.Content>
      <Card.Header>{item.title ? item.title : item.id}</Card.Header>
      <Card.Meta>
        {hasDate && item.effective && (
          <span className="category">
            {moment(item.effective).format('ll')}
          </span>
        )}
      </Card.Meta>
      {hasDescription && (
        <Card.Description>
          <p>{item.description}</p>
        </Card.Description>
      )}
    </Card.Content>
  );

  const makeImage = (item) => {
    return (
      <ConditionalLink className="image" item={item} condition={!isEditMode}>
        <img
          src={
            item[settings.listingPreviewImageField]
              ? flattenToAppURL(
                  item[settings.listingPreviewImageField].scales.preview
                    .download,
                )
              : settings.depiction
              ? flattenToAppURL(item['@id'] + settings.depiction)
              : DefaultImageSVG
          }
          alt={item.title}
        />
      </ConditionalLink>
    );
  };

  return (
    <>
      {items && items.length > 0 && (
        <div className={`ui fluid ${gridSize || ''} cards`}>
          {items.map((item) => (
            <Card key={item['@id']} className="centered">
              {makeImage(item)}
              {makeTextBody(item)}
            </Card>
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

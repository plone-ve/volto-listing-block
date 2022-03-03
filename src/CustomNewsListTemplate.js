import { ConditionalLink } from '@plone/volto/components';
import DefaultImageSVG from '@plone/volto/components/manage/Blocks/Listing/default-image.svg';
import { flattenToAppURL } from '@plone/volto/helpers';
import config from '@plone/volto/registry';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import './less/editor.less';

const CustomNewsListTemplate = ({
  items,
  gridSize,
  isEditMode,
  hasDate,
  hasDescription,
}) => {
  const { settings } = config;

  const makeTextBody = (item) => (
    <div className="content">
      <a href={item['@id']} className="news-headline">
        {item.title ? item.title : item.id}
      </a>
      <div className="news-date">
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

  return (
    <>
      {items && items.length > 0 && (
        <div className={`ui fluid`}>
          {items.map((item) => (
            <div className="ui centered" key={item['@id']}>
              {makeTextBody(item)}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

CustomNewsListTemplate.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  linkMore: PropTypes.any,
  isEditMode: PropTypes.bool,
};

export default CustomNewsListTemplate;

import { ConditionalLink } from '@plone/volto/components';
import DefaultImageSVG from '@plone/volto/components/manage/Blocks/Listing/default-image.svg';
import { flattenToAppURL } from '@plone/volto/helpers';
import { isInternalURL } from '@plone/volto/helpers/Url/Url';
import config from '@plone/volto/registry';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';

const CustomSummaryListingBlockTemplate = ({
  items,
  linkTitle,
  linkHref,
  isEditMode,
  imageOnRightSide,
  hasImage,
  hasDate,
  hasDescription,
}) => {
  let href = linkHref?.[0]?.['@id'] || '';

  const { settings } = config;
  moment.locale(config.settings.dateLocale);
  const link = isInternalURL(href) ? (
    <ConditionalLink to={flattenToAppURL(href)} condition={!isEditMode}>
      {linkTitle || href}
    </ConditionalLink>
  ) : href ? (
    <a href={href}>{linkTitle || href}</a>
  ) : null;

  const makeTextBody = (item) => (
    <div className="listing-body">
      <h3>{item.title ? item.title : item.id}</h3>
      {hasDate && item.effective && (
        <p>{moment(item.effective).format('ll')}</p>
      )}
      {hasDescription && <p>{item.description}</p>}
    </div>
  );

  const makeImage = (item, style) => (
    <img
      style={style}
      src={
        item[settings.listingPreviewImageField]
          ? flattenToAppURL(
              item[settings.listingPreviewImageField].scales.preview.download,
            )
          : settings.depiction
          ? flattenToAppURL(item['@id'] + settings.depiction)
          : DefaultImageSVG
      }
      alt={item.title}
    />
  );

  return (
    <>
      <div className="items">
        {items && items.length > 0 ? (
          items.map((item) => (
            <div className="listing-item" key={item['@id']}>
              <ConditionalLink item={item} condition={!isEditMode}>
                {hasImage ? (
                  imageOnRightSide ? (
                    <>
                      {makeTextBody(item)}
                      {makeImage(item, { marginLeft: 'auto' })}
                    </>
                  ) : (
                    <>
                      {makeImage(item, null)}
                      {makeTextBody(item)}
                    </>
                  )
                ) : (
                  <>{makeTextBody(item)}</>
                )}
              </ConditionalLink>
            </div>
          ))
        ) : (
          <p>There are no items to show in this view.</p>
        )}
      </div>

      {link && <div className="footer">{link}</div>}
    </>
  );
};

CustomSummaryListingBlockTemplate.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  linkMore: PropTypes.any,
  isEditMode: PropTypes.bool,
};

export default CustomSummaryListingBlockTemplate;

import { ConditionalLink } from '@plone/volto/components';
import DefaultImageSVG from '@plone/volto/components/manage/Blocks/Listing/default-image.svg';
import { flattenToAppURL } from '@plone/volto/helpers';
import { isInternalURL } from '@plone/volto/helpers/Url/Url';
import config from '@plone/volto/registry';
import PropTypes from 'prop-types';
import React from 'react';

const CustomSummaryListingBlockTemplate = ({
  items,
  linkTitle,
  linkHref,
  isEditMode,
  variation,
}) => {
  let link = null;
  let href = linkHref?.[0]?.['@id'] || '';

  const { settings } = config;

  if (isInternalURL(href)) {
    link = (
      <ConditionalLink to={flattenToAppURL(href)} condition={!isEditMode}>
        {linkTitle || href}
      </ConditionalLink>
    );
  } else if (href) {
    link = <a href={href}>{linkTitle || href}</a>;
  }

  return (
    <>
      <div className="items">
        {items && items.length > 0 ? (
          items.map((item) => (
            <div className="listing-item" key={item['@id']}>
              <ConditionalLink item={item} condition={!isEditMode}>
                {variation === 'titleVariationId' && (
                  <div className="listing-body">
                    <h3>{item.title ? item.title : item.id}</h3>
                  </div>
                )}
                {variation === 'leftThumbTitleVariationId' && (
                  <>
                    <img
                      src={
                        item[settings.listingPreviewImageField]
                          ? flattenToAppURL(
                              item[settings.listingPreviewImageField].scales
                                .preview.download,
                            )
                          : DefaultImageSVG
                      }
                      alt={item.title}
                    />
                    <div className="listing-body">
                      <h3>{item.title ? item.title : item.id}</h3>
                    </div>
                  </>
                )}
                {variation === 'rightThumbTitleVariationId' && (
                  <>
                    <div className="listing-body">
                      <h3>{item.title ? item.title : item.id}</h3>
                      {/* <p>{item.pubdate}</p> */}
                    </div>
                    <img
                      style={{ marginLeft: 'auto' }}
                      src={
                        item[settings.listingPreviewImageField]
                          ? flattenToAppURL(
                              item[settings.listingPreviewImageField].scales
                                .preview.download,
                            )
                          : DefaultImageSVG
                      }
                      alt={item.title}
                    />
                  </>
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

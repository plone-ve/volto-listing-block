import cx from 'classnames';
import { ConditionalLink, FormattedDate } from '@plone/volto/components';
// import { buildStyleClassNamesFromData } from '@plone/volto/helpers';

import { getVoltoStyles } from '@eeacms/volto-listing-block/schema-utils';

import PreviewImage from '@eeacms/volto-listing-block/PreviewImage';

const getStyles = (props) => {
  const { itemModel = {} } = props;
  const res = {};
  if (itemModel.maxDescription) {
    res[`max-${itemModel.maxDescription}-lines`] = true;
  }
  if (itemModel.maxTitle) {
    res[`title-max-${itemModel.maxTitle}-lines`] = true;
  }
  return res;
};

const BodyText = ({ item, hasDate, hasDescription }) => {
  return (
    <div className="listing-body">
      <h3 className={'listing-header'}>{item.title ? item.title : item.id}</h3>
      {hasDate && item.effective && (
        <p className={'listing-date'}>
          <FormattedDate
            date={item.effective}
            format={{
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            }}
          />
        </p>
      )}
      {hasDescription && (
        <p className={'listing-description'}>{item.description}</p>
      )}
    </div>
  );
};

const BasicItem = (props) => {
  const { item, className, itemModel = {}, isEditMode = false } = props;
  const { hasImage, imageOnRightSide, hasDate, hasDescription } = itemModel;
  const styles = getStyles(props);

  return (
    <div
      className={cx('u-item listing-item', getVoltoStyles(styles), className)}
    >
      <div
        className={`wrapper ${imageOnRightSide ? 'right-image' : 'left-image'}`}
      >
        <div className="slot-top">
          <ConditionalLink item={item} condition={!isEditMode}>
            {hasImage ? (
              imageOnRightSide ? (
                <>
                  <BodyText
                    item={item}
                    hasDescription={hasDescription}
                    hasDate={hasDate}
                  />
                  <div className="image-wrapper">
                    <PreviewImage item={item} />
                  </div>
                </>
              ) : (
                <>
                  <div className="image-wrapper">
                    <PreviewImage item={item} />
                  </div>
                  <BodyText
                    item={item}
                    hasDescription={hasDescription}
                    hasDate={hasDate}
                  />
                </>
              )
            ) : (
              <BodyText
                item={item}
                hasDescription={hasDescription}
                hasDate={hasDate}
              />
            )}
          </ConditionalLink>
        </div>
        <div className="slot-bottom">{item?.extra}</div>
      </div>
    </div>
  );
};

export const DefaultItemLayout = (props) => {
  return <BasicItem {...props} />;
};

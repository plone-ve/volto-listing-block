import cx from 'classnames';
import { ConditionalLink } from '@plone/volto/components';

import { getVoltoStyles } from '@eeacms/volto-listing-block/schema-utils';

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

const BasicItem = (props) => {
  const { item, className, isEditMode = false } = props;
  const styles = getStyles(props);

  return (
    <div
      className={cx(
        'u-item listing-item simple-listing-item',
        getVoltoStyles(styles),
        className,
      )}
    >
      <div className="wrapper">
        <div className="slot-top">
          <ConditionalLink item={item} condition={!isEditMode}>
            <div className="listing-body">
              <p className={'listing-header'}>
                {item.title ? item.title : item.id}
              </p>
            </div>
          </ConditionalLink>
        </div>
        <div className="slot-bottom">{item?.extra}</div>
      </div>
    </div>
  );
};

export const SimpleItemLayout = (props) => {
  return <BasicItem {...props} />;
};

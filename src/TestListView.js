import { ListingBlockBody as ListingBody } from '@plone/volto/components';
import { withBlockExtensions } from '@plone/volto/helpers';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const TestListView = (props) => {
  const { data, path, pathname } = props;
  console.log({ props });

  return (
    <div className={cx('block listing', data.variation)}>
      <ListingBody {...props} path={path ?? pathname} />
    </div>
  );
};

TestListView.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  properties: PropTypes.objectOf(PropTypes.any).isRequired,
  block: PropTypes.string,
};

export default withBlockExtensions(TestListView);

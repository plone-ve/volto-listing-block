import { matchPath } from 'react-router';
import config from '@plone/volto/registry';
import { flattenToAppURL, isInternalURL } from '@plone/volto/helpers';

export const getImage = (url, size = 'preview') => {
  if (!url) return null;
  const isBlacklisted =
    (config.settings.externalRoutes ?? []).find((route) =>
      matchPath(flattenToAppURL(url), route.match),
    )?.length > 0;
  const isExternal = !isInternalURL(url) || isBlacklisted;
  if (isExternal) return url;
  return `${url}/@@images/image/${size}`;
};

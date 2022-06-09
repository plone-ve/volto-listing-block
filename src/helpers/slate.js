import { isString } from 'lodash';
import { Node } from 'slate';
import { serializeNodes } from 'volto-slate/editor/render';

export function getText(text) {
  if (Node.isNodeList(text)) {
    return serializeNodes(text);
  }
  if (isString(text)) {
    return text;
  }

  return '';
}

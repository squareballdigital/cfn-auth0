import { object, PropDecoders, string, text } from '@fmtk/decoders';
import { keyOf } from '../../internal/keyOf.js';

export interface Auth0ApiAttributes {
  Id: string;
  Identifier: string;
}

const props: PropDecoders<Auth0ApiAttributes> = {
  Id: string,
  Identifier: text,
};

export const decodeAuth0ApiAttributes = object(props);

export const Auth0ApiAttributeNames = keyOf(props);

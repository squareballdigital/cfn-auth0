import { object, PropDecoders, string } from '@fmtk/decoders';
import { keyOf } from '../../internal/keyOf.js';

export interface Auth0ClientAttributes {
  ClientId: string;
  ClientSecret: string;
}

const props: PropDecoders<Auth0ClientAttributes> = {
  ClientId: string,
  ClientSecret: string,
};

export const decodeAuth0ClientAttributes = object(props);

export const Auth0ClientAttributeNames = keyOf(props);

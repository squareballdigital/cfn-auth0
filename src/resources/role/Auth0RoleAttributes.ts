import { object, PropDecoders, string } from '@fmtk/decoders';
import { keyOf } from '../../internal/keyOf.js';

export interface Auth0RoleAttributes {
  RoleId: string;
}

const props: PropDecoders<Auth0RoleAttributes> = {
  RoleId: string,
};

export const decodeAuth0RoleAttributes = object(props);

export const Auth0RoleAttributeNames = keyOf(props);

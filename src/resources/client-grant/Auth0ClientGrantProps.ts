import { array, object, text } from '@fmtk/decoders';
import { Auth0ManagementClientProps } from '../../common/Auth0ManagementClientProps.js';

export interface Auth0ClientGrantProps extends Auth0ManagementClientProps {
  Audience: string;
  ClientId: string;
  Scope: string[];
}

export const decodeAuth0ClientGrantProps = object<Auth0ClientGrantProps>({
  Audience: text,
  ClientId: text,
  Domain: text,
  ManagementClientId: text,
  ManagementClientSecret: text,
  Scope: array(text),
});

import { object, string, text } from '@fmtk/decoders';
import { Auth0ManagementClientProps } from '../../common/Auth0ManagementClientProps.js';

export interface Auth0RoleProps extends Auth0ManagementClientProps {
  Description: string;
  Name: string;
}

export const decodeAuth0RoleProps = object<Auth0RoleProps>({
  Description: text,
  Domain: text,
  Name: text,
  ManagementClientId: string,
  ManagementClientSecret: string,
});

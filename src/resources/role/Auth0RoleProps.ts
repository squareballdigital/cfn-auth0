import { object, string, text } from '@fmtk/decoders';

export interface Auth0RoleProps {
  Description: string;
  Domain: string;
  ManagementClientId: string;
  ManagementClientSecret: string;
  Name: string;
}

export const decodeAuth0RoleProps = object<Auth0RoleProps>({
  Description: text,
  Domain: text,
  Name: text,
  ManagementClientId: string,
  ManagementClientSecret: string,
});

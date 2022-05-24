import { array, object, string, text } from '@fmtk/decoders';
import { Auth0ManagementClientProps } from '../../common/Auth0ManagementClientProps.js';

export interface Auth0RolePermission {
  Api: string;
  Permission: string;
}

export interface Auth0RolePermissionProps extends Auth0ManagementClientProps {
  Permissions: Auth0RolePermission[];
  RoleId: string;
}

export const decodeAuth0RolePermission = object<Auth0RolePermission>({
  Api: text,
  Permission: text,
});

export const decodeAuth0RolePermissionProps = object<Auth0RolePermissionProps>({
  Domain: text,
  ManagementClientId: string,
  ManagementClientSecret: string,
  Permissions: array(decodeAuth0RolePermission),
  RoleId: string,
});

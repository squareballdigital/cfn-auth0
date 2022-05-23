import { array, object, string, text } from '@fmtk/decoders';

export interface Auth0RolePermission {
  Api: string;
  Permission: string;
}

export interface Auth0RolePermissionProps {
  Domain: string;
  ManagementClientId: string;
  ManagementClientSecret: string;
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

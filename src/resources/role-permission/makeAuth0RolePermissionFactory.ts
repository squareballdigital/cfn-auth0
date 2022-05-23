import { TemplateBuilder } from '@squareball/cfntemplate';
import { Auth0CustomResourceAsset } from '../../common/Auth0CustomResourceAsset.js';
import { CustomResourceInstance } from '../../common/CustomResourceInstance.js';
import { CustomResourceFactory } from '../../internal/CustomResourceFactory.js';
import { Auth0RolePermissionResourceType } from './Auth0RolePermisisonResourceType.js';
import { Auth0RolePermissionProps } from './Auth0RolePermissionProps.js';

export type Auth0RolePermissionResource =
  CustomResourceInstance<Auth0RolePermissionProps>;

class Auth0RolePermissionFactory extends CustomResourceFactory<
  typeof Auth0RolePermissionResourceType,
  Auth0RolePermissionProps
> {
  constructor(name: string) {
    super(
      Auth0RolePermissionResourceType,
      {
        asset: new Auth0CustomResourceAsset(),
        handler: 'index.rolePermissionHandler',
        name,
      },
      [],
    );
  }
}

export function makeAuth0RolePermissionFactory(
  name: string,
): [TemplateBuilder, Auth0RolePermissionResource] {
  const factory = new Auth0RolePermissionFactory(name);
  return [factory, factory];
}

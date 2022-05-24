import { TemplateBuilder } from '@squareball/cfntemplate';
import { Auth0CustomResourceAsset } from '../../common/Auth0CustomResourceAsset.js';
import { CustomResourceInstance } from '../../common/CustomResourceInstance.js';
import { CustomResourceFactory } from '../../internal/CustomResourceFactory.js';
import { Auth0TenantSettingsProps } from './Auth0TenantSettingsProps.js';
import { Auth0TenantSettingsResourceType } from './Auth0TenantSettingsResourceType.js';

export type Auth0TenantSettingsResource =
  CustomResourceInstance<Auth0TenantSettingsProps>;

class Auth0TenantSettingsFactory extends CustomResourceFactory<
  typeof Auth0TenantSettingsResourceType,
  Auth0TenantSettingsProps
> {
  constructor(name: string) {
    super(
      Auth0TenantSettingsResourceType,
      {
        asset: new Auth0CustomResourceAsset(),
        handler: 'index.tenantSettingsHandler',
        name,
      },
      [],
    );
  }
}

export function makeAuth0TenantSettingsFactory(
  name: string,
): [TemplateBuilder, Auth0TenantSettingsResource] {
  const factory = new Auth0TenantSettingsFactory(name);
  return [factory, factory];
}

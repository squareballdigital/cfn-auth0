import { TemplateBuilder } from '@squareball/cfntemplate';
import { Auth0CustomResourceAsset } from '../../common/Auth0CustomResourceAsset.js';
import { CustomResourceInstance } from '../../common/CustomResourceInstance.js';
import { CustomResourceFactory } from '../../internal/CustomResourceFactory.js';
import {
  Auth0RoleAttributeNames,
  Auth0RoleAttributes,
} from './Auth0RoleAttributes.js';
import { Auth0RoleProps } from './Auth0RoleProps.js';
import { Auth0RoleResourceType } from './Auth0RoleResourceType.js';

export type Auth0RoleResource = CustomResourceInstance<
  Auth0RoleProps,
  Auth0RoleAttributes
>;

class Auth0RoleFactory extends CustomResourceFactory<
  typeof Auth0RoleResourceType,
  Auth0RoleProps,
  Auth0RoleAttributes
> {
  constructor(name: string) {
    super(
      Auth0RoleResourceType,
      {
        asset: new Auth0CustomResourceAsset(),
        handler: 'index.roleHandler',
        name,
      },
      Auth0RoleAttributeNames,
    );
  }
}

export function makeAuth0RoleFactory(
  name: string,
): [TemplateBuilder, Auth0RoleResource] {
  const factory = new Auth0RoleFactory(name);
  return [factory, factory];
}

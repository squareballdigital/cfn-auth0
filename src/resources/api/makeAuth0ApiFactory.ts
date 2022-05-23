import { TemplateBuilder } from '@squareball/cfntemplate';
import { Auth0CustomResourceAsset } from '../../common/Auth0CustomResourceAsset.js';
import { CustomResourceInstance } from '../../common/CustomResourceInstance.js';
import { CustomResourceFactory } from '../../internal/CustomResourceFactory.js';
import {
  Auth0ApiAttributeNames,
  Auth0ApiAttributes,
} from './Auth0ApiAttributes.js';
import { Auth0ApiProps } from './Auth0ApiProps.js';
import { Auth0ApiResourceType } from './Auth0ApiResourceType.js';

export type Auth0ApiResource = CustomResourceInstance<
  Auth0ApiProps,
  Auth0ApiAttributes
>;

class Auth0ApiFactory extends CustomResourceFactory<
  typeof Auth0ApiResourceType,
  Auth0ApiProps,
  Auth0ApiAttributes
> {
  constructor(name: string) {
    super(
      Auth0ApiResourceType,
      {
        asset: new Auth0CustomResourceAsset(),
        handler: 'index.apiHandler',
        name,
      },
      Auth0ApiAttributeNames,
    );
  }
}

export function makeAuth0ApiFactory(
  name: string,
): [TemplateBuilder, Auth0ApiResource] {
  const factory = new Auth0ApiFactory(name);
  return [factory, factory];
}

import { TemplateBuilder } from '@squareball/cfntemplate';
import { Auth0CustomResourceAsset } from '../../common/Auth0CustomResourceAsset.js';
import { CustomResourceInstance } from '../../common/CustomResourceInstance.js';
import { CustomResourceFactory } from '../../internal/CustomResourceFactory.js';
import { Auth0BrandingProps } from './Auth0BrandingProps.js';
import { Auth0BrandingResourceType } from './Auth0BrandingResourceType.js';

export type Auth0BrandingResource = CustomResourceInstance<Auth0BrandingProps>;

class Auth0BrandingFactory extends CustomResourceFactory<
  typeof Auth0BrandingResourceType,
  Auth0BrandingProps
> {
  constructor(name: string) {
    super(
      Auth0BrandingResourceType,
      {
        asset: new Auth0CustomResourceAsset(),
        handler: 'index.brandingHandler',
        name,
      },
      [],
    );
  }
}

export function makeAuth0BrandingFactory(
  name: string,
): [TemplateBuilder, Auth0BrandingResource] {
  const factory = new Auth0BrandingFactory(name);
  return [factory, factory];
}

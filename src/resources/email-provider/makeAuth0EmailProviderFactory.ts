import { TemplateBuilder } from '@squareball/cfntemplate';
import { Auth0CustomResourceAsset } from '../../common/Auth0CustomResourceAsset.js';
import { CustomResourceInstance } from '../../common/CustomResourceInstance.js';
import { CustomResourceFactory } from '../../internal/CustomResourceFactory.js';
import { Auth0EmailProviderProps } from './Auth0EmailProviderProps.js';
import { Auth0EmailProviderResourceType } from './Auth0EmailProviderResourceType.js';

export type Auth0EmailProviderResource =
  CustomResourceInstance<Auth0EmailProviderProps>;

class Auth0EmailProviderFactory extends CustomResourceFactory<
  typeof Auth0EmailProviderResourceType,
  Auth0EmailProviderProps
> {
  constructor(name: string) {
    super(
      Auth0EmailProviderResourceType,
      {
        asset: new Auth0CustomResourceAsset(),
        handler: 'index.emailProviderHandler',
        name,
      },
      [],
    );
  }
}

export function makeAuth0EmailProviderFactory(
  name: string,
): [TemplateBuilder, Auth0EmailProviderResource] {
  const factory = new Auth0EmailProviderFactory(name);
  return [factory, factory];
}

import { TemplateBuilder } from '@squareball/cfntemplate';
import { Auth0CustomResourceAsset } from '../../common/Auth0CustomResourceAsset.js';
import { CustomResourceInstance } from '../../common/CustomResourceInstance.js';
import { CustomResourceFactory } from '../../internal/CustomResourceFactory.js';
import { Auth0ClientGrantProps } from './Auth0ClientGrantProps.js';
import { Auth0ClientGrantResourceType } from './Auth0ClientGrantResourceType.js';

export type Auth0ClientGrantResource =
  CustomResourceInstance<Auth0ClientGrantProps>;

class Auth0ClientGrantFactory extends CustomResourceFactory<
  typeof Auth0ClientGrantResourceType,
  Auth0ClientGrantProps
> {
  constructor(name: string) {
    super(
      Auth0ClientGrantResourceType,
      {
        asset: new Auth0CustomResourceAsset(),
        handler: 'index.clientGrantHandler',
        name,
      },
      [],
    );
  }
}

export function makeAuth0ClientGrantFactory(
  name: string,
): [TemplateBuilder, Auth0ClientGrantResource] {
  const factory = new Auth0ClientGrantFactory(name);
  return [factory, factory];
}

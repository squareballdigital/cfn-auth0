import {
  AwsParam,
  Fn,
  localArn,
  PolicyEffect,
  TemplateBuilder,
} from '@squareball/cfntemplate';
import { Auth0CustomResourceAsset } from '../../common/Auth0CustomResourceAsset.js';
import { CustomResourceInstance } from '../../common/CustomResourceInstance.js';
import { CustomResourceFactory } from '../../internal/CustomResourceFactory.js';
import { getArnResource } from '../../internal/getArnResource.js';
import { makePolicy } from '../../internal/Policy.js';
import {
  Auth0ClientAttributeNames,
  Auth0ClientAttributes,
} from './Auth0ClientAttributes.js';
import { Auth0ClientProps } from './Auth0ClientProps.js';
import { Auth0ClientResourceType } from './Auth0ClientResourceType.js';

export type Auth0ClientResource = CustomResourceInstance<
  Auth0ClientProps,
  Auth0ClientAttributes
>;

class Auth0ClientFactory extends CustomResourceFactory<
  typeof Auth0ClientResourceType,
  Auth0ClientProps,
  Auth0ClientAttributes
> {
  constructor(name: string) {
    super(
      Auth0ClientResourceType,
      {
        asset: new Auth0CustomResourceAsset(),
        handler: 'index.clientHandler',
        name,
        policies: [
          makePolicy(`${name}Policy`, [
            {
              Action: [
                'ssm:DeleteParameter',
                'ssm:GetParameter',
                'ssm:PutParameter',
              ],
              Effect: PolicyEffect.Allow,
              Resource: localArn(
                'ssm',
                'parameter',
                Fn.Join('/', [
                  'deploy',
                  getArnResource(AwsParam.StackId),
                  Auth0ClientResourceType,
                  '*',
                ]),
              ),
            },
          ]),
        ],
      },
      Auth0ClientAttributeNames,
    );
  }
}

export function makeAuth0ClientFactory(
  name: string,
): [TemplateBuilder, Auth0ClientResource] {
  const factory = new Auth0ClientFactory(name);
  return [factory, factory];
}

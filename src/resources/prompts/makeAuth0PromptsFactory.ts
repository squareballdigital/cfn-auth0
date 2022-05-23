import { TemplateBuilder } from '@squareball/cfntemplate';
import { Auth0CustomResourceAsset } from '../../common/Auth0CustomResourceAsset.js';
import { CustomResourceInstance } from '../../common/CustomResourceInstance.js';
import { CustomResourceFactory } from '../../internal/CustomResourceFactory.js';
import { Auth0PromptsProps } from './Auth0PromptProps.js';
import { Auth0PromptsResourceType } from './Auth0PromptsResourceType.js';

export type Auth0PromptsResource = CustomResourceInstance<Auth0PromptsProps>;

class Auth0PromptsFactory extends CustomResourceFactory<
  typeof Auth0PromptsResourceType,
  Auth0PromptsProps
> {
  constructor(name: string) {
    super(
      Auth0PromptsResourceType,
      {
        asset: new Auth0CustomResourceAsset(),
        handler: 'index.promptsHandler',
        name,
      },
      [],
    );
  }
}

export function makeAuth0PromptsFactory(
  name: string,
): [TemplateBuilder, Auth0PromptsResource] {
  const factory = new Auth0PromptsFactory(name);
  return [factory, factory];
}

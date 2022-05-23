import { Auth0ResourceHandlerBase } from '../../internal/Auth0ResourceHandlerBase.js';
import { stripUndefined } from '../../internal/stripUndefined.js';
import {
  Auth0PromptsProps,
  decodeAuth0PromptsProps,
} from './Auth0PromptProps.js';

class Auth0PromptsHandler extends Auth0ResourceHandlerBase<Auth0PromptsProps> {
  constructor() {
    super(decodeAuth0PromptsProps);
  }

  protected override async createResource(): Promise<void> {
    await this.updateResource();
  }

  override async updateResource(): Promise<void> {
    // types are rubbish, cast away
    // see also https://auth0.com/docs/api/management/v2#!/Prompts/put_custom_text_by_language
    const prompts = (this.client as any).prompts;
    const props = this.properties;

    const request = stripUndefined({
      prompt: props.Prompt,
      language: props.Language,
      body: props.Values,
    });

    console.log(`update Prompts %O`, request);
    await prompts.updateCustomTextByLanguage(request);
  }
}

export const promptsHandler = new Auth0PromptsHandler().getHandler();

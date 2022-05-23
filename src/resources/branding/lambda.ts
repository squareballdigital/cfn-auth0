import { Auth0ResourceHandlerBase } from '../../internal/Auth0ResourceHandlerBase.js';
import { stripUndefined } from '../../internal/stripUndefined.js';
import {
  Auth0BrandingProps,
  decodeAuth0BrandingProps,
} from './Auth0BrandingProps.js';

class Auth0BrandingHandler extends Auth0ResourceHandlerBase<Auth0BrandingProps> {
  constructor() {
    super(decodeAuth0BrandingProps);
  }

  protected override async createResource(): Promise<void> {
    await this.updateResource();
  }

  override async updateResource(): Promise<void> {
    // types are rubbish, cast away
    // see also https://auth0.com/docs/api/management/v2#!/Branding/patch_branding
    const branding = (this.client as any).branding;
    const props = this.properties;

    const request = stripUndefined({
      colors:
        props.BackgroundColor || props.PrimaryColor
          ? stripUndefined({
              page_background: props.BackgroundColor,
              primary: props.PrimaryColor,
            })
          : undefined,
      favicon_url: props.FaviconUrl,
      logo_url: props.LogoUrl,
      font: props.FontUrl
        ? {
            url: props.FontUrl,
          }
        : undefined,
    });
    console.log(`update branding %O`, request);
    await branding.updateSettings({}, request);
  }
}

export const brandingHandler = new Auth0BrandingHandler().getHandler();

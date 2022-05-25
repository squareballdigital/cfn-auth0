import { Auth0ResourceHandlerBase } from '../../internal/Auth0ResourceHandlerBase.js';
import { stripUndefined } from '../../internal/stripUndefined.js';
import {
  Auth0EmailProviderProps,
  decodeAuth0EmailProviderProps,
} from './Auth0EmailProviderProps.js';

class Auth0EmailProviderHandler extends Auth0ResourceHandlerBase<Auth0EmailProviderProps> {
  constructor() {
    super(decodeAuth0EmailProviderProps);
  }

  protected override async createResource(): Promise<void> {
    const request = this.makeRequest();
    await this.client.configureEmailProvider(request);
  }

  protected override async deleteResource(): Promise<void> {
    await this.client.deleteEmailProvider();
  }

  override async updateResource(): Promise<void> {
    const request = this.makeRequest();
    await this.client.updateEmailProvider({}, request);
  }

  private makeRequest(): any {
    const provider = this.properties.Provider;
    let request: any;

    switch (provider.Name) {
      case 'mandrill':
        request = {
          name: provider.Name,
          credentials: stripUndefined({
            api_key: provider.ApiKey,
          }),
        };
        break;

      case 'mailgun':
        request = {
          name: provider.Name,
          credentials: stripUndefined({
            api_key: provider.ApiKey,
            domain: provider.Domain,
            region: provider.Region || null,
          }),
        };
        break;

      case 'ses':
        request = stripUndefined({
          name: provider.Name,
          credentials: stripUndefined({
            accessKeyId: provider.AccessKeyId,
            region: provider.Region,
            secretAccessKey: provider.SecretAccessKey,
          }),
          settings: provider.ConfigurationSetName && {
            message: {
              configuration_set_name: provider.ConfigurationSetName,
            },
          },
        });
        break;

      case 'sparkpost':
        request = {
          name: provider.Name,
          credentials: stripUndefined({
            api_key: provider.ApiKey,
            region: provider.Region || null,
          }),
        };
        break;

      default:
        throw new Error(`unknown email provider '${(provider as any).Name}'`);
    }

    if (this.properties.DefaultFromAddress) {
      request.default_from_address = this.properties.DefaultFromAddress;
    }

    return request;
  }
}

export const emailProviderHandler =
  new Auth0EmailProviderHandler().getHandler();

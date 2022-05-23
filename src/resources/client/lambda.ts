import {
  DeleteParameterCommand,
  GetParameterCommand,
  ParameterNotFound,
  PutParameterCommand,
  SSMClient,
} from '@aws-sdk/client-ssm';
import { AutoPhysicalResourceIdPrefix } from '@squareball/cfn-custom-resource';
import { Data } from 'auth0';
import { assertCondition } from '../../internal/assertCondition.js';
import { Auth0ResourceHandlerBase } from '../../internal/Auth0ResourceHandlerBase.js';
import {
  Auth0ClientAttributes,
  decodeAuth0ClientAttributes,
} from './Auth0ClientAttributes.js';
import {
  Auth0ClientProps,
  decodeAuth0ClientProps,
} from './Auth0ClientProps.js';
import { Auth0ClientResourceType } from './Auth0ClientResourceType.js';

class Auth0ClientResourceHandler extends Auth0ResourceHandlerBase<
  Auth0ClientProps,
  Auth0ClientAttributes
> {
  private readonly ssm = new SSMClient({});

  constructor() {
    super(decodeAuth0ClientProps, decodeAuth0ClientAttributes);
    // redact attributes in logs
    this.noEcho = true;
  }

  protected makeParameterName(): string {
    return `/deploy/${this.stackId}/${Auth0ClientResourceType}/${this.physicalResourceId}`;
  }

  protected override async createResource(): Promise<void> {
    const request = clientFromProps(this.properties);

    console.log(`create client %O`, request);
    const result = await this.client.createClient(request);

    assertCondition(result.client_id, 'expected result id');
    assertCondition(result.client_secret, 'expected generated secret');

    this.physicalResourceId = result.client_id;

    await this.ssm.send(
      new PutParameterCommand({
        Name: this.makeParameterName(),
        Value: result.client_secret,
        Type: 'SecureString',
      }),
    );

    this.data = {
      ClientId: result.client_id,
      ClientSecret: result.client_secret,
    };
  }

  protected override async deleteResource(): Promise<void> {
    if (this.physicalResourceId.startsWith(AutoPhysicalResourceIdPrefix)) {
      // creation failed so nothing to delete
      this.reason = 'id not recognised';
      return;
    }
    console.log(`delete client %s`, this.physicalResourceId);
    await this.client.deleteClient({ client_id: this.physicalResourceId });

    try {
      await this.ssm.send(
        new DeleteParameterCommand({
          Name: this.makeParameterName(),
        }),
      );
    } catch (err) {
      // don't care if this doesn't exist, because that's what we want ultimately
      if (!(err instanceof ParameterNotFound)) {
        throw err;
      }
    }
  }

  protected override async updateResource(): Promise<void> {
    const request = clientFromProps(this.properties, this.oldProperties);
    if (!request) {
      // changed too much, need to create a new resource
      await this.createResource();
      return;
    }

    const { Parameter: param } = await this.ssm.send(
      new GetParameterCommand({
        Name: this.makeParameterName(),
        WithDecryption: true,
      }),
    );
    assertCondition(param?.Value, `expected parameter to exist`);

    console.log(`update client %s %O`, request);

    await this.client.updateClient(
      { client_id: this.physicalResourceId },
      request,
    );

    this.data = {
      ClientId: this.physicalResourceId,
      ClientSecret: param.Value,
    };
  }
}

export const clientHandler = new Auth0ClientResourceHandler().getHandler();

function clientFromProps(newProps: Auth0ClientProps): Data;
function clientFromProps(
  newProps: Auth0ClientProps,
  oldProps: Auth0ClientProps,
): Data | undefined;
function clientFromProps(
  newProps: Auth0ClientProps,
  oldProps?: Auth0ClientProps,
): Data | undefined {
  if (oldProps && oldProps.Domain !== newProps.Domain) {
    return;
  }
  const result: Data = {
    allowed_logout_urls: newProps.AllowedLogoutUrls,
    allowed_origins: newProps.AllowedOrigins,
    app_type: newProps.AppType,
    callbacks: newProps.Callbacks,
    is_first_party: true,
    name: newProps.Name,
    oidc_conformant: true,
    token_endpoint_auth_method: newProps.TokenEndpointAuthMethod,
    web_origins: newProps.WebOrigins,
  };
  return result;
}

import { AutoPhysicalResourceIdPrefix } from '@squareball/cfn-custom-resource';
import { CreateClientGrant, UpdateClientGrant } from 'auth0';
import { assertCondition } from '../../internal/assertCondition.js';
import { Auth0ResourceHandlerBase } from '../../internal/Auth0ResourceHandlerBase.js';
import {
  Auth0ClientGrantProps,
  decodeAuth0ClientGrantProps,
} from './Auth0ClientGrantProps.js';

class Auth0ClientGrantResourceHandler extends Auth0ResourceHandlerBase<Auth0ClientGrantProps> {
  constructor() {
    super(decodeAuth0ClientGrantProps);
  }

  protected override async createResource(): Promise<void> {
    const request: CreateClientGrant = {
      client_id: this.properties.ClientId,
      audience: this.properties.Audience,
      scope: this.properties.Scope,
    };
    console.log(`create client grant %O`, request);
    const result = await this.client.createClientGrant(request);
    assertCondition(result.id, 'expected result id');
    this.physicalResourceId = result.id;
  }

  protected override async deleteResource(): Promise<void> {
    if (this.physicalResourceId.startsWith(AutoPhysicalResourceIdPrefix)) {
      // creation failed so nothing to delete
      this.reason = 'id not recognised';
      return;
    }
    console.log(`delete client grant %O`, this.physicalResourceId);
    await this.client.deleteClientGrant({ id: this.physicalResourceId });
  }

  protected override async updateResource(): Promise<void> {
    const props = this.properties;
    const oldProps = this.oldProperties;
    if (
      props.Domain !== oldProps.Domain ||
      props.Audience !== oldProps.Audience ||
      props.ClientId !== oldProps.ClientId
    ) {
      await this.createResource();
      return;
    }

    const request: UpdateClientGrant = {
      scope: props.Scope,
    };

    console.log(`update client grant %s %O`, this.physicalResourceId, request);

    await this.client.updateClientGrant(
      { id: this.physicalResourceId },
      request,
    );
  }
}

export const clientGrantHandler =
  new Auth0ClientGrantResourceHandler().getHandler();

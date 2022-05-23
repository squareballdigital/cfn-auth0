import { AutoPhysicalResourceIdPrefix } from '@squareball/cfn-custom-resource';
import { CreateResourceServer, ResourceServer } from 'auth0';
import { assertCondition } from '../../internal/assertCondition.js';
import { Auth0ResourceHandlerBase } from '../../internal/Auth0ResourceHandlerBase.js';
import {
  Auth0ApiAttributes,
  decodeAuth0ApiAttributes,
} from './Auth0ApiAttributes.js';
import {
  Auth0ApiProps,
  Auth0ApiScope,
  decodeAuth0ApiProps,
} from './Auth0ApiProps.js';

class Auth0ApiHandlerResource extends Auth0ResourceHandlerBase<
  Auth0ApiProps,
  Auth0ApiAttributes
> {
  constructor() {
    super(decodeAuth0ApiProps, decodeAuth0ApiAttributes);
  }

  /**
   * Create resource.
   */
  protected override async createResource(): Promise<void> {
    const props = this.properties;

    const request: CreateResourceServer = {
      identifier: props.Identifier,
      enforce_policies: true,
      name: props.Name,
      scopes: this.convertScopes(props.Scopes),
      skip_consent_for_verifiable_first_party_clients: true,
    };
    console.log(`create resource server %O`, request);

    const result = await this.client.createResourceServer(request);
    assertCondition(result.id, 'expected result id');

    this.physicalResourceId = result.id;
    this.data = {
      Id: result.id,
      Identifier: props.Identifier,
    };
  }

  /**
   * Delete resource.
   */
  protected override async deleteResource(): Promise<void> {
    if (this.physicalResourceId.startsWith(AutoPhysicalResourceIdPrefix)) {
      // creation failed so nothing to delete
      this.reason = 'id not recognised';
      return;
    }
    console.log(`delete resource server ${this.physicalResourceId}`);
    await this.client.deleteResourceServer({ id: this.physicalResourceId });
  }

  /**
   * Update resource.
   */
  protected override async updateResource(): Promise<void> {
    const props = this.properties;
    const oldProps = this.oldProperties;

    if (
      props.Domain !== oldProps.Domain ||
      props.Identifier !== oldProps.Identifier
    ) {
      await this.createResource();
      return;
    }

    const request: ResourceServer = {
      name: props.Name,
      scopes: this.convertScopes(props.Scopes),
    };

    console.log(
      `update resource server %s %O`,
      this.physicalResourceId,
      request,
    );

    const result = await this.client.updateResourceServer(
      { id: this.physicalResourceId },
      request,
    );

    this.data = {
      Id: result.id as string,
      Identifier: props.Identifier,
    };
  }

  private convertScopes(scopes: Auth0ApiScope[]): ResourceServer['scopes'] {
    return scopes.map(({ Description, Name }) => ({
      description: Description,
      value: Name,
    }));
  }
}

export const apiHandler = new Auth0ApiHandlerResource().getHandler();

import { AutoPhysicalResourceIdPrefix } from '@squareball/cfn-custom-resource';
import { CreateRoleData, UpdateRoleData } from 'auth0';
import { assertCondition } from '../../internal/assertCondition.js';
import { Auth0ResourceHandlerBase } from '../../internal/Auth0ResourceHandlerBase.js';
import {
  Auth0RoleAttributes,
  decodeAuth0RoleAttributes,
} from './Auth0RoleAttributes.js';
import { Auth0RoleProps, decodeAuth0RoleProps } from './Auth0RoleProps.js';

class Auth0RoleResourceHandler extends Auth0ResourceHandlerBase<
  Auth0RoleProps,
  Auth0RoleAttributes
> {
  constructor() {
    super(decodeAuth0RoleProps, decodeAuth0RoleAttributes);
  }

  protected override async createResource(): Promise<void> {
    const request: CreateRoleData = {
      name: this.properties.Name,
      description: this.properties.Description,
    };
    console.log(`create role %O`, request);

    const result = await this.client.createRole(request);
    assertCondition(result.id, 'expected role id');

    this.physicalResourceId = result.id;
    this.data = {
      RoleId: result.id,
    };
  }

  protected override async deleteResource(): Promise<void> {
    if (this.physicalResourceId.startsWith(AutoPhysicalResourceIdPrefix)) {
      // creation failed so nothing to delete
      this.reason = 'id not recognised';
      return;
    }
    console.log(`delete role %s`, this.physicalResourceId);
    await this.client.deleteRole({ id: this.physicalResourceId });
  }

  protected override async updateResource(): Promise<void> {
    if (this.properties.Domain !== this.oldProperties.Domain) {
      await this.createResource();
      return;
    }
    const request: UpdateRoleData = {
      name: this.properties.Name,
      description: this.properties.Description,
    };

    console.log(`update role %s %O`, this.physicalResourceId, request);
    const result = await this.client.updateRole(
      { id: this.physicalResourceId },
      request,
    );

    this.data = {
      RoleId: result.id as string,
    };
  }
}

export const roleHandler = new Auth0RoleResourceHandler().getHandler();

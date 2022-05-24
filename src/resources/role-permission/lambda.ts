import { PermissionData, PermissionsData } from 'auth0';
import { arrayDiff } from '../../internal/arrayDiff.js';
import { Auth0ResourceHandlerBase } from '../../internal/Auth0ResourceHandlerBase.js';
import {
  Auth0RolePermission,
  Auth0RolePermissionProps,
  decodeAuth0RolePermissionProps,
} from './Auth0RolePermissionProps.js';
import { Auth0RolePermissionResourceType } from './Auth0RolePermissionResourceType.js';

function comparePermission(
  a: Auth0RolePermission,
  b: Auth0RolePermission,
): boolean {
  return a.Api === b.Api && a.Permission === b.Permission;
}

function convertToAuth0Permission(p: Auth0RolePermission): PermissionData {
  return {
    permission_name: p.Permission,
    resource_server_identifier: p.Api,
  };
}

class Auth0RolePermissionResourceHandler extends Auth0ResourceHandlerBase<Auth0RolePermissionProps> {
  constructor() {
    super(decodeAuth0RolePermissionProps);
  }

  protected override async createResource(): Promise<void> {
    const request: PermissionsData = {
      permissions: this.properties.Permissions.map(convertToAuth0Permission),
    };
    console.log(
      `create auth0 role permission %s %O`,
      this.properties.RoleId,
      request,
    );
    await this.client.addPermissionsInRole(
      { id: this.properties.RoleId },
      request,
    );
    this.physicalResourceId = `${Auth0RolePermissionResourceType}:${this.physicalResourceId}`;
  }

  protected override async deleteResource(): Promise<void> {
    if (
      !this.physicalResourceId.startsWith(Auth0RolePermissionResourceType + ':')
    ) {
      // creation failed so nothing to delete
      this.reason = 'id not recognised';
      return;
    }
    await this.client.removePermissionsFromRole(
      { id: this.properties.RoleId },
      {
        permissions: this.properties.Permissions.map(convertToAuth0Permission),
      },
    );
  }

  protected override async updateResource(): Promise<void> {
    console.log(`update permissions for %s`, this.properties.RoleId);
    const props = this.properties;
    const oldProps = this.oldProperties;

    if (props.Domain !== oldProps.Domain || props.RoleId !== oldProps.RoleId) {
      console.log(`too much change, creating new resource`);
      await this.createResource();
      return;
    }

    console.log(`previous permissions %o`, this.oldProperties.Permissions);
    console.log(`new permissions %o`, this.properties.Permissions);

    const [remove, , add] = arrayDiff(
      oldProps.Permissions,
      props.Permissions,
      comparePermission,
    );

    if (remove.length) {
      console.log(`removing permissions %o`, add);

      await this.client.removePermissionsFromRole(
        { id: props.RoleId },
        {
          permissions: remove.map(convertToAuth0Permission),
        },
      );
    }
    if (add.length) {
      console.log(`add permissions %o`, remove);

      await this.client.addPermissionsInRole(
        { id: props.RoleId },
        {
          permissions: add.map(convertToAuth0Permission),
        },
      );
    }
  }
}

export const rolePermissionHandler =
  new Auth0RolePermissionResourceHandler().getHandler();

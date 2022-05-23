import { array, object, string, text } from '@fmtk/decoders';

export interface Auth0ApiScope {
  Name: string;
  Description: string;
}

export interface Auth0ApiProps {
  Domain: string;
  Identifier: string;
  ManagementClientId: string;
  ManagementClientSecret: string;
  Name: string;
  Scopes: Auth0ApiScope[];
}

export const decodeAuth0ApiScope = object<Auth0ApiScope>({
  Name: text,
  Description: text,
});

export const decodeAuth0ApiProps = object<Auth0ApiProps>({
  Domain: text,
  Identifier: text,
  Name: text,
  ManagementClientId: string,
  ManagementClientSecret: string,
  Scopes: array(decodeAuth0ApiScope),
});

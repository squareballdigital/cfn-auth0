import { array, object, text } from '@fmtk/decoders';

export interface Auth0ClientGrantProps {
  Audience: string;
  ClientId: string;
  Domain: string;
  ManagementClientId: string;
  ManagementClientSecret: string;
  Scope: string[];
}

export const decodeAuth0ClientGrantProps = object<Auth0ClientGrantProps>({
  Audience: text,
  ClientId: text,
  Domain: text,
  ManagementClientId: text,
  ManagementClientSecret: text,
  Scope: array(text),
});

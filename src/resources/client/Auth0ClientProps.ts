import { array, object, optional, string, text } from '@fmtk/decoders';

export interface Auth0ClientProps {
  AllowedLogoutUrls?: string[];
  AllowedOrigins?: string[];
  AppType: string;
  Callbacks?: string[];
  Domain: string;
  ManagementClientId: string;
  ManagementClientSecret: string;
  Name: string;
  TokenEndpointAuthMethod?: string;
  WebOrigins?: string[];
}

export const decodeAuth0ClientProps = object<Auth0ClientProps>({
  AllowedLogoutUrls: optional(array(text)),
  AllowedOrigins: optional(array(text)),
  AppType: string,
  Callbacks: optional(array(text)),
  Domain: text,
  Name: text,
  ManagementClientId: string,
  ManagementClientSecret: string,
  TokenEndpointAuthMethod: optional(string),
  WebOrigins: optional(array(text)),
});

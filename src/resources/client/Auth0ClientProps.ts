import { array, object, optional, string, text } from '@fmtk/decoders';
import { Auth0ManagementClientProps } from '../../common/Auth0ManagementClientProps.js';

export interface Auth0ClientProps extends Auth0ManagementClientProps {
  AllowedLogoutUrls?: string[];
  AllowedOrigins?: string[];
  AppType: string;
  Callbacks?: string[];
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

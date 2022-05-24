import { maybe, object, text } from '@fmtk/decoders';
import { Auth0ManagementClientProps } from '../../common/Auth0ManagementClientProps.js';

export interface Auth0BrandingProps extends Auth0ManagementClientProps {
  BackgroundColor?: string;
  FaviconUrl?: string;
  FontUrl?: string;
  LogoUrl?: string;
  PrimaryColor?: string;
}

export const decodeAuth0BrandingProps = object<Auth0BrandingProps>({
  BackgroundColor: maybe(text.optional),
  Domain: text,
  FaviconUrl: maybe(text.optional),
  FontUrl: maybe(text.optional),
  LogoUrl: maybe(text.optional),
  ManagementClientId: text,
  ManagementClientSecret: text,
  PrimaryColor: maybe(text.optional),
});

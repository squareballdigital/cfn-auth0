import { maybe, object, text } from '@fmtk/decoders';

export interface Auth0BrandingDetails {
  BackgroundColor?: string;
  FaviconUrl?: string;
  FontUrl?: string;
  LogoUrl?: string;
  PrimaryColor?: string;
}

export interface Auth0BrandingProps extends Auth0BrandingDetails {
  Domain: string;
  ManagementClientId: string;
  ManagementClientSecret: string;
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

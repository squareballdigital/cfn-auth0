import {
  array,
  chain,
  isInt,
  maybe,
  normaliseNumber,
  object,
  optional,
  record,
  string,
  text,
} from '@fmtk/decoders';
import { Auth0ManagementClientProps } from '../../common/Auth0ManagementClientProps.js';
import { stringBoolean } from '../../internal/stringBoolean.js';

export interface Auth0TenantChangePasswordSettings {
  Enabled?: boolean;
  Html?: string;
}

export interface Auth0TenantDeviceFlowSettings {
  Charset?: string;
  Mask?: string;
}

export interface Auth0TenantErrorPageSettings {
  ShowLogLink?: boolean;
  Html?: string;
  Url?: string;
}

export interface Auth0TenantGuardianMfaPageSettings {
  Enabled?: boolean;
  Html?: string;
}

export interface Auth0TenantSessionCookieSettings {
  Mode?: string;
}

export interface Auth0TenantSettingsProps extends Auth0ManagementClientProps {
  AllowedLogoutUrls?: string[];
  ChangePassword?: Auth0TenantChangePasswordSettings;
  DefaultAudience?: string;
  DefaultDirectory?: string;
  DefaultRedirectionUri?: string;
  DeviceFlow?: Auth0TenantDeviceFlowSettings;
  EnabledLocales?: string[];
  ErrorPage?: Auth0TenantErrorPageSettings;
  Flags?: Record<string, boolean>;
  FriendlyName?: string;
  GuardianMfaPage?: Auth0TenantGuardianMfaPageSettings;
  IdleSessionLifetime?: number;
  PictureUrl?: string;
  SandboxVersion?: string;
  SandboxVersionsAvailable?: string[];
  SessionCookie?: Auth0TenantSessionCookieSettings;
  SessionLifetime?: number;
  SupportEmail?: string;
  SupportUrl?: string;
}

export const decodeAuth0TenantChangePasswordSettings =
  object<Auth0TenantChangePasswordSettings>({
    Enabled: optional(stringBoolean),
    Html: optional(string),
  });

export const decodeAuth0TenantDeviceFlowSettings =
  object<Auth0TenantDeviceFlowSettings>({
    Charset: optional(text),
    Mask: optional(text),
  });

export const decodeAuth0TenantErrorPageSettings =
  object<Auth0TenantErrorPageSettings>({
    ShowLogLink: optional(stringBoolean),
    Html: optional(string),
    Url: optional(string),
  });

export const decodeAuth0TenantGuardianMfaPageSettings =
  object<Auth0TenantGuardianMfaPageSettings>({
    Enabled: optional(stringBoolean),
    Html: optional(string),
  });

export const decodeAuth0TenantSessionCookieSettings =
  object<Auth0TenantSessionCookieSettings>({
    Mode: optional(text),
  });

export const decodeAuth0TenantSettingsProps = object<Auth0TenantSettingsProps>({
  AllowedLogoutUrls: optional(array(text)),
  ChangePassword: optional(decodeAuth0TenantChangePasswordSettings),
  DefaultAudience: maybe(string),
  DefaultDirectory: maybe(string),
  DefaultRedirectionUri: maybe(string),
  DeviceFlow: optional(decodeAuth0TenantDeviceFlowSettings),
  Domain: text,
  EnabledLocales: optional(array(text)),
  ErrorPage: optional(decodeAuth0TenantErrorPageSettings),
  Flags: optional(record(text, stringBoolean)),
  FriendlyName: optional(text),
  GuardianMfaPage: optional(decodeAuth0TenantGuardianMfaPageSettings),
  IdleSessionLifetime: optional(chain(normaliseNumber, isInt)),
  ManagementClientId: text,
  ManagementClientSecret: text,
  PictureUrl: optional(text),
  SandboxVersion: optional(text),
  SandboxVersionsAvailable: optional(array(text)),
  SessionCookie: optional(decodeAuth0TenantSessionCookieSettings),
  SessionLifetime: optional(chain(normaliseNumber, isInt)),
  SupportEmail: optional(text),
  SupportUrl: optional(text),
});

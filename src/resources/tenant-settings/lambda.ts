import { Auth0ResourceHandlerBase } from '../../internal/Auth0ResourceHandlerBase.js';
import { stripUndefined } from '../../internal/stripUndefined.js';
import {
  Auth0TenantSettingsProps,
  decodeAuth0TenantSettingsProps,
} from './Auth0TenantSettingsProps.js';

class Auth0TenantSettingsResourceHandler extends Auth0ResourceHandlerBase<Auth0TenantSettingsProps> {
  constructor() {
    super(decodeAuth0TenantSettingsProps);
  }

  protected override async createResource(): Promise<void> {
    await this.updateResource();
  }

  protected override async updateResource(): Promise<void> {
    const props = this.properties;

    await this.client.updateTenantSettings(
      stripUndefined({
        change_password:
          props.ChangePassword &&
          stripUndefined({
            enabled: props.ChangePassword.Enabled,
            html: props.ChangePassword.Html,
          }),
        device_flow:
          props.DeviceFlow &&
          stripUndefined({
            charset: props.DeviceFlow.Charset,
            mask: props.DeviceFlow.Mask,
          }),
        guardian_mfa_page:
          props.GuardianMfaPage &&
          stripUndefined({
            enabled: props.GuardianMfaPage.Enabled,
            html: props.GuardianMfaPage.Html,
          }),
        default_audience: props.DefaultAudience,
        default_directory: props.DefaultDirectory,
        error_page:
          props.ErrorPage &&
          stripUndefined({
            html: props.ErrorPage.Html,
            show_log_link: props.ErrorPage.ShowLogLink,
            url: props.ErrorPage.Url,
          }),
        flags: props.Flags && stripUndefined(props.Flags),
        friendly_name: props.FriendlyName,
        picture_url: props.PictureUrl,
        support_email: props.SupportEmail,
        support_url: props.SupportUrl,
        allowed_logout_urls: props.AllowedLogoutUrls,
        session_lifetime: props.SessionLifetime,
        idle_session_lifetime: props.IdleSessionLifetime,
        sandbox_version: props.SandboxVersion,
        default_redirection_uri: props.DefaultRedirectionUri,
        enabled_locales: props.EnabledLocales,
        session_cookie:
          props.SessionCookie &&
          stripUndefined({
            mode: props.SessionCookie.Mode,
          }),
      }),
    );
  }
}

export const tenantSettingsHandler =
  new Auth0TenantSettingsResourceHandler().getHandler();

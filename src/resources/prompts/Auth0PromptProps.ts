import { object, record, text } from '@fmtk/decoders';

/**
 * Defines the prompts to use for a given language and area.
 *
 * @see {@link https://auth0.com/docs/customize/universal-login-pages/customize-login-text-prompts | Customize New Universal Login Text Prompts}
 */
export interface Auth0PromptsProps {
  Domain: string;
  Language: string;
  ManagementClientId: string;
  ManagementClientSecret: string;
  Prompt: string;
  Values: Record<string, Record<string, string>>;
}

export const decodeAuth0PromptsProps = object<Auth0PromptsProps>({
  Domain: text,
  Language: text,
  Prompt: text,
  ManagementClientId: text,
  ManagementClientSecret: text,
  Values: record(text, record(text, text)),
});

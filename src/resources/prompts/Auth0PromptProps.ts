import { maybe, object, text } from '@fmtk/decoders';

export interface Auth0CustomPrompts {
  UsersValidation?: string;
}

export interface Auth0PromptsProps extends Auth0CustomPrompts {
  Domain: string;
  ManagementClientId: string;
  ManagementClientSecret: string;
}

export const decodeAuth0PromptsProps = object<Auth0PromptsProps>({
  Domain: text,
  ManagementClientId: text,
  ManagementClientSecret: text,
  UsersValidation: maybe(text),
});

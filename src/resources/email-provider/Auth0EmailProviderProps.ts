import {
  choose,
  Decoder,
  is,
  maybe,
  object,
  optional,
  string,
  text,
} from '@fmtk/decoders';
import { Auth0ManagementClientProps } from '../../common/Auth0ManagementClientProps.js';

export interface Auth0EmailProviderMailgun {
  Name: 'mailgun';
  ApiKey: string;
  Domain: string;
  Region?: string;
}

export interface Auth0EmailProviderMandrill {
  Name: 'mandrill';
  ApiKey: string;
}

export interface Auth0EmailProviderSES {
  Name: 'ses';
  AccessKeyId: string;
  ConfigurationSetName?: string;
  Region: string;
  SecretAccessKey: string;
}

export interface Auth0EmailProviderSparkpost {
  Name: 'sparkpost';
  ApiKey: string;
  Region?: string;
}

export type Auth0EmailProvider =
  | Auth0EmailProviderMailgun
  | Auth0EmailProviderMandrill
  | Auth0EmailProviderSES
  | Auth0EmailProviderSparkpost;

export interface Auth0EmailProviderProps extends Auth0ManagementClientProps {
  DefaultFromAddress?: string;
  Provider: Auth0EmailProvider;
}

export const decodeAuth0EmailProviderMailgun =
  object<Auth0EmailProviderMailgun>({
    Name: is('mailgun'),
    ApiKey: text,
    Domain: text,
    Region: maybe(string),
  });

export const decodeAuth0EmailProviderMandrill =
  object<Auth0EmailProviderMandrill>({
    Name: is('mandrill'),
    ApiKey: text,
  });

export const decodeAuth0EmailProviderSES = object<Auth0EmailProviderSES>({
  Name: is('ses'),
  AccessKeyId: text,
  ConfigurationSetName: optional(text),
  Region: text,
  SecretAccessKey: text,
});

export const decodeAuth0EmailProviderSparkpost =
  object<Auth0EmailProviderSparkpost>({
    Name: is('sparkpost'),
    ApiKey: text,
    Region: maybe(string),
  });

export const decodeAuth0EmailProvider: Decoder<Auth0EmailProvider> = choose(
  decodeAuth0EmailProviderMailgun,
  decodeAuth0EmailProviderMandrill,
  decodeAuth0EmailProviderSES,
  decodeAuth0EmailProviderSparkpost,
);

export const decodeAuth0EmailProviderProps = object<Auth0EmailProviderProps>({
  DefaultFromAddress: optional(text),
  Domain: text,
  ManagementClientId: text,
  ManagementClientSecret: text,
  Provider: decodeAuth0EmailProvider,
});

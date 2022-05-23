import { Fn } from '@squareball/cfntemplate';

export function getArnResource(arn: string): string {
  // arn is like
  // arn:aws:service:region:211174566182:resource
  return Fn.Select(5, Fn.Split(':', arn));
}

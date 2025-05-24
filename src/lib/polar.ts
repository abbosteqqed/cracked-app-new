import { Polar } from '@polar-sh/sdk';
import { env } from './config';

export const polar = new Polar({
	accessToken: env.POLAR_ACCESS_TOKEN!,
	server: env.POLAR_ACCESS as 'sandbox' | 'production',
});

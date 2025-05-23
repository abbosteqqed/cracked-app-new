import { Webhooks } from "@polar-sh/nextjs";
import { subscriptionActive } from "@/lib/polar-webhook/subscription-active";
import { customerCreated } from "@/lib/polar-webhook/customer-created";
import { checkoutUpdated } from "@/lib/polar-webhook/checkout-updated";
import { checkoutCreated } from "@/lib/polar-webhook/checkout-created";
import { env } from "@/lib/config";

export const POST = Webhooks({
	webhookSecret: env.POLAR_WEBHOOK_SECRET!,

	onCustomerCreated: async (payload) => {
		await customerCreated(payload.data);
	},
	onSubscriptionActive: async (payload) => {
		await subscriptionActive(payload.data);
	},
	onCheckoutUpdated: async (payload) => {
		await checkoutUpdated(payload.data);
	},
	onCheckoutCreated: async (payload) => {
		await checkoutCreated(payload.data);
	}
});

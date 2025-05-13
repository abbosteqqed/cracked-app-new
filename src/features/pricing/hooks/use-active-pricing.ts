import { useTransition } from "react";
import { cancelPricing } from "../actions/cancel-subscription";
import { toast } from "sonner";
import { unCancelPricing } from "../actions/uncancel-subscription";

export const useActivePricing = () => {
	const [isPending, startTransition] = useTransition();

	const handleCancel = async () => {
		startTransition(() => {
			cancelPricing()
				.then(() => {
					toast.success("Successfully cancelled.");
				})
				.catch((e) => {
					toast.error(e.message);
				});
		});
	};
	const handelUnCancel = async () => {
		startTransition(() => {
			unCancelPricing()
				.then(() => {
					toast.success("Successfully cancelled.");
				})
				.catch((e) => {
					toast.error(e.message);
				});
		});
	};

	return {
		isPending,
		handelUnCancel,
		handleCancel,
	};
};

import { useTransition } from "react";
import { cancelPricing } from "../actions/cancel-subscription";
import { toast } from "sonner";
import { unCancelPricing } from "../actions/uncancel-subscription";
import { usePathname } from "next/navigation";

export const useActivePricing = () => {
	const pathname = usePathname()
	const [isPending, startTransition] = useTransition();

	const handleCancel = async () => {
		startTransition(() => {
			cancelPricing(pathname)
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
			unCancelPricing(pathname)
				.then(() => {
					toast.success("Successfully reactivated.");
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

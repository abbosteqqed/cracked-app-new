import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { cancelPricing } from "../actions/cancel-subscription";
import { toast } from "sonner";
import { unCancelPricing } from "../actions/uncancel-subscription";

export const useActivePricing = () => {
	const [isPending, setIspending] = useState(false);
	const queryClient = useQueryClient();

	const { mutateAsync: cancel } = useMutation({
		mutationFn: cancelPricing,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["pricing"] });
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});
	const { mutateAsync: uncancel } = useMutation({
		mutationFn: unCancelPricing,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["pricing"] });
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	const handleCancel = async () => {
		setIspending(() => true);
		await cancel();
		setIspending(() => false);
	};
	const handelUnCancel = async () => {
		setIspending(() => true);
		await uncancel();
		setIspending(() => false);
	};

	return {
		isPending,
		handelUnCancel,
		handleCancel,
	};
};

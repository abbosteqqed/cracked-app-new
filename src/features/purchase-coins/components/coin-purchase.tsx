"use client";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import React, { useState, useTransition } from "react";
import { coinProducts } from "../constants/coin-products";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { purchaseCoins } from "../actions/purchase-coins";
import { toast } from "sonner";
import { PolarEmbedCheckout } from "@polar-sh/checkout/embed";

const CoinPurchase = () => {
	const [isPending, startTransition] = useTransition();
	const [selectedProduct, setSelectedProduct] = useState<string>(
		coinProducts[0].productId
	);
	const selectedProductDet = coinProducts.find(
		(item) => item.productId === selectedProduct
	);

	const handleBuyProducts = () => {
		startTransition(() => {
			purchaseCoins({ id: selectedProduct })
				.then((data) => {
					if (data.error) {
						toast.error(data.error);
					}
					if (data.url) {
						PolarEmbedCheckout.create(data.url, "dark");
					}
				})
				.catch(() =>
					toast.error("Something went wronlgy please check it later")
				);
		});
	};
	return (
		<div className="py-20 px-6">
			<div className="max-w-5xl mx-auto w-full bg-slate-3 border border-slate-6 p-6 rounded-2xl flex flex-col">
				<div className="flex flex-col max-w-xl w-full gap-2">
					<Label>Select the amount to buy</Label>
					<Select
						value={selectedProduct}
						onValueChange={(val) => setSelectedProduct(val)}>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Select credits to buy" />
						</SelectTrigger>
						<SelectContent>
							{coinProducts.map((product) => (
								<SelectItem
									key={product.productId}
									value={product.productId}>
									{product.coins} for ${product.cost}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div className="flex flex-col gap-2 mt-6">
					<Label>Your account will be charged</Label>
					<p>Your account will be charged ${selectedProductDet?.cost} + Tax</p>
				</div>
				<p className="mt-6 mb-10 block">
					Unused credits rollover to the next month.
				</p>
				<div className="w-full flex justify-end gap-4">
					<Link href="/app">
						<Button variant="outline">Cancel</Button>
					</Link>
					<Button
						type="button"
						disabled={isPending}
						onClick={handleBuyProducts}>
						{isPending ? "Buy Credits..." : "Buy Credits"}
					</Button>
				</div>
			</div>
		</div>
	);
};

export default CoinPurchase;

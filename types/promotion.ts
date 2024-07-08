export type PromotionType = {
  isMembership: boolean;
  discount: {
    discountPercentage?: number;
    discountPrice: number;
    discountType?: "PRICE" | "PERCENTAGE";
    originalPrice: number;
    totalDiscount: number;
  };
};

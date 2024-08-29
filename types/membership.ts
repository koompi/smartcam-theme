export type MembershipType = {
  id: string;
  label: string;
  availability?: number;
  code: string;
  description: string;
  discountPercentage: number;
  discountPrice: number;
  discountType: string;
  expiryDate: string;
  membershipType: string;
  startDate: string;
  status: "ACTIVE" | "SUSPENDED" | "EXPIRED" | "DELETED";
  storeId: string;
  thumbnail: string;
};

interface Address {
  id: string;
  houseNo: string;
  floorNo: string;
  addressTypeId: string;
  poBoxNo: string;
  streetNo: string;
  streetValue: string;
  zipCode: string;
  streetId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export type LocationType = {
  id: string;
  lat: number;
  lng: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  salutation: string;
  code: string;
  districtId: string;
  countryId: string;
  communeId: string;
  provinceId: string;
  createdAt: string;
  updatedAt: string;
  address: Address;
  photos: string[];
};

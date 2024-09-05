interface Address {
  photos: string[];
  id: string;
  addressName: string;
  label: string;
  zipCode: string;
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
  code: string;
  districtId: string;
  countryId: string;
  communeId: string;
  provinceId: string;
  createdAt: string;
  updatedAt: string;
  address: Address;
  handleDeleteLocation: (id: string) => void;
};

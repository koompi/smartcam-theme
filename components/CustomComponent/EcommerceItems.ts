import { Filter, FilterTypeEnum } from "./FilterWrapper";

const ecommerceItems: Filter[] = [
  {
    type: FilterTypeEnum.PriceRange,
    title: "Price Range",
    range: {
      min: 0,
      defaultValue: [100, 500],
      max: 2000,
      step: 1,
    },
  },

  {
    type: FilterTypeEnum.CheckboxGroup,
    title: "Brand",
    defaultOpen: true,
    options: [
      {
        title: "Accer",
        value: "acer",
      },
      {
        title: "Adata",
        value: "adata",
      },
      {
        title: "Apc",
        value: "apc",
      },
      {
        title: "Apple",
        value: "apple",
      },
      {
        title: "Asus",
        value: "asus",
      },
      {
        title: "Canon",
        value: "canon",
      },
      {
        title: "Dahua",
        value: "dahua",
      },
      {
        title: "Dell",
        value: "dell",
      },
      {
        title: "Epson",
        value: "epson",
      },
      {
        title: "Hikvision",
        value: "hikvision",
      },
      {
        title: "Hp",
        value: "hp",
      },
      {
        title: "Ion",
        value: "ion",
      },
      {
        title: "Lelnovo",
        value: "lenovo",
      },
      {
        title: "Meki",
        value: "meki",
      },
      {
        title: "Microsoft",
        value: "microsoft",
      },
      {
        title: "Prolink",
        value: "prolink",
      },
    ],
  },
  {
    type: FilterTypeEnum.CheckboxGroup,
    title: "Category",
    options: [
      {
        title: "Computer",
        value: "computer",
      },
      {
        title: "Printers",
        value: "Printers",
      },
      {
        title: "Projector",
        value: "projector",
      },
      {
        title: "Accessories",
        value: "accessories",
      },
    ],
  },
];

export default ecommerceItems;

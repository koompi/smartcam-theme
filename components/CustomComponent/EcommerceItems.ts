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
        title: "Addidas",
        value: "Addidas",
      },
      {
        title: "Converse",
        value: "Converse",
      },
      {
        title: "Puma",
        value: "Puma",
      },
      {
        title: "Mizuno",
        value: "Mizuno",
      },
      {
        title: "New Balance",
        value: "New Balance",
      },
      {
        title: "Nike",
        value: "Nike",
      },
    ],
    // options: [
    //   {
    //     title: "Accer",
    //     value: "acer",
    //   },
    //   {
    //     title: "Adata",
    //     value: "adata",
    //   },
    //   {
    //     title: "Apc",
    //     value: "apc",
    //   },
    //   {
    //     title: "Apple",
    //     value: "apple",
    //   },
    //   {
    //     title: "Asus",
    //     value: "asus",
    //   },
    //   {
    //     title: "Canon",
    //     value: "canon",
    //   },
    //   {
    //     title: "Dahua",
    //     value: "dahua",
    //   },
    //   {
    //     title: "Dell",
    //     value: "dell",
    //   },
    //   {
    //     title: "Epson",
    //     value: "epson",
    //   },
    //   {
    //     title: "Hikvision",
    //     value: "hikvision",
    //   },
    //   {
    //     title: "Hp",
    //     value: "hp",
    //   },
    //   {
    //     title: "Ion",
    //     value: "ion",
    //   },
    //   {
    //     title: "Lelnovo",
    //     value: "lenovo",
    //   },
    //   {
    //     title: "Meki",
    //     value: "meki",
    //   },
    //   {
    //     title: "Microsoft",
    //     value: "microsoft",
    //   },
    //   {
    //     title: "Prolink",
    //     value: "prolink",
    //   },
    // ],
  },
  {
    type: FilterTypeEnum.CheckboxGroup,
    title: "Category",
    options: [
      {
        title: "Men",
        value: "Men",
      },
      {
        title: "Women",
        value: "Women",
      },
      {
        title: "Kids",
        value: "Kids",
      },
      {
        title: "Sport",
        value: "Sport",
      },
    ],
  },
];

export default ecommerceItems;

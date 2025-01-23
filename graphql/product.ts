import { gql } from "@apollo/client";

export const GET_PRODUCT = gql`
  query ($slug: String!) {
    storeProduct(slug: $slug) {
      compare
      favorite
      product {
        id
        remark
        ownerId
        title
        thumbnail
        brand
        desc
        price
        slug
        rating
        previews
        status
        detail
        currency
        stocks {
          amount
          status
        }
        promotion {
          startPromotion
          promotionType
          promotionStatus
          endPromotion
          availability
        }
        category {
          id
          title {
            en
          }
          children {
            id
            title {
              en
            }
          }
        }
        subcategories {
          id
          title {
            en
          }
        }
        variants {
          id
          default
          attributes {
            type
            option
          }
          label
          previews
          price
        }
        createdAt
        updatedAt
        currencyPrice {
          khr
          usd
        }
        store {
          name
        }
      }
      promotion {
        discount {
          discountPercentage
          discountPrice
          discountType
          originalPrice
          totalDiscount
        }
        isMembership
      }
    }
  }
`;

export const GET_ALL_PRODUCTS = gql`
  query ($filter: OrderBy) {
    storeProducts(filter: $filter) {
      membershipCard {
        id
        label
        discountType
        discountPrice
        discountPercentage
        status
        membershipType
        description
      }
      products {
        product {
          remark
          id
          ownerId
          storeId
          title
          thumbnail
          brand
          desc
          price
          slug
          rating
          previews
          currency
          status
          detail
          stocks {
            amount
            status
          }
          variants {
            id
            default
            price
            previews
            attributes {
              type
              option
            }
            label
          }
          currencyPrice {
            khr
            usd
          }
        }
        promotion {
          isMembership
          discount {
            discountPercentage
            discountPrice
            discountType
            originalPrice
            totalDiscount
          }
        }
      }
    }
  }
`;

export const PRODUCTS = gql`
  query ($keyword: String, $id: [String!], $filter: OrderBy) {
    storeFilterSearchProducts(keyword: $keyword, id: $id, filter: $filter) {
      id
      remark
      ownerId
      storeId
      title
      thumbnail
      brand
      desc
      price
      slug
      rating
      previews
      currency
      status
      detail
      stocks {
        amount
        status
      }
      variants {
        id
        default
        price
        previews
        attributes {
          type
          option
        }
        label
      }
      currencyPrice {
        khr
        usd
      }
      createdAt
      updatedAt
    }
  }
`;

export const GLOBAL_PRODUCT_FILTERING = gql`
  query StoreGlobalFilterProducts(
    $tagId: [String!]
    $keyword: String
    $status: String
    $brand: [String!]
    $range: RangeProduct
    $filter: OrderBy
  ) {
    storeGlobalFilterProducts(
      id: $tagId
      keyword: $keyword
      status: $status
      brand: $brand
      range: $range
      filter: $filter
    ) {
      products {
        compare
        favorite
        product {
          id
          remark
          createdAt
          thumbnail
          title
          brand
          price
          previews
          slug
          sell
          rating
          status
          desc
          stocks {
            amount
            status
          }
          category {
            id
            title {
              en
            }
            children {
              id
              title {
                en
              }
            }
          }
          subcategories {
            id
            title {
              en
            }
          }
          variants {
            default
            id
            label
            price
            attributes {
              type
              option
            }
            previews
          }
          currencyPrice {
            khr
            usd
          }
        }
        promotion {
          isMembership
          discount {
            discountPercentage
            discountPrice
            discountType
            originalPrice
            totalDiscount
          }
        }
      }
      total
      pages
    }
  }
`;

export const PROMOTIONS_BY_TYPE = gql`
  query ($promotionStatus: PromotionStatus!) {
    promotionSpecialOffer(promotionStatus: $promotionStatus) {
      products {
        promotion {
          isMembership
          discount {
            discountPercentage
            discountPrice
            discountType
            originalPrice
            promotionStatus
            totalDiscount
          }
        }
        favorite
        compare
        product {
          id
          ownerId
          title
          thumbnail
          brand
          desc
          price
          slug
          rating
          previews
          status
          detail
          promotion {
            discountType
            startPromotion
            endPromotion
          }
          currencyPrice {
            khr
            usd
          }
          currency
          stocks {
            amount
            status
          }
          category {
            id
            title {
              en
            }
            children {
              id
              title {
                en
              }
            }
          }
          subcategories {
            id
            title {
              en
            }
          }
          variants {
            id
            default
            attributes {
              type
              option
            }
            label
            previews
            price
          }
          createdAt
          updatedAt
          currencyPrice {
            khr
            usd
          }
          store {
            name
          }
        }
      }
    }
  }
`;

export const PROMOTIONS_BY_SPECIAL_SAVING = gql`
  query SpecialSaving {
    specialSaving {
      products {
        promotion {
          isMembership
          discount {
            discountPercentage
            discountPrice
            discountType
            originalPrice
            promotionStatus
            totalDiscount
          }
        }
        product {
          remark
          id
          ownerId
          title
          thumbnail
          brand
          desc
          price
          slug
          rating
          previews
          status
          detail
          currencyPrice {
            khr
            usd
          }
          currency
          stocks {
            amount
            status
          }
          category {
            id
            title {
              en
            }
            children {
              id
              title {
                en
              }
            }
          }
          subcategories {
            id
            title {
              en
            }
          }
          variants {
            id
            default
            attributes {
              type
              option
            }
            label
            previews
            price
          }
          createdAt
          updatedAt
          currencyPrice {
            khr
            usd
          }
          store {
            name
          }
        }
      }
    }
  }
`;

export const PRODUCT_SECTION_TYPE = gql`
  query StoreSortProducts(
    $statusType: ProductSort!
    $category: String
    $filter: OrderBy
    $membershipId: String
  ) {
    storeSortProducts(
      statusType: $statusType
      category: $category
      filter: $filter
      membershipId: $membershipId
    ) {
      products {
        compare
        favorite
        product {
          remark
          id
          createdAt
          thumbnail
          title
          brand
          price
          previews
          slug
          sell
          rating
          status
          desc
          stocks {
            amount
            status
          }
          category {
            id
            title {
              en
            }
            children {
              id
              title {
                en
              }
            }
          }
          subcategories {
            id
            title {
              en
            }
          }
          variants {
            default
            id
            label
            price
            attributes {
              type
              option
            }
            previews
          }
          currencyPrice {
            khr
            usd
          }
        }
        promotion {
          isMembership
          discount {
            discountPercentage
            discountPrice
            discountType
            originalPrice
            totalDiscount
          }
        }
      }
    }
  }
`;

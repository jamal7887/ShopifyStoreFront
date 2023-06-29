const productquery = `
    {
      products(first: 5) {
        edges {
          node {
            id
            title
            description
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  originalSrc
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                }
              }
            }
          }
        }
      }
    }
  `;

async function fetchthings(query) {
  try {
    const response = await fetch(
      "https://jamalssuperawesomestore.myshopify.com//api/graphql",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token":
            "55a0e74ebd8990fee70be5405340cd1c",
        },
        body: JSON.stringify({ query }),
      }
    );

    console.log("test");
    const data = await response.json();
    // console.log("data:", data.data.products);
    return data;
  } catch (error) {
    console.error(error);
  }
}

let productsData = await fetchthings(productquery);
let products = await productsData.data.products.edges;

export default await products;
export { fetchthings };

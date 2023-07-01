import { fetchthings } from "./fetch.js";

const checkout = async (ProductList) => {
  let products = ProductList.map(
    (item) => `{variantId:"${item.variantId}", quantity: ${item.quantity}}`
  ).join(", ");
  let checkoutMutation = `
      mutation {
        checkoutCreate(input: {lineItems: [${products}]}) {
          checkout {
            webUrl
          }
        }
      }
    `;
  let checkoutResponse = await fetchthings(checkoutMutation);
  let url = checkoutResponse.data.checkoutCreate.checkout.webUrl;
  window.location.replace(url);
};

const addtocart = async (
  productList,
  variantId,
  name,
  price,
  image,
  quantity
) => {
  additem(productList, variantId, name, price, image, quantity);
  sessionStorage.setItem("items", JSON.stringify(productList));
  console.log(productList);
};

function additem(array, variantId, name, price, image, quantity) {
  if (array.length === 0) {
    array.push({ variantId, quantity, name, price, image });
  } else {
    const existingItem = array.find((item) => item.variantId === variantId);
    if (existingItem) {
      let total = parseInt(existingItem.quantity) + parseInt(quantity);
      existingItem.quantity = total;
    } else {
      array.push({ variantId, quantity: quantity, name, price, image });
    }
  }
}

export { checkout, addtocart };

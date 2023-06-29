<script>
  import { onMount } from "svelte";
  export let data;

  import { fetchthings } from "../data/fetch";
  let variantId = data.variants.edges[0].node.id;
  console.log(variantId);

  let productArray = [];

  onMount(() => {
    productArray = JSON.parse(sessionStorage.getItem("items")) || [];
  });

  console.log(variantId);

  const checkout = async () => {
    loadingcheckout = true;
    let products = productArray
      .map(item => `{variantId:"${item.variantId}", quantity: ${item.quantity}}`)
      .join(", ");
    let checkoutMutation = `
      mutation {
        checkoutCreate(input: {lineItems: [${products}]}) {
          checkout {
            webUrl
          }
        }
      }
    `;
    console.log(checkoutMutation);
    let checkoutResponse = await fetchthings(checkoutMutation);
    let url = checkoutResponse.data.checkoutCreate.checkout.webUrl;

    window.location.replace(url);
  };

  const addtocart = async () => {
    loadingCart = true;
    if (productArray.length === 0) {
      productArray.push({ variantId, quantity: 1 });
    } else {
      const existingItem = productArray.find(item => item.variantId === variantId);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        productArray.push({ variantId, quantity: 1 });
      }
    }
    sessionStorage.setItem("items", JSON.stringify(productArray));
    setTimeout(() => {
      loadingCart = false;
    }, 300);
  };

  let loadingcheckout = false;
  let loadingCart = false;

  console.log(productArray);
</script>

<div
  class="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-4 font-['Inter'] px-4 py-10"
>
  <div class="flex items-center justify-center flex-col">
    <div class="lg:w-9/12 sm:w-11/12 max-h-[500px] overflow-hidden rounded-md">
      <div class="flex justify-start w-full">
        <a href=".." class="text-blue-700 pb-3">
          <i class="fa-sharp fa-solid fa-arrow-left" />
          Go back
        </a>
      </div>
      <img src={data.images.edges[0].node.originalSrc} alt="" class="" />
    </div>
  </div>

  <div class="space-y-5 flex justify-center flex-col">
    <h1 class="text-5xl font-bold">{data.title}</h1>
    <div>
      <p class="font-semibold text-lg pb-2">Description</p>
      <p class="">{data.description}</p>
    </div>
    <p class="text-xl font-semibold">
      ${data.priceRange.minVariantPrice.amount}
    </p>
    <div>
    <button
      class="px-6 py-2 bg-blue-600 text-white w-full md:w-fit font-bold hover:bg-blue-500 rounded-md"
      on:click={addtocart}
    >
    {#if loadingCart}
    <i class="fa-solid fa-spinner animate-spin"></i>
    {/if}
      add to cart
      
    </button>
    <button
      class="px-6 py-2 bg-red-600 text-white w-full md:w-fit font-bold hover:bg-red-500 rounded-md mt-2"
      on:click={checkout}
    >
    {#if loadingcheckout}
    <i class="fa-solid fa-spinner animate-spin"></i>
    {/if}
    checkout
    </button>
  </div>
  </div>
</div>

<script>
  export let data;
  import { onMount } from "svelte";
  import { addtocart } from "../data/Store_checkout.js";
  import  Carti from "./shoppingcart.svelte";
  import { writable } from "svelte/store";


  
  let variantId = data.variants.edges[0].node.id;
  let name = data.title;
  let price = data.priceRange.minVariantPrice.amount;
  let image = data.images.edges[0].node.originalSrc;

  let productArray = [];
  onMount(() => {
    productArray = JSON.parse(sessionStorage.getItem("items")) || [];
  });

  let loadingCart = false;
  let cartopen = writable(false);
  let cartvalue = false;
  let cartopenstart = cartopen.subscribe((value) => {
    cartvalue = value;
  });

  const addToCartClicked = () => {
    loadingCart = true;
    addtocart(productArray,variantId, name, price, image);
    setTimeout(() => {
      loadingCart = false;
    }, 200);
    // console.log(cartopen);
    cartopen.set(true);
  };

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
    <div class="text-sm md:w-11/12 md:text-base">
      <p class="">{data.description}</p>
    </div>
    <p class="text-xl font-semibold">
      ${data.priceRange.minVariantPrice.amount}
    </p>
    <div>
    <button
      class="px-6 py-2 bg-blue-600 text-white w-full md:w-fit font-bold hover:bg-blue-500 rounded-md"
      on:click={addToCartClicked}
    >
    {#if loadingCart}
    <i class="fa-solid fa-spinner animate-spin"></i>
    {/if}
      Add to cart
    </button>
  </div>
  </div>
</div>

{#if cartvalue === true}
<Carti cartopen={cartopen}/>
{/if}
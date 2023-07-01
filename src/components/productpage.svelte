<script>
  export let data;
  import { onMount } from "svelte";
  import { addtocart } from "../data/Store_checkout.js";
  import Carti from "./shoppingcart.svelte";
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
  cartopen.subscribe((value) => {
    cartvalue = value;
  });

  let count = 1;
  const addToCartClicked = () => {
    let currentValue = parseInt(document.querySelector("input").value);

    if (currentValue < 1) {
      currentValue = 1;
    } else if (currentValue > 9999) {
      currentValue = 9999;
    }

    loadingCart = true;
    addtocart(productArray, variantId, name, price, image, currentValue);
    console.log(currentValue);
    setTimeout(() => {
      loadingCart = false;
    }, 200);
    cartopen.set(true);
  };
  const increment = () => {
    let currentValue = document.querySelector("input").value;
    count = parseInt(currentValue) + 1;
  };
  const decrement = () => {
    let currentValue = document.querySelector("input").value;
    if (count > 1) {
      count = parseInt(currentValue) - 1;
    }
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
      <div class="flex sm:items-end space-y-3 sm:space-y-0 sm:space-x-3 flex-col sm:flex-row">
        <div class="h-fit w-full sm:w-32">
          <label
            for="custom-input-number"
            class="w-full text-gray-700 text-sm font-semibold"
            >Quantity
          </label>
          <div class="h-fit">
            <div
              class="flex flex-row h-10 w-full rounded-lg bg-transparent mt-1"
            >
              <button
                data-action="decrement"
                class=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                on:click={decrement}
              >
                <span class="m-auto text-2xl font-thin">-</span>
              </button>
              <input
                type="number"
                class="focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black md:text-basecursor-default flex items-center text-gray-700 outline-none"
                name="custom-input-number"
                value={count}
              />
              <button
                data-action="increment"
                class="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                on:click={increment}
              >
                <span class="m-auto text-2xl font-thin">+</span>
              </button>
            </div>
          </div>
        </div>

        <button
          class="px-6 py-2 bg-blue-600 text-white w-full sm:w-fit h-fit font-bold hover:bg-blue-500 rounded-md"
          on:click={addToCartClicked}
        >
          {#if loadingCart}
            <i class="fa-solid fa-spinner animate-spin" />
          {/if}
          Add to cart
        </button>
      </div>
    </div>
  </div>
</div>

{#if cartvalue === true}
  <Carti {cartopen} />
{/if}
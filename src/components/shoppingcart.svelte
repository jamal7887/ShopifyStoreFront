<script>
  import { onMount } from "svelte";
  import { checkout } from "../data/Store_checkout.js";

  export let cartopen;
    let cartItems = [];
    onMount(() => {
        cartItems = JSON.parse(sessionStorage.getItem("items")) || [];
    });
    let loading = false;
    const checkoutClick = () => {
        loading = true;
        checkout(cartItems);
    }

</script>


<div class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 font-['Bebas Neue'] overflow-y-scroll ">
        <div class="absolute bg-white right-0 top-0 w-9/12 sm:w-9/12 md:w-5/12 px-5 min-h-full max-h-fit flex flex-col justify-between">
            <div>
            <div class="w-full flex justify-between border-b border-gray-400 pb-2 mb-2">
            
            <h1 class="text-3xl font-bold md:text-5xl">
                Your cart
            </h1>
            
            <button on:click={()=> {
               cartopen.set(false);
            }}>
                <i class="fa-solid fa-solid fa-times text-4xl text-gray-500 hover:text-gray-700"></i>
            </button>
        </div>
            
            <p class="text-gray-500 md:text-lg border-b pb-5 border-gray-100">
                Products
            </p>
            {#each cartItems as item}
            <div class="flex space-x-3 py-5">
                <img src={item.image} alt="" class="w-24 rounded-md md:w-36">
                <div class="space-y-1">
                    <h1 class="text-2xl font-bold md:text-3xl">
                        {item.name}
                    </h1>
                    <p class="text-gray-500 text-lg">
                        ${item.price}
                    </p>
                    <p class="text-gray-500 text-lg">
                        Quantity: {item.quantity}
                    </p>
                </div>
            </div>
            {/each}
        </div>
        <button class="bg-blue-600 py-6 text-white rounded-sm mb-4 w-full text-2xl font-bold" on:click={
            checkoutClick
        }>
        {#if loading}
        <i class="fa-solid fa-solid fa-spinner animate-spin"></i>
        {/if}
            Checkout
        </button>
        </div>
</div>
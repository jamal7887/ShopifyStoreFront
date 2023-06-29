import { writable } from "svelte/store";
import { onMount } from "svelte";

let sessionitems = undefined;
sessionitems = JSON.parse(sessionStorage.getItem("items"));
export const items = writable(
  sessionitems || [
    { variantId: "gid://shopify/ProductVariant/45473508753691", quantity: 1 },
  ]
);

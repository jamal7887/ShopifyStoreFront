<script>
import products from "../data/fetch.js";
</script>



<div class="mx-auto max-w-2xl px-4 py-16 sm:py-24 lg:max-w-7xl">
  <h2 class="text-2xl font-bold tracking-tight text-gray-900 pb-6">
    Featured Products
  </h2>
  <div
    class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8"
  >
    {#each products as product}
        <div class="group relative">
          <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
            <img
              src={product.node.images.edges[0].node.originalSrc}
              class="h-full w-full object-cover object-center"
              alt="Something"
            />
          </div>
          <div class="mt-4 flex justify-between">
            <div>
              <h3 class="text-sm text-gray-700">
                <a href={"../products/" + product.node.title}>
                  <span aria-hidden="true" class="absolute inset-0" />
                  {product.node.title}
                </a>
              </h3>
            </div>
            <p class="text-sm font-medium text-gray-900">
              ${product.node.priceRange.minVariantPrice.amount}
            </p>
          </div>
        </div>
    {/each}
  </div>
</div>

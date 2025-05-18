<script setup lang="ts">
const props = defineProps<{
  products: any[]
  sortBy: string
  sortOrder: string
}>()

const emit = defineEmits(['select-product', 'sort'])

const handleSelectProduct = (product: any) => {
  emit('select-product', product)
}

const handleSort = (field: string) => {
  emit('sort', field)
  
}

const getSortIcon = (column: string) => {
  if (props.sortBy !== column) {
    return 'M7 16V4m0 0L3 8m4-4l4 4'
  }
  
  return props.sortOrder === 'asc'
    ? 'M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12'
    : 'M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4'
}

const getStockStatusClass = (stock: number, minStock: number) => {
  if (stock === 0) return 'bg-error-100 text-error-800'
  if (stock <= minStock) return 'bg-warning-100 text-warning-800'
  return 'bg-accent-100 text-accent-800'
}

const getStockStatusText = (stock: number, minStock: number) => {
  if (stock === 0) return 'Out of Stock'
  if (stock <= minStock) return 'Low Stock'
  return 'In Stock'
}
</script>

<template>
  <div class="overflow-x-auto -mx-4 sm:-mx-6">
    <table class="min-w-full divide-y divide-neutral-200">
      <thead class="bg-neutral-50">
        <tr>
          <th 
            scope="col" 
            @click="handleSort('name')"
            class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer"
          >
            <div class="flex items-center">
              Product
              <svg class="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getSortIcon('name')" />
              </svg>
            </div>
          </th>
          <th 
            scope="col" 
            @click="handleSort('sku')"
            class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer"
          >
            <div class="flex items-center">
              SKU
              <svg class="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getSortIcon('sku')" />
              </svg>
            </div>
          </th>
          <th 
            scope="col" 
            @click="handleSort('category')"
            class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer"
          >
            <div class="flex items-center">
              Category
              <svg class="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getSortIcon('category')" />
              </svg>
            </div>
          </th>
          <th 
            scope="col" 
            @click="handleSort('price')"
            class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer"
          >
            <div class="flex items-center">
              Price
              <svg class="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getSortIcon('price')" />
              </svg>
            </div>
          </th>
          <th 
            scope="col" 
            @click="handleSort('stock')"
            class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer"
          >
            <div class="flex items-center">
              Stock
              <svg class="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getSortIcon('stock')" />
              </svg>
            </div>
          </th>
          <th 
            scope="col" 
            class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider"
          >
            Status
          </th>
          <th scope="col" class="relative px-6 py-3">
            <span class="sr-only">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-neutral-200">
        <tr v-for="product in products" :key="product.id" class="hover:bg-neutral-50">
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex items-center">
              <div class="flex-shrink-0 h-10 w-10 bg-neutral-200 rounded">
                <img v-if="product.image" :src="product.image" :alt="product.name" class="h-10 w-10 rounded object-cover" />
                <div v-else class="h-10 w-10 flex items-center justify-center text-neutral-500 rounded">
                  <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <div class="text-sm font-medium text-neutral-900">
                  {{ product.name }}
                </div>
              </div>
            </div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-neutral-900">{{ product.sku || '-' }}</div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-neutral-500">{{ product.category }}</div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-neutral-900">${{ product.price.toFixed(2) }}</div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm font-medium" :class="product.stock <= product.minStock ? 'text-warning-600' : 'text-neutral-900'">
              {{ product.stock }}
              <span v-if="product.minStock && product.stock <= product.minStock" class="ml-1 text-xs">
                (Min: {{ product.minStock }})
              </span>
            </div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <span :class="[
              'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
              getStockStatusClass(product.stock, product.minStock || 10)
            ]">
              {{ getStockStatusText(product.stock, product.minStock || 10) }}
            </span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <button 
              @click="handleSelectProduct(product)"
              class="text-primary-600 hover:text-primary-900">
              Edit
            </button>
          </td>
        </tr>
        <tr v-if="products.length === 0">
          <td colspan="7" class="px-6 py-4 text-center text-sm text-neutral-500">
            No products found matching your criteria.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import InventoryTable from '../components/inventory/InventoryTable.vue'
import InventoryFilter from '../components/inventory/InventoryFilter.vue'
import InventoryDetail from '../components/inventory/InventoryDetail.vue'
import { useInventoryStore } from '../stores/inventoryStore'
import { Product } from '../stores/inventoryStore'

const inventoryStore = useInventoryStore()
const isLoading = ref(true)
const selectedProduct = ref(null)
const searchQuery = ref('')
const categoryFilter = ref('all')
const stockFilter = ref('all')
// const sortBy = ref('name')
const sortBy = ref<keyof Product>('name') 

// const sortOrder = ref('asc')
const sortOrder = ref<'asc' | 'desc'>('asc') 


onMounted(async () => {
  await inventoryStore.fetchInventoryData()
  isLoading.value = false
})

const handleProductSelect = (product: any) => {
  selectedProduct.value = product
}

const handleUpdateProduct = (updatedProduct: any) => {
  inventoryStore.updateProduct(updatedProduct)
  selectedProduct.value = null
}

const closeDetail = () => {
  selectedProduct.value = null
}

const handleSearch = (query: string) => {
  searchQuery.value = query
}

const handleCategoryChange = (category: string) => {
  categoryFilter.value = category
}

const handleStockChange = (stock: string) => {
  stockFilter.value = stock
}

const handleSort = (field: keyof Product) => {
  if (sortBy.value === field) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortBy.value = field
    sortOrder.value = 'asc'
  }
}
const filteredProducts = computed(() => {
  return inventoryStore.getFilteredProducts(
    searchQuery.value,
    categoryFilter.value,
    stockFilter.value,
    sortBy.value,
    sortOrder.value
  )
})

const categories = computed(() => inventoryStore.categories)
</script>

<template>
  <div>
    <div v-if="isLoading" class="h-full flex items-center justify-center">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
    </div>
    
    <div v-else>
      <div v-if="inventoryStore.lowStockCount > 0" class="bg-warning-50 border-l-4 border-warning-500 p-4 mb-6 rounded-md">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-warning-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-warning-700">
              {{ inventoryStore.lowStockCount }} {{ inventoryStore.lowStockCount === 1 ? 'product is' : 'products are' }} running low on stock. 
              <a href="#" class="font-medium underline text-warning-700 hover:text-warning-600">
                Review now
              </a>
            </p>
          </div>
        </div>
      </div>
      
      <div class="card mb-6">
        <InventoryFilter 
          :search-query="searchQuery"
          :category-filter="categoryFilter"
          :stock-filter="stockFilter"
          :categories="categories"
          @search="handleSearch"
          @category-change="handleCategoryChange"
          @stock-change="handleStockChange"
        />
      </div>
      
      <div class="card mb-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-medium text-neutral-800">Inventory ({{ filteredProducts.length }} products)</h2>
        </div>
        <InventoryTable 
          :products="filteredProducts" 
          sort-by="sortBy"
          :sort-order="sortOrder"
          @select-product="handleProductSelect"
          @sort="handleSort"
        />
      </div>
    </div>
    
    <InventoryDetail 
      v-if="selectedProduct" 
      :product="selectedProduct"
      @close="closeDetail"
      @update="handleUpdateProduct"
    />
  </div>
</template>
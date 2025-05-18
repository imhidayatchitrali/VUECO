<script setup lang="ts">
const { 
  searchQuery, 
  categoryFilter, 
  stockFilter, 
  categories 
} = defineProps<{
  searchQuery: string
  categoryFilter: string
  stockFilter: string
  categories: string[]
}>()
// const props = defineProps<{
//   searchQuery: string
//   categoryFilter: string
//   stockFilter: string
//   categories: string[]
// }>()

const emit = defineEmits(['search', 'category-change', 'stock-change'])

const handleSearch = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('search', target.value)
}

const handleCategoryChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emit('category-change', target.value)
}

const handleStockChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emit('stock-change', target.value)
}
</script>

<template>
  <div class="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
    <div class="flex-1 relative">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg class="h-5 w-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        :value="searchQuery"
        @input="handleSearch"
        class="input pl-10"
        placeholder="Search products..."
      />
    </div>
    
    <div class="sm:w-48">
      <select 
        :value="categoryFilter"
        @change="handleCategoryChange"
        class="input"
      >
        <option value="all">All Categories</option>
        <option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>
    </div>
    
    <div class="sm:w-48">
      <select 
        :value="stockFilter"
        @change="handleStockChange"
        class="input"
      >
        <option value="all">All Stock Levels</option>
        <option value="in-stock">In Stock</option>
        <option value="low-stock">Low Stock</option>
        <option value="out-of-stock">Out of Stock</option>
      </select>
    </div>
  </div>
</template>
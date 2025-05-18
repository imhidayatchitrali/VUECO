<script setup lang="ts">
defineProps<{
  products: Array<{
    id: string;
    name: string;
    category: string;
    sales: number;
    stock: number;
    image?: string;
  }>;
}>();
</script>

<template>
  <div class="divide-y divide-neutral-200">
    <div v-for="(product, index) in products" :key="product.id" :class="['py-3', index === 0 ? 'pt-0' : '']">
      <div class="flex items-center">
        <div class="flex-shrink-0 h-10 w-10 bg-neutral-200 rounded">
          <img v-if="product.image" :src="product.image" :alt="product.name" class="h-10 w-10 rounded object-cover" />
          <div v-else class="h-10 w-10 flex items-center justify-center text-neutral-500">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        
        <div class="ml-4 flex-1">
          <div class="flex justify-between">
            <div>
              <h4 class="text-sm font-medium text-neutral-900">{{ product.name }}</h4>
              <p class="text-xs text-neutral-500">{{ product.category }}</p>
            </div>
            
            <div class="text-right">
              <p class="text-sm font-medium text-neutral-900">${{ product.sales.toLocaleString() }}</p>
              <p :class="[
                'text-xs', 
                product.stock <= 10 ? 'text-error-600' : 'text-neutral-500'
              ]">
                {{ product.stock }} in stock
              </p>
            </div>
          </div>
          
          <div class="mt-1 w-full bg-neutral-200 rounded-full h-1.5">
            <div 
              class="bg-primary-500 h-1.5 rounded-full" 
              :style="{ width: `${Math.min(product.stock * 2, 100)}%` }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
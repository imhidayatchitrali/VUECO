<script setup lang="ts">
import { ref, computed } from 'vue'
import { useInventoryStore } from '../stores/inventoryStore'

const inventoryStore = useInventoryStore()

const product = ref({
  name: '',
  description: '',
  price: '',
  stock: '',
  category: '',
  // image: null,
  sku: '',
  image: File,  

  cost: '',
  minStock: '',
  supplier: '',
  dimensions: {
    width: '',
    height: '',
    depth: '',
    weight: ''
  }
})

interface FormErrors {
  name?: string
  category?: string
  price?: string
  stock?: string
}

const showAdvanced = ref(false)
const isSubmitting = ref(false)
const showSuccess = ref(false)
const imagePreview = ref('')
// const errors = ref({})
const errors = ref<FormErrors>({})

const categories = computed(() => inventoryStore.categories)

const toggleAdvanced = () => {
  showAdvanced.value = !showAdvanced.value
}

const handleImageChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    const file = target.files[0]
    // product.value.image = file
    imagePreview.value = URL.createObjectURL(file)
  }
}

const validateForm = () => {
  const newErrors: Record<string, string> = {}
  
  if (!product.value.name.trim()) {
    newErrors.name = 'Product name is required'
  }
  
  if (!product.value.category) {
    newErrors.category = 'Category is required'
  }
  
  if (!product.value.price || isNaN(Number(product.value.price)) || Number(product.value.price) <= 0) {
    newErrors.price = 'Valid price is required'
  }
  
  if (!product.value.stock || isNaN(Number(product.value.stock)) || Number(product.value.stock) < 0) {
    newErrors.stock = 'Valid stock quantity is required'
  }
  
  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

const handleSubmit = async () => {
  if (!validateForm()) return
  
  isSubmitting.value = true
  
  try {
    const newProduct = {
      ...product.value,
      price: Number(product.value.price),
      stock: Number(product.value.stock),
      cost: product.value.cost ? Number(product.value.cost) : undefined,
      minStock: product.value.minStock ? Number(product.value.minStock) : undefined,
      id: Date.now().toString(), 
      createdAt: new Date().toISOString()
    }
    
    await inventoryStore.addProduct(newProduct)
    
    product.value = {
      name: '',
      description: '',
      price: '',
      stock: '',
      category: '',
      image: File,
      sku: '',
      cost: '',
      minStock: '',
      supplier: '',
      dimensions: {
        width: '',
        height: '',
        depth: '',
        weight: ''
      }
    }
    imagePreview.value = ''
    showSuccess.value = true
    
    setTimeout(() => {
      showSuccess.value = false
    }, 3000)
  } catch (error) {
    console.error('Error adding product:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div>
    <div class="card">
      <h2 class="text-xl font-medium text-neutral-800 mb-6">Add New Product</h2>
      
      <div v-if="showSuccess" class="mb-6 bg-accent-50 border-l-4 border-accent-500 p-4 rounded-md">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-accent-700">
              Product has been successfully added to inventory!
            </p>
          </div>
        </div>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="label">Product Image</label>
            <div class="mt-1 flex items-center justify-center border-2 border-dashed border-neutral-300 rounded-md p-4 h-48 relative">
              <div v-if="!imagePreview" class="text-center">
                <svg class="mx-auto h-12 w-12 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p class="mt-1 text-sm text-neutral-500">
                  Drag and drop an image, or click to select
                </p>
              </div>
              <img v-else :src="imagePreview" alt="Product preview" class="h-full object-contain" />
              <input type="file" accept="image/*" @change="handleImageChange" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            </div>
          </div>
          
          <div class="space-y-6">
            <div>
              <label for="name" class="label">Product Name <span class="text-error-500">*</span></label>
              <input id="name" v-model="product.name" type="text" :class="['input', errors.name ? 'border-error-500' : '']" placeholder="Enter product name" />
              <p v-if="errors.name" class="mt-1 text-sm text-error-500">{{ errors.name }}</p>
            </div>
            
            <div>
              <label for="category" class="label">Category <span class="text-error-500">*</span></label>
              <select id="category" v-model="product.category" :class="['input', errors.category ? 'border-error-500' : '']">
                <option value="" disabled>Select a category</option>
                <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
              </select>
              <p v-if="errors.category" class="mt-1 text-sm text-error-500">{{ errors.category }}</p>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="price" class="label">Price ($) <span class="text-error-500">*</span></label>
                <input id="price" v-model="product.price" type="number" step="0.01" min="0" :class="['input', errors.price ? 'border-error-500' : '']" placeholder="0.00" />
                <p v-if="errors.price" class="mt-1 text-sm text-error-500">{{ errors.price }}</p>
              </div>
              <div>
                <label for="stock" class="label">Initial Stock <span class="text-error-500">*</span></label>
                <input id="stock" v-model="product.stock" type="number" min="0" :class="['input', errors.stock ? 'border-error-500' : '']" placeholder="0" />
                <p v-if="errors.stock" class="mt-1 text-sm text-error-500">{{ errors.stock }}</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <label for="description" class="label">Description</label>
          <textarea id="description" v-model="product.description" rows="3" class="input" placeholder="Enter product description"></textarea>
        </div>
      
        <div>
          <button type="button" @click="toggleAdvanced" class="text-sm text-primary-600 hover:text-primary-500 flex items-center">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path :d="showAdvanced ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
            </svg>
            {{ showAdvanced ? 'Hide' : 'Show' }} Advanced Options
          </button>
        </div>
      
        <div v-if="showAdvanced" class="space-y-6 border-t border-neutral-200 pt-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="sku" class="label">SKU</label>
              <input id="sku" v-model="product.sku" type="text" class="input" placeholder="SKU-12345" />
            </div>
            
            <div>
              <label for="supplier" class="label">Supplier</label>
              <input id="supplier" v-model="product.supplier" type="text" class="input" placeholder="Supplier name" />
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="cost" class="label">Cost Price ($)</label>
              <input id="cost" v-model="product.cost" type="number" step="0.01" min="0" class="input" placeholder="0.00" />
            </div>
            
            <div>
              <label for="minStock" class="label">Minimum Stock Level</label>
              <input id="minStock" v-model="product.minStock" type="number" min="0" class="input" placeholder="10" />
            </div>
          </div>
          
          <div>
            <label class="label">Dimensions</label>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <input v-model="product.dimensions.width" type="number" min="0" class="input" placeholder="Width (cm)" />
              </div>
              <div>
                <input v-model="product.dimensions.height" type="number" min="0" class="input" placeholder="Height (cm)" />
              </div>
              <div>
                <input v-model="product.dimensions.depth" type="number" min="0" class="input" placeholder="Depth (cm)" />
              </div>
              <div>
                <input v-model="product.dimensions.weight" type="number" min="0" class="input" placeholder="Weight (kg)" />
              </div>
            </div>
          </div>
        </div>
      
        <div class="flex justify-end space-x-3">
          <button type="button" class="btn bg-neutral-100 text-neutral-700 hover:bg-neutral-200">Cancel</button>
          <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
            <span v-if="isSubmitting" class="flex items-center">
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </span>
            <span v-else>Add Product</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
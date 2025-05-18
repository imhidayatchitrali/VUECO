<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  product: any
}>()

const emit = defineEmits(['close', 'update'])

const editedProduct = ref({ ...props.product })
const isSubmitting = ref(false)
// const errors = ref({})
interface FormErrors {
  name?: string;
  category?: string;
  price?: string;
  stock?: string;
}

const errors = ref<FormErrors>({});

watch(() => props.product, (newValue) => {
  editedProduct.value = { ...newValue }
}, { deep: true })

const validateForm = () => {
  const newErrors: Record<string, string> = {}
  
  if (!editedProduct.value.name.trim()) {
    newErrors.name = 'Product name is required'
  }
  
  if (!editedProduct.value.category) {
    newErrors.category = 'Category is required'
  }
  
  if (!editedProduct.value.price || isNaN(Number(editedProduct.value.price)) || Number(editedProduct.value.price) <= 0) {
    newErrors.price = 'Valid price is required'
  }
  
  if (editedProduct.value.stock === undefined || editedProduct.value.stock === null || 
      isNaN(Number(editedProduct.value.stock)) || Number(editedProduct.value.stock) < 0) {
    newErrors.stock = 'Valid stock quantity is required'
  }
  
  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

const handleClose = () => {
  emit('close')
}

const handleSubmit = () => {
  if (!validateForm()) return
  
  isSubmitting.value = true
  
  const updatedProduct = {
    ...editedProduct.value,
    price: Number(editedProduct.value.price),
    stock: Number(editedProduct.value.stock),
    minStock: editedProduct.value.minStock ? Number(editedProduct.value.minStock) : undefined,
    cost: editedProduct.value.cost ? Number(editedProduct.value.cost) : undefined
  }
  
  setTimeout(() => {
    emit('update', updatedProduct)
    isSubmitting.value = false
  }, 500)
}
</script>

<template>
  <div class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 bg-neutral-500 bg-opacity-75 transition-opacity" aria-hidden="true" @click="handleClose"></div>

      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
              <h3 class="text-lg leading-6 font-medium text-neutral-900" id="modal-title">
                Edit Product
              </h3>
              
              <div class="mt-4 space-y-4">
                <div>
                  <label for="edit-name" class="label">Product Name <span class="text-error-500">*</span></label>
                  <input 
                    id="edit-name" 
                    v-model="editedProduct.name" 
                    type="text" 
                    :class="['input', errors.name ? 'border-error-500' : '']" 
                  />
                  <p v-if="errors.name" class="mt-1 text-sm text-error-500">{{ errors.name }}</p>
                </div>
                
                <div>
                  <label for="edit-category" class="label">Category <span class="text-error-500">*</span></label>
                  <input 
                    id="edit-category" 
                    v-model="editedProduct.category" 
                    type="text" 
                    :class="['input', errors.category ? 'border-error-500' : '']" 
                  />
                  <p v-if="errors.category" class="mt-1 text-sm text-error-500">{{ errors.category }}</p>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label for="edit-price" class="label">Price ($) <span class="text-error-500">*</span></label>
                    <input 
                      id="edit-price" 
                      v-model="editedProduct.price" 
                      type="number" 
                      step="0.01" 
                      min="0" 
                      :class="['input', errors.price ? 'border-error-500' : '']" 
                    />
                    <p v-if="errors.price" class="mt-1 text-sm text-error-500">{{ errors.price }}</p>
                  </div>
                  
                  <div>
                    <label for="edit-stock" class="label">Stock <span class="text-error-500">*</span></label>
                    <input 
                      id="edit-stock" 
                      v-model="editedProduct.stock" 
                      type="number" 
                      min="0" 
                      :class="['input', errors.stock ? 'border-error-500' : '']" 
                    />
                    <p v-if="errors.stock" class="mt-1 text-sm text-error-500">{{ errors.stock }}</p>
                  </div>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label for="edit-sku" class="label">SKU</label>
                    <input id="edit-sku" v-model="editedProduct.sku" type="text" class="input" />
                  </div>
                  
                  <div>
                    <label for="edit-min-stock" class="label">Minimum Stock</label>
                    <input id="edit-min-stock" v-model="editedProduct.minStock" type="number" min="0" class="input" />
                  </div>
                </div>
                
                <div>
                  <label for="edit-description" class="label">Description</label>
                  <textarea id="edit-description" v-model="editedProduct.description" rows="3" class="input"></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bg-neutral-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button 
            type="button" 
            class="btn btn-primary sm:ml-3"
            @click="handleSubmit"
            :disabled="isSubmitting"
          >
            <span v-if="isSubmitting" class="flex items-center">
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </span>
            <span v-else>Save Changes</span>
          </button>
          <button 
            type="button" 
            class="btn bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-50 mt-3 sm:mt-0"
            @click="handleClose"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
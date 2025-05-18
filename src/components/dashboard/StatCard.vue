<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps<{
  title: string;
  value: number;
  icon: string;
  type: 'currency' | 'number' | 'percentage';
  trend?: 'up' | 'down' | 'neutral';
  percentage?: number;
  trendDirection?: 'positive' | 'negative' | 'neutral';
}>()

const formattedValue = computed(() => {
  if (props.type === 'currency') {
    return `$${props.value.toLocaleString()}`
  } else if (props.type === 'percentage') {
    return `${props.value}%`
  } else {
    return props.value.toLocaleString()
  }
})

const trendColor = computed(() => {
  if (props.trendDirection === 'negative') {
    return props.trend === 'up' ? 'text-error-500' : 'text-accent-500'
  } else {
    return props.trend === 'up' ? 'text-accent-500' : 'text-error-500'
  }
})

const trendIcon = computed(() => {
  return props.trend === 'up'
    ? 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
    : 'M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6'
})
</script>

<template>
  <div class="card hover:shadow-lg transition-shadow">
    <div class="flex justify-between items-start">
      <div>
        <h3 class="text-sm font-medium text-neutral-500">{{ title }}</h3>
        <p class="mt-1 text-2xl font-semibold text-neutral-900">{{ formattedValue }}</p>
        
        <div v-if="trend && percentage" class="mt-2 flex items-center">
          <span :class="[trendColor, 'flex items-center text-sm font-medium']">
            <svg class="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path :d="trendIcon" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
            </svg>
            {{ percentage }}%
          </span>
          <span class="text-xs ml-1 text-neutral-500">vs last period</span>
        </div>
      </div>
      
      <div class="bg-primary-100 p-3 rounded-full">
        <svg class="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path :d="icon" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
        </svg>
      </div>
    </div>
  </div>
</template>
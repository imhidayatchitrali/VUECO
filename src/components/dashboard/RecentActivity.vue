<script setup lang="ts">
import { formatDistanceToNow } from 'date-fns';

defineProps<{
  activities: Array<{
    id: string;
    type: 'order' | 'inventory' | 'product';
    description: string;
    timestamp: string;
    icon?: string;
  }>;
}>();

const getIcon = (type: string) => {
  switch (type) {
    case 'order':
      return {
        path: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
        bgColor: 'bg-primary-100',
        iconColor: 'text-primary-600'
      };
    case 'inventory':
      return {
        path: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
        bgColor: 'bg-warning-100',
        iconColor: 'text-warning-600'
      };
    case 'product':
      return {
        path: 'M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z',
        bgColor: 'bg-accent-100',
        iconColor: 'text-accent-600'
      };
    default:
      return {
        path: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
        bgColor: 'bg-neutral-100',
        iconColor: 'text-neutral-600'
      };
  }
};

const getTimeAgo = (timestamp: string) => {
  return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
};
</script>

<template>
  <div class="divide-y divide-neutral-200">
    <div v-for="(activity, index) in activities" :key="activity.id" :class="['py-3', index === 0 ? 'pt-0' : '']">
      <div class="flex">
        <div class="flex-shrink-0">
          <div :class="[getIcon(activity.type).bgColor, 'h-8 w-8 rounded-full flex items-center justify-center']">
            <svg :class="[getIcon(activity.type).iconColor, 'w-4 h-4']" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path :d="getIcon(activity.type).path" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
            </svg>
          </div>
        </div>
        <div class="ml-3 flex-1">
          <p class="text-sm text-neutral-800">{{ activity.description }}</p>
          <p class="text-xs text-neutral-500">{{ getTimeAgo(activity.timestamp) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const props = defineProps<{
  data: any[]
  timeFrame: string
}>()

const chartCanvas = ref<HTMLCanvasElement | null>(null)
let chart: Chart | null = null

const createChart = () => {
  if (!Array.isArray(props.data)) {
    console.warn('Chart not created: props.data is not an array')
    return
  }
  const ctx = chartCanvas.value?.getContext('2d')
  if (!ctx) return

  if (chart) {
    chart.destroy()
  }

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: props.data.map(item => item.label),
      datasets: [
        {
          label: 'Revenue',
          data: props.data.map(item => item.revenue),
          borderColor: '#1976D2',
          backgroundColor: 'rgba(25, 118, 210, 0.1)',
          tension: 0.4,
          fill: true,
          pointBackgroundColor: '#1976D2',
          pointRadius: 4,
          pointHoverRadius: 6
        },
        {
          label: 'Orders',
          data: props.data.map(item => item.orders * 100), 
          borderColor: '#4CAF50',
          backgroundColor: 'transparent',
          tension: 0.4,
          borderDash: [5, 5],
          pointBackgroundColor: '#4CAF50',
          pointRadius: 4,
          pointHoverRadius: 6
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Revenue ($)'
          },
          ticks: {
            callback: function(value) {
              return '$' + value.toLocaleString()
            }
          }
        },
        y1: {
          position: 'right',
          beginAtZero: true,
          title: {
            display: true,
            text: 'Orders'
          },
          grid: {
            drawOnChartArea: false
          },
          ticks: {
            callback: function(value) {
              return (Number(value) / 100).toFixed(0)
            }
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      },
      interaction: {
        mode: 'index',
        intersect: false
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || ''
              if (label) {
                label += ': '
              }
              if (context.dataset.label === 'Revenue') {
                // label += '$' + context.raw.toLocaleString()
              } else {
                label += (Number(context.raw) / 100).toFixed(0)
              }
              return label
            }
          }
        }
      }
    }
  })
}

onMounted(() => {
  createChart()
})

watch(() => [props.data, props.timeFrame], () => {
  createChart()
}, { deep: true })
</script>

<template>
  <div class="h-64">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>
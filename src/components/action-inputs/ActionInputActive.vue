<script setup lang="ts">
import { DatabaseField } from '@/types/database'
import { Icon } from '@/types/icons'
import { onMounted } from 'vue'
import useActionStore from '@/stores/action'

// Props & Emits
const props = defineProps<{
  locked?: boolean
  default?: any
}>()

// Composables & Stores
const actionStore = useActionStore()

onMounted(() => {
  actionStore.record[DatabaseField.IS_ACTIVE] =
    actionStore.record[DatabaseField.IS_ACTIVE] ?? props.default
  actionStore.valid[DatabaseField.IS_ACTIVE] = true
})
</script>

<template>
  <QCard v-show="!locked">
    <QCardSection>
      <div class="text-h6 q-mb-md">
        Active
        <QIcon v-if="locked" :name="Icon.LOCK" color="warning" class="q-pb-xs" />
      </div>

      <div class="q-mb-md">
        Toggle whether this Child record is part of the current Active Workout. Do NOT edit this
        value unless you know what you are doing.
      </div>

      <QToggle :disable="locked" v-model="actionStore.record[DatabaseField.IS_ACTIVE]" />
    </QCardSection>
  </QCard>
</template>

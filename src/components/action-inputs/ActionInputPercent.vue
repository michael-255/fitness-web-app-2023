<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { DatabaseField } from '@/types/database'
import { Icon } from '@/types/icons'
import useActionStore from '@/stores/action'

// Props & Emits
defineProps<{
  locked?: boolean
}>()

// Composables & Stores
const actionStore = useActionStore()

// Data
const inputRef: Ref<any> = ref(null)

onMounted(() => {
  actionStore.record[DatabaseField.PERCENT] = actionStore.record[DatabaseField.PERCENT] ?? 0
  // This input defaults itself, so it should always be valid
  actionStore.valid[DatabaseField.PERCENT] = true
})

/**
 * Defaults the input if the current value is not valid.
 */
function defaultNonValidInput() {
  const val = actionStore.record[DatabaseField.PERCENT] ?? 0

  if (!(typeof val === 'number') || val < 0) {
    actionStore.record[DatabaseField.PERCENT] = 0
  } else if (val > 100) {
    actionStore.record[DatabaseField.PERCENT] = 100
  }
}
</script>

<template>
  <QCard v-show="!locked">
    <QCardSection>
      <div class="text-h6 q-mb-md">
        Percent
        <QIcon v-if="locked" :name="Icon.LOCK" color="warning" class="q-pb-xs" />
      </div>

      <div class="q-mb-md">Measurement value in percent.</div>

      <!-- Note: v-model.number for number types -->
      <QInput
        v-model.number="actionStore.record[DatabaseField.PERCENT]"
        ref="inputRef"
        label="Percent"
        :disable="locked"
        type="number"
        dense
        outlined
        color="primary"
        @blur="defaultNonValidInput()"
      />
    </QCardSection>
  </QCard>
</template>

<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { DatabaseField } from '@/types/database'
import { Icon } from '@/types/icons'
import useActionRecordStore from '@/stores/action-record'

// Props & Emits
defineProps<{
  locked?: boolean
}>()

// Composables & Stores
const actionRecordStore = useActionRecordStore()

// Data
const inputRef: Ref<any> = ref(null)

onMounted(() => {
  actionRecordStore.actionRecord[DatabaseField.HEART_BPM] =
    actionRecordStore.actionRecord[DatabaseField.HEART_BPM] ?? 0
  // This input defaults itself, so it should always be valid
  actionRecordStore.valid[DatabaseField.HEART_BPM] = true
})

/**
 * Defaults the input if the current value is not valid.
 */
function defaultNonValidInput() {
  const val = actionRecordStore.actionRecord[DatabaseField.HEART_BPM] ?? 0

  if (!(typeof val === 'number') || val < 0) {
    actionRecordStore.actionRecord[DatabaseField.HEART_BPM] = 0
  } else if (val > 400) {
    actionRecordStore.actionRecord[DatabaseField.HEART_BPM] = 400
  }
}
</script>

<template>
  <QCard v-show="!locked">
    <QCardSection>
      <div class="text-h6 q-mb-md">
        Heart BPM
        <QIcon v-if="locked" :name="Icon.LOCK" color="warning" class="q-pb-xs" />
      </div>

      <div class="q-mb-md">Measurement values for heart beats per minute.</div>

      <!-- Note: v-model.number for number types -->
      <QInput
        v-model.number="actionRecordStore.actionRecord[DatabaseField.HEART_BPM]"
        ref="inputRef"
        label="Heart BPM"
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

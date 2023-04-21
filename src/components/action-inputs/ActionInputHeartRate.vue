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
  actionStore.record[DatabaseField.HEART_RATE] = actionStore.record[DatabaseField.HEART_RATE] ?? [
    0, 0,
  ]
  actionStore.record[DatabaseField.HEART_RATE][0] =
    actionStore.record[DatabaseField.HEART_RATE][0] ?? 0
  actionStore.record[DatabaseField.HEART_RATE][1] =
    actionStore.record[DatabaseField.HEART_RATE][1] ?? 0
  // This input defaults itself, so it should always be valid
  actionStore.valid[DatabaseField.HEART_RATE] = true
})

/**
 * Defaults the input if the current value is not valid.
 */
function defaultNonValidInput() {
  const systolic = actionStore.record[DatabaseField.HEART_RATE][0] ?? 0
  const diastolic = actionStore.record[DatabaseField.HEART_RATE][1] ?? 0

  if (!(typeof systolic === 'number') || systolic < 0) {
    actionStore.record[DatabaseField.HEART_RATE][0] = 0
  } else if (systolic > 350) {
    actionStore.record[DatabaseField.HEART_RATE][0] = 350
  }

  if (!(typeof diastolic === 'number') || diastolic < 0) {
    actionStore.record[DatabaseField.HEART_RATE][1] = 0
  } else if (diastolic > 350) {
    actionStore.record[DatabaseField.HEART_RATE][1] = 350
  }
}
</script>

<template>
  <QCard v-show="!locked">
    <QCardSection>
      <div class="text-h6 q-mb-md">
        Heart Rate
        <QIcon v-if="locked" :name="Icon.LOCK" color="warning" class="q-pb-xs" />
      </div>

      <div class="q-mb-md">Measurement values for heart rate (systolic/diastolic).</div>

      <!-- Note: v-model.number for number types -->
      <QInput
        v-model.number="actionStore.record[DatabaseField.HEART_RATE][0]"
        ref="inputRef"
        label="Systolic"
        :disable="locked"
        type="number"
        dense
        outlined
        color="primary"
        @blur="defaultNonValidInput()"
      />
      <!-- Note: v-model.number for number types -->
      <QInput
        v-model.number="actionStore.record[DatabaseField.HEART_RATE][1]"
        ref="inputRef"
        label="Dystolic"
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

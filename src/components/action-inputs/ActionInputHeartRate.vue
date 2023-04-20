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
  actionRecordStore.actionRecord[DatabaseField.HEART_RATE] = actionRecordStore.actionRecord[
    DatabaseField.HEART_RATE
  ] ?? [0, 0]
  actionRecordStore.actionRecord[DatabaseField.HEART_RATE][0] =
    actionRecordStore.actionRecord[DatabaseField.HEART_RATE][0] ?? 0
  actionRecordStore.actionRecord[DatabaseField.HEART_RATE][1] =
    actionRecordStore.actionRecord[DatabaseField.HEART_RATE][1] ?? 0
  // This input defaults itself, so it should always be valid
  actionRecordStore.valid[DatabaseField.HEART_RATE] = true
})

/**
 * Defaults the input if the current value is not valid.
 */
function defaultNonValidInput() {
  const systolic = actionRecordStore.actionRecord[DatabaseField.HEART_RATE][0] ?? 0
  const diastolic = actionRecordStore.actionRecord[DatabaseField.HEART_RATE][1] ?? 0

  if (!(typeof systolic === 'number') || systolic < 0) {
    actionRecordStore.actionRecord[DatabaseField.HEART_RATE][0] = 0
  } else if (systolic > 350) {
    actionRecordStore.actionRecord[DatabaseField.HEART_RATE][0] = 350
  }

  if (!(typeof diastolic === 'number') || diastolic < 0) {
    actionRecordStore.actionRecord[DatabaseField.HEART_RATE][1] = 0
  } else if (diastolic > 350) {
    actionRecordStore.actionRecord[DatabaseField.HEART_RATE][1] = 350
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
        v-model.number="actionRecordStore.actionRecord[DatabaseField.HEART_RATE][0]"
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
        v-model.number="actionRecordStore.actionRecord[DatabaseField.HEART_RATE][1]"
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

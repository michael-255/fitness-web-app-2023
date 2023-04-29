<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { DatabaseField, MeasurementInput } from '@/types/database'
import { FieldDefault } from '@/services/Defaults'
import type { Optional } from '@/types/misc'
import useParentIdWatcher from '@/composables/useParentIdWatcher'
import useActionStore from '@/stores/action'

// Props & Emits
defineProps<{
  label: string
}>()

// Composables & Stores
const actionStore = useActionStore()
const { isVisible, previousRecord } = useParentIdWatcher(MeasurementInput.VITALS)

// Data
const inputRef: Ref<any> = ref(null)

onMounted(() => {
  actionStore.record[DatabaseField.VITALS] =
    actionStore.record[DatabaseField.VITALS] ?? FieldDefault[DatabaseField.VITALS]() // function call
})

/**
 * Temperature validation rule test for the template component.
 * @param val
 */
function temperatureRule() {
  return (val: Optional<number>) =>
    val === null ||
    val === undefined ||
    (val >= 0 && val <= 150) ||
    'If provided, temperature must be between 0 and 150'
}

/**
 * Heart rate validation rule test for the template component.
 * @param val
 */
function heartRateRule() {
  return (val: Optional<number>) =>
    val === null ||
    val === undefined ||
    (val >= 0 && val <= 250) ||
    'If provided, heart rate must be between 0 and 250'
}

/**
 * Heart rate validation rule test for the template component.
 * @param val
 */
function bloodOxygenRule() {
  return (val: Optional<number>) =>
    val === null ||
    val === undefined ||
    (val >= 0 && val <= 100) ||
    'If provided, blood oxygen must be between 0 and 100'
}

/**
 * Systolic blood pressure validation rule test for the template component.
 * @param val
 */
function systolicRule() {
  return (val: Optional<number>) =>
    val === null ||
    val === undefined ||
    (val >= 0 && val <= 100) ||
    'If provided, Systolic blood pressure must be between 0 and 300'
}

/**
 * Diastolic blood pressure validation rule test for the template component.
 * @param val
 */
function diastolicRule() {
  return (val: Optional<number>) =>
    val === null ||
    val === undefined ||
    (val >= 0 && val <= 100) ||
    'If provided, Diastolic blood pressure must be between 0 and 300'
}
</script>

<template>
  <QCard v-if="isVisible">
    <QCardSection>
      <div class="text-h6 q-mb-md">{{ label }}</div>

      <div class="q-mb-md">TODO</div>

      <div class="row q-gutter-sm q-mb-md">
        <div class="col-6">
          <!-- Note: v-model.number for number types -->
          <QInput
            v-model.number="actionStore.record[DatabaseField.VITALS][0]"
            ref="inputRef"
            :label="`Temperature (${previousRecord?.[DatabaseField.VITALS]?.[0] ?? '-'})`"
            :rules="[temperatureRule()]"
            type="number"
            dense
            outlined
            color="primary"
          />
        </div>
        <div class="text-h4">°F</div>
      </div>

      <div class="q-mb-md">TODO</div>

      <div class="row q-gutter-sm q-mb-md">
        <div class="col-6">
          <!-- Note: v-model.number for number types -->
          <QInput
            v-model.number="actionStore.record[DatabaseField.VITALS][1]"
            ref="inputRef"
            :label="`Heart Rate (${previousRecord?.[DatabaseField.VITALS]?.[1] ?? '-'})`"
            :rules="[heartRateRule()]"
            type="number"
            dense
            outlined
            color="primary"
          />
        </div>
        <div class="text-h4">bpm</div>
      </div>

      <div class="q-mb-md">TODO</div>

      <div class="row q-gutter-sm q-mb-md">
        <div class="col-6">
          <!-- Note: v-model.number for number types -->
          <QInput
            v-model.number="actionStore.record[DatabaseField.VITALS][2]"
            ref="inputRef"
            :label="`Blood Oxygen (${previousRecord?.[DatabaseField.VITALS]?.[2] ?? '-'})`"
            :rules="[bloodOxygenRule()]"
            type="number"
            dense
            outlined
            color="primary"
          />
        </div>
        <div class="text-h4">%</div>
      </div>

      <div class="q-mb-md">TODO</div>

      <div class="row q-gutter-sm">
        <div class="col">
          <!-- Note: v-model.number for number types -->
          <QInput
            v-model.number="actionStore.record[DatabaseField.VITALS][3]"
            ref="inputRef"
            :label="`Systolic (${previousRecord?.[DatabaseField.VITALS]?.[3] ?? '-'})`"
            :rules="[systolicRule()]"
            type="number"
            dense
            outlined
            color="primary"
          />
        </div>

        <div class="text-h4">/</div>

        <div class="col">
          <!-- Note: v-model.number for number types -->
          <QInput
            v-model.number="actionStore.record[DatabaseField.VITALS][4]"
            ref="inputRef"
            :label="`Diastolic (${previousRecord?.[DatabaseField.VITALS]?.[4] ?? '-'})`"
            :rules="[diastolicRule()]"
            type="number"
            dense
            outlined
            color="primary"
          />
        </div>
      </div>
    </QCardSection>
  </QCard>
</template>

<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { DatabaseField, MeasurementInput } from '@/types/database'
import { FieldDefault } from '@/services/Defaults'
import { Limit, type Optional } from '@/types/misc'
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
 * Formats text for the last recorded value.
 * @param label
 * @param actionRecordValue
 */
function lastRecordedValue(label: string, actionRecordValue: Optional<number>) {
  // TODO - Need to find the last recorded value from the database
  if (actionRecordValue) {
    return `${label} (${actionRecordValue})`
  } else {
    return label
  }
}

/**
 * Temperature validation rule for the template component.
 */
function temperatureRule() {
  return (val: Optional<number>) =>
    val === null ||
    val === undefined ||
    (val >= Limit.MIN_BODY_TEMP && val <= Limit.MAX_BODY_TEMP) ||
    `${Limit.MIN_BODY_TEMP}-${Limit.MAX_BODY_TEMP} or blank`
}

/**
 * Heart rate validation rule for the template component.
 */
function heartRateRule() {
  return (val: Optional<number>) =>
    val === null ||
    val === undefined ||
    (val >= Limit.MIN_HEART_RATE && val <= Limit.MAX_HEART_RATE) ||
    `${Limit.MIN_HEART_RATE}-${Limit.MAX_HEART_RATE} or blank`
}

/**
 * Heart rate validation rule for the template component.
 */
function bloodOxygenRule() {
  return (val: Optional<number>) =>
    val === null ||
    val === undefined ||
    (val >= Limit.MIN_PERCENTAGE && val <= Limit.MAX_PERCENTAGE) ||
    `${Limit.MIN_PERCENTAGE}-${Limit.MAX_PERCENTAGE} or blank`
}

/**
 * Systolic blood pressure validation rule for the template component.
 */
function systolicRule() {
  return (val: Optional<number>) =>
    val === null ||
    val === undefined ||
    (val >= Limit.MIN_BLOOD_PRESSURE && val <= Limit.MAX_BLOOD_PRESSURE) ||
    `${Limit.MIN_BLOOD_PRESSURE}-${Limit.MAX_BLOOD_PRESSURE} or blank`
}

/**
 * Diastolic blood pressure validation rule for the template component.
 */
function diastolicRule() {
  return (val: Optional<number>) =>
    val === null ||
    val === undefined ||
    (val >= Limit.MIN_BLOOD_PRESSURE && val <= Limit.MAX_BLOOD_PRESSURE) ||
    `${Limit.MIN_BLOOD_PRESSURE}-${Limit.MAX_BLOOD_PRESSURE} or blank`
}

/**
 * Ensures the values are set to null if the input is empty and integers if it is not.
 * @param actionStoreValue
 * @param index
 */
function cleanIntegerInputValue(actionStoreValue: Optional<number> | '', index: number) {
  if (actionStoreValue === null || actionStoreValue === undefined || actionStoreValue === '') {
    actionStore.record[DatabaseField.VITALS][index] = null
  } else {
    actionStore.record[DatabaseField.VITALS][index] = parseInt(actionStoreValue.toFixed(0))
  }
}

/**
 * Ensures the values are set to null if the input is empty and decimals if it is not.
 * @param actionStoreValue
 * @param index
 */
function cleanDecimalInputValue(actionStoreValue: Optional<number> | '', index: number) {
  if (actionStoreValue === null || actionStoreValue === undefined || actionStoreValue === '') {
    actionStore.record[DatabaseField.VITALS][index] = null
  } else {
    actionStore.record[DatabaseField.VITALS][index] = parseFloat(actionStoreValue.toFixed(2))
  }
}
</script>

<template>
  <QCard v-if="isVisible">
    <QCardSection>
      <div class="text-h6 q-mb-md">{{ label }}</div>

      <div class="q-mb-md">
        Track your temperature, heart rate, blood oxygen, and blood pressure. The last recorded
        value will be displayed to the right of the input. Inputs can be left blank if desired.
      </div>

      <div class="row q-gutter-sm q-mb-md">
        <div class="text-h6 q-pt-xs">Temperature</div>

        <div class="col-3">
          <!-- Note: v-model.number for number types -->
          <QInput
            v-model.number="actionStore.record[DatabaseField.VITALS][0]"
            ref="inputRef"
            label="°F"
            :rules="[temperatureRule()]"
            type="number"
            step="0.01"
            dense
            rounded
            outlined
            color="primary"
            @blur="cleanDecimalInputValue(actionStore.record[DatabaseField.VITALS][0], 0)"
          />
        </div>
        <div class="text-h6 q-pt-xs">← 98.6°F</div>
      </div>

      <div class="row q-gutter-sm q-mb-md">
        <div class="text-h6 q-pt-xs">Heart Rate</div>

        <div class="col-3">
          <!-- Note: v-model.number for number types -->
          <QInput
            v-model.number="actionStore.record[DatabaseField.VITALS][1]"
            ref="inputRef"
            label="bpm"
            :rules="[heartRateRule()]"
            type="number"
            step="1"
            dense
            rounded
            outlined
            color="primary"
            @blur="cleanIntegerInputValue(actionStore.record[DatabaseField.VITALS][1], 1)"
          />
        </div>
        <div class="text-h6 q-pt-xs">← 220 bpm</div>
      </div>

      <div class="row q-gutter-sm q-mb-md">
        <div class="text-h6 q-pt-xs">Blood Oxygen</div>

        <div class="col-3">
          <!-- Note: v-model.number for number types -->
          <QInput
            v-model.number="actionStore.record[DatabaseField.VITALS][2]"
            ref="inputRef"
            label="%"
            :rules="[bloodOxygenRule()]"
            type="number"
            step="1"
            dense
            rounded
            outlined
            color="primary"
            @blur="cleanIntegerInputValue(actionStore.record[DatabaseField.VITALS][2], 2)"
          />
        </div>
        <div class="text-h6 q-pt-xs">← 100%</div>
      </div>

      <div class="text-h6 q-mb-sm">Blood Pressure</div>

      <div class="row q-gutter-sm q-mb-md">
        <div class="col-3">
          <!-- Note: v-model.number for number types -->
          <QInput
            v-model.number="actionStore.record[DatabaseField.VITALS][3]"
            ref="inputRef"
            label="Systolic"
            :rules="[systolicRule()]"
            type="number"
            step="1"
            dense
            rounded
            outlined
            color="primary"
            @blur="cleanIntegerInputValue(actionStore.record[DatabaseField.VITALS][3], 3)"
          />
        </div>

        <div class="text-h4">/</div>

        <div class="col-3">
          <!-- Note: v-model.number for number types -->
          <QInput
            v-model.number="actionStore.record[DatabaseField.VITALS][4]"
            ref="inputRef"
            label="Diastolic"
            :rules="[diastolicRule()]"
            type="number"
            step="1"
            dense
            rounded
            outlined
            color="primary"
            @blur="cleanIntegerInputValue(actionStore.record[DatabaseField.VITALS][4], 4)"
          />
        </div>
        <div class="text-h6 q-pt-xs">← 360/360</div>
      </div>
    </QCardSection>
  </QCard>
</template>

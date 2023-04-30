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
 * Formats the previous temperature value for the input field based on the previous record value.
 */
function previousTemperature() {
  const previous = previousRecord.value?.[DatabaseField.VITALS]?.[0]

  if (previous) {
    return `← ${previous}°F`
  } else {
    return ''
  }
}

/**
 * Formats the previous heart rate value for the input field based on the previous record value.
 */
function previousHeartRate() {
  const previous = previousRecord.value?.[DatabaseField.VITALS]?.[1]

  if (previous) {
    return `← ${previous} bpm`
  } else {
    return ''
  }
}

/**
 * Formats the previous blood oxygen value for the input field based on the previous record value.
 */
function previousBloodOxygen() {
  const previous = previousRecord.value?.[DatabaseField.VITALS]?.[2]

  if (previous) {
    return `← ${previous}%`
  } else {
    return ''
  }
}

/**
 * Formats the previous blood pressure value for the input field based on the previous record value.
 */
function previousBloodPressure() {
  const previousSystolic = previousRecord.value?.[DatabaseField.VITALS]?.[3]
  const previousDiastolic = previousRecord.value?.[DatabaseField.VITALS]?.[4]

  if (previousSystolic && previousDiastolic) {
    return `← ${previousSystolic}/${previousDiastolic}`
  } else {
    return ''
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
    (val >= Limit.MIN_BLOOD_PRESSURE &&
      val <= Limit.MAX_BLOOD_PRESSURE &&
      actionStore.record[DatabaseField.VITALS][4]) ||
    `${Limit.MIN_BLOOD_PRESSURE}-${Limit.MAX_BLOOD_PRESSURE} with diastolic, or blank`
}

/**
 * Diastolic blood pressure validation rule for the template component.
 */
function diastolicRule() {
  return (val: Optional<number>) =>
    val === null ||
    val === undefined ||
    (val >= Limit.MIN_BLOOD_PRESSURE &&
      val <= Limit.MAX_BLOOD_PRESSURE &&
      actionStore.record[DatabaseField.VITALS][3]) ||
    `${Limit.MIN_BLOOD_PRESSURE}-${Limit.MAX_BLOOD_PRESSURE} with systolic, or blank`
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

function cleanBloodPressureInputs() {
  const systolic = actionStore.record[DatabaseField.VITALS][3]
  const diastolic = actionStore.record[DatabaseField.VITALS][4]

  if (systolic === null || systolic === undefined || systolic === '') {
    actionStore.record[DatabaseField.VITALS][3] = null
  } else {
    actionStore.record[DatabaseField.VITALS][3] = parseInt(systolic.toFixed(0))
  }

  if (diastolic === null || diastolic === undefined || diastolic === '') {
    actionStore.record[DatabaseField.VITALS][4] = null
  } else {
    actionStore.record[DatabaseField.VITALS][4] = parseInt(diastolic.toFixed(0))
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
        <div class="text-h6 q-pt-xs">{{ previousTemperature() }}</div>
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
        <div class="text-h6 q-pt-xs">{{ previousHeartRate() }}</div>
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
        <div class="text-h6 q-pt-xs">{{ previousBloodOxygen() }}</div>
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
            @blur="cleanBloodPressureInputs()"
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
            @blur="cleanBloodPressureInputs()"
          />
        </div>
        <div class="text-h6 q-pt-xs">{{ previousBloodPressure() }}</div>
      </div>
    </QCardSection>
  </QCard>
</template>

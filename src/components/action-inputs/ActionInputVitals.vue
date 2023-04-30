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
 * Formats the label for the input field based on the previous record value.
 * @param label
 * @param actionRecordValue
 */
function previousLabel(label: string, actionRecordValue: Optional<number>) {
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
    `If provided, temperature must be between ${Limit.MIN_BODY_TEMP} and ${Limit.MAX_BODY_TEMP}`
}

/**
 * Heart rate validation rule for the template component.
 */
function heartRateRule() {
  return (val: Optional<number>) =>
    val === null ||
    val === undefined ||
    (val >= Limit.MIN_HEART_RATE && val <= Limit.MAX_HEART_RATE) ||
    `If provided, heart rate must be between ${Limit.MIN_HEART_RATE} and ${Limit.MAX_HEART_RATE}`
}

/**
 * Heart rate validation rule for the template component.
 */
function bloodOxygenRule() {
  return (val: Optional<number>) =>
    val === null ||
    val === undefined ||
    (val >= Limit.MIN_PERCENTAGE && val <= Limit.MAX_PERCENTAGE) ||
    `If provided, blood oxygen must be between ${Limit.MIN_PERCENTAGE} and ${Limit.MAX_PERCENTAGE}`
}

/**
 * Systolic blood pressure validation rule for the template component.
 */
function systolicRule() {
  return (val: Optional<number>) =>
    val === null ||
    val === undefined ||
    (val >= Limit.MIN_BLOOD_PRESSURE && val <= Limit.MAX_BLOOD_PRESSURE) ||
    `If provided, Systolic blood pressure must be between ${Limit.MIN_BLOOD_PRESSURE} and ${Limit.MAX_BLOOD_PRESSURE}}`
}

/**
 * Diastolic blood pressure validation rule for the template component.
 */
function diastolicRule() {
  return (val: Optional<number>) =>
    val === null ||
    val === undefined ||
    (val >= Limit.MIN_BLOOD_PRESSURE && val <= Limit.MAX_BLOOD_PRESSURE) ||
    `If provided, Diastolic blood pressure must be between ${Limit.MIN_BLOOD_PRESSURE} and ${Limit.MAX_BLOOD_PRESSURE}}`
}

/**
 * Ensures the values are set to null if the input is empty.
 * @param val
 * @param index
 */
function blurValueUpdate(val: Optional<number> | '', index: number) {
  if (val === null || val === undefined || val === '') {
    actionStore.record[DatabaseField.VITALS][index] = null
  }
}
</script>

<template>
  <QCard v-if="isVisible">
    <QCardSection>
      <div class="text-h6 q-mb-md">{{ label }}</div>

      <div class="q-mb-md">
        Your body temperature. Typical healthy adults should expect a body temperature near 98.6°F.
      </div>

      <div class="row q-gutter-sm q-mb-md">
        <div class="col-6">
          <!-- Note: v-model.number for number types -->
          <QInput
            v-model.number="actionStore.record[DatabaseField.VITALS][0]"
            ref="inputRef"
            :label="previousLabel('Temperature', previousRecord?.[DatabaseField.VITALS]?.[0])"
            :rules="[temperatureRule()]"
            type="number"
            dense
            outlined
            color="primary"
            @blur="blurValueUpdate(actionStore.record[DatabaseField.VITALS][0], 0)"
          />
        </div>
        <div class="text-h4">°F</div>
      </div>

      <div class="q-mb-md">
        Your heart rate in beats per minute. Typical healthy adults should expect a resting heart
        rate near 60 bpm.
      </div>

      <div class="row q-gutter-sm q-mb-md">
        <div class="col-6">
          <!-- Note: v-model.number for number types -->
          <QInput
            v-model.number="actionStore.record[DatabaseField.VITALS][1]"
            ref="inputRef"
            :label="previousLabel('Heart Rate', previousRecord?.[DatabaseField.VITALS]?.[1])"
            :rules="[heartRateRule()]"
            type="number"
            dense
            outlined
            color="primary"
            @blur="blurValueUpdate(actionStore.record[DatabaseField.VITALS][1], 1)"
          />
        </div>
        <div class="text-h4">bpm</div>
      </div>

      <div class="q-mb-md">
        Your blood oxygen percentage, which can be determined using a pulse oximeter. Typical
        healthy adults should expect a blood oxygen between 90-100%.
      </div>

      <div class="row q-gutter-sm q-mb-md">
        <div class="col-6">
          <!-- Note: v-model.number for number types -->
          <QInput
            v-model.number="actionStore.record[DatabaseField.VITALS][2]"
            ref="inputRef"
            :label="previousLabel('Blood Oxygen', previousRecord?.[DatabaseField.VITALS]?.[2])"
            :rules="[bloodOxygenRule()]"
            type="number"
            dense
            outlined
            color="primary"
            @blur="blurValueUpdate(actionStore.record[DatabaseField.VITALS][2], 2)"
          />
        </div>
        <div class="text-h4">%</div>
      </div>

      <div class="q-mb-md">
        Your blood pressure. Typical healthy adults should expect a blood pressure near 120/80 while
        inactive.
      </div>

      <div class="row q-gutter-sm">
        <div class="col">
          <!-- Note: v-model.number for number types -->
          <QInput
            v-model.number="actionStore.record[DatabaseField.VITALS][3]"
            ref="inputRef"
            :label="previousLabel('Systolic', previousRecord?.[DatabaseField.VITALS]?.[3])"
            :rules="[systolicRule()]"
            type="number"
            dense
            outlined
            color="primary"
            @blur="blurValueUpdate(actionStore.record[DatabaseField.VITALS][3], 3)"
          />
        </div>

        <div class="text-h4">/</div>

        <div class="col">
          <!-- Note: v-model.number for number types -->
          <QInput
            v-model.number="actionStore.record[DatabaseField.VITALS][4]"
            ref="inputRef"
            :label="previousLabel('Diastolic', previousRecord?.[DatabaseField.VITALS]?.[4])"
            :rules="[diastolicRule()]"
            type="number"
            dense
            outlined
            color="primary"
            @blur="blurValueUpdate(actionStore.record[DatabaseField.VITALS][4], 4)"
          />
        </div>
      </div>
    </QCardSection>
  </QCard>
</template>

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

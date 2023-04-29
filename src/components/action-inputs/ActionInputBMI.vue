<script setup lang="ts">
import { computed, onMounted, ref, type Ref } from 'vue'
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
const { isVisible, previousRecord } = useParentIdWatcher(MeasurementInput.BMI)

// Data
const inputRef: Ref<any> = ref(null)
const bmiValue = computed(() => {
  const totalHeightInches =
    actionStore.record[DatabaseField.BMI][0] * 12 + actionStore.record[DatabaseField.BMI][1]
  const weight = actionStore.record[DatabaseField.BMI][2]
  actionStore.record[DatabaseField.BMI][3] = (
    (weight / (totalHeightInches * totalHeightInches)) *
    703
  ).toFixed(2)
  return actionStore.record[DatabaseField.BMI][3]
})

onMounted(() => {
  actionStore.record[DatabaseField.BMI] =
    actionStore.record[DatabaseField.BMI] ?? FieldDefault[DatabaseField.BMI]() // function call
})

/**
 * Height feet validation rule test for the template component.
 * @param val
 */
function feetRule() {
  return (val: Optional<number>) =>
    val === null ||
    val === undefined ||
    (val >= 0 && val <= 10) ||
    'If provided, height feet must be between 0 and 10'
}

/**
 * Height inches validation rule test for the template component.
 * @param val
 */
function inchesRule() {
  return (val: Optional<number>) =>
    val === null ||
    val === undefined ||
    (val >= 0 && val <= 11.99) ||
    'If provided, height inches must be between 0 and 11.99'
}

/**
 * Weight lbs validation rule test for the template component.
 * @param val
 */
function lbsRule() {
  return (val: Optional<number>) =>
    val === null ||
    val === undefined ||
    (val >= 0 && val <= 1500) ||
    'If provided, weight lbs must be between 0 and 1500'
}
</script>

<template>
  <QCard v-if="isVisible">
    <QCardSection>
      <div class="text-h6 q-mb-md">{{ label }}</div>

      <div class="q-mb-md">TODO</div>

      <div class="row q-gutter-sm q-mb-md">
        <div class="col">
          <!-- Note: v-model.number for number types -->
          <QInput
            v-model.number="actionStore.record[DatabaseField.BMI][0]"
            ref="inputRef"
            :label="`Height ft (${previousRecord?.[DatabaseField.BMI]?.[0] ?? '-'})`"
            :rules="[feetRule()]"
            type="number"
            dense
            outlined
            color="primary"
          />
        </div>

        <div class="text-h4 q-mr-md">ft</div>

        <div class="col">
          <!-- Note: v-model.number for number types -->
          <QInput
            v-model.number="actionStore.record[DatabaseField.BMI][1]"
            ref="inputRef"
            :label="`Height in (${previousRecord?.[DatabaseField.BMI]?.[1] ?? '-'})`"
            :rules="[inchesRule()]"
            type="number"
            dense
            outlined
            color="primary"
          />
        </div>

        <div class="text-h4 q-mr-md">in</div>
      </div>

      <div class="q-mb-md">TODO</div>

      <div class="row q-gutter-sm q-mb-md">
        <div class="col-6">
          <!-- Note: v-model.number for number types -->
          <QInput
            v-model.number="actionStore.record[DatabaseField.BMI][2]"
            ref="inputRef"
            :label="`Weight (${previousRecord?.[DatabaseField.BMI]?.[2] ?? '-'})`"
            :rules="[lbsRule()]"
            type="number"
            dense
            outlined
            color="primary"
          />
        </div>
        <div class="text-h4">lbs</div>
      </div>

      <div class="q-mb-md">TODO</div>

      <div class="row q-gutter-sm">
        <div class="col-6">
          <QInput
            v-model="bmiValue"
            ref="inputRef"
            :label="`BMI (${previousRecord?.[DatabaseField.BMI]?.[3] ?? '-'})`"
            disable
            dense
            outlined
            color="primary"
          />
        </div>
        <div class="text-h4">bmi</div>
      </div>
    </QCardSection>
  </QCard>
</template>

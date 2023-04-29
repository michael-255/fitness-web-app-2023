<script setup lang="ts">
import { onMounted, onUpdated, ref, type Ref } from 'vue'
import { DatabaseField, MeasurementInput } from '@/types/database'
import { FieldDefault } from '@/services/Defaults'
import { Limit } from '@/types/misc'
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

onMounted(() => {
  actionStore.record[DatabaseField.BMI] =
    actionStore.record[DatabaseField.BMI] ?? FieldDefault[DatabaseField.BMI]() // function call
})

onUpdated(() => {
  // Ensures the height values are carried over into the inputs from the previous record
  if (previousRecord.value?.[DatabaseField.BMI]?.[0]) {
    actionStore.record[DatabaseField.BMI][0] = previousRecord.value?.[DatabaseField.BMI]?.[0]
  }
  if (previousRecord.value?.[DatabaseField.BMI]?.[1]) {
    actionStore.record[DatabaseField.BMI][1] = previousRecord.value?.[DatabaseField.BMI]?.[1]
  }
})

/**
 * Height feet validation rule for the template component.
 */
function feetRule() {
  return (val: number) =>
    (val !== null && val !== undefined && val >= Limit.MIN_BMI_FEET && val <= Limit.MAX_BMI_FEET) ||
    `Height feet must be between ${Limit.MIN_BMI_FEET} and ${Limit.MAX_BMI_FEET}`
}

/**
 * Height inches validation rule for the template component.
 */
function inchesRule() {
  return (val: number) =>
    (val !== null &&
      val !== undefined &&
      val >= Limit.MIN_BMI_INCHES &&
      val <= Limit.MAX_BMI_INCHES) ||
    `Height inches must be between ${Limit.MIN_BMI_INCHES} and ${Limit.MAX_BMI_INCHES}`
}

/**
 * Weight lbs validation rule for the template component.
 */
function lbsRule() {
  return (val: number) =>
    (val !== null && val !== undefined && val >= Limit.MIN_BMI_LBS && val <= Limit.MAX_BMI_LBS) ||
    `Weight must be between ${Limit.MIN_BMI_LBS} and ${Limit.MAX_BMI_LBS}`
}

/**
 * BMI validation rule for the template component.
 * Seems this rule is required for the QForm validation to work correctly.
 */
function bmiRule() {
  return (val: number) =>
    (val !== null && val !== undefined) ||
    'Fill out the height and weight inputs to calculate the BMI'
}

/**
 * Updates the BMI input based on the height and weight inputs.
 */
function updateBmi() {
  const heightFeet = actionStore.record[DatabaseField.BMI][0]
  const heightInches = actionStore.record[DatabaseField.BMI][1]
  const weight = actionStore.record[DatabaseField.BMI][2]
  const totalHeightInches = heightFeet * 12 + heightInches

  if (!totalHeightInches || !weight) {
    actionStore.record[DatabaseField.BMI][3] = null
  } else {
    actionStore.record[DatabaseField.BMI][3] = Number(
      ((weight / (totalHeightInches * totalHeightInches)) * 703).toFixed(2)
    )
  }
}
</script>

<template>
  <QCard v-if="isVisible">
    <QCardSection>
      <div class="text-h6 q-mb-md">{{ label }}</div>

      <div class="q-mb-md">
        Enter your height in feet and inches at least once. The values will automatically be carried
        over each time you add a new record.
      </div>

      <div class="row q-gutter-sm">
        <div class="col">
          <!-- Note: v-model.number for number types -->
          <QInput
            v-model.number="actionStore.record[DatabaseField.BMI][0]"
            ref="inputRef"
            label="Height, ft"
            :rules="[feetRule()]"
            type="number"
            dense
            outlined
            color="primary"
            @update:model-value="updateBmi()"
          />
        </div>

        <div class="text-h4 q-mr-md">ft</div>

        <div class="col">
          <!-- Note: v-model.number for number types -->
          <QInput
            v-model.number="actionStore.record[DatabaseField.BMI][1]"
            ref="inputRef"
            label="Height, in"
            :rules="[inchesRule()]"
            type="number"
            dense
            outlined
            color="primary"
            @update:model-value="updateBmi()"
          />
        </div>

        <div class="text-h4 q-mr-md">in</div>
      </div>

      <div class="q-mb-md">Enter your body weight in pounds.</div>

      <div class="row q-gutter-sm">
        <div class="col-6">
          <!-- Note: v-model.number for number types -->
          <QInput
            v-model.number="actionStore.record[DatabaseField.BMI][2]"
            ref="inputRef"
            :label="`Previous (${previousRecord?.[DatabaseField.BMI]?.[2] ?? '-'})`"
            :rules="[lbsRule()]"
            type="number"
            dense
            outlined
            color="primary"
            @update:model-value="updateBmi()"
          />
        </div>
        <div class="text-h4">lbs</div>
      </div>

      <div class="q-mb-md">
        The Body Mass Index value will be automatically calculated as you update your height and
        weight.
      </div>

      <div class="row q-gutter-sm">
        <div class="col-6">
          <!-- Note: v-model.number for number types -->
          <QInput
            v-model.number="actionStore.record[DatabaseField.BMI][3]"
            ref="inputRef"
            :label="`Previous (${previousRecord?.[DatabaseField.BMI]?.[3] ?? '-'})`"
            :rules="[bmiRule()]"
            type="number"
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

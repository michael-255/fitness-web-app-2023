<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import {
  DatabaseField,
  DatabaseType,
  MeasurementInput,
  SettingId,
  type SettingValue,
} from '@/types/database'
import { FieldDefault } from '@/services/Defaults'
import { Limit, type Optional } from '@/types/misc'
import useParentIdWatcher from '@/composables/useParentIdWatcher'
import useActionStore from '@/stores/action'
import DB from '@/services/LocalDatabase'

// Props & Emits
defineProps<{
  label: string
}>()

// Composables & Stores
const actionStore = useActionStore()
const { isVisible, previousRecord } = useParentIdWatcher(MeasurementInput.BODY_WEIGHT_BMI)

// Data
const inputRef: Ref<any> = ref(null)
const heightInches: Ref<SettingValue> = ref(null)
const bmi: Ref<Optional<number>> = ref(null)

onMounted(async () => {
  actionStore.record[DatabaseField.BODY_WEIGHT_BMI] =
    actionStore.record[DatabaseField.BODY_WEIGHT_BMI] ??
    FieldDefault[DatabaseField.BODY_WEIGHT_BMI]() // function call

  // Update total height inches in component if settings height exists
  const heightSetting = (await DB.getRecord(DatabaseType.SETTING, SettingId.YOUR_HEIGHT))?.[
    DatabaseField.VALUE
  ]

  if (heightSetting && Array.isArray(heightSetting)) {
    if (heightSetting[0] && heightSetting[1]) {
      heightInches.value = heightSetting[0] * 12 + heightSetting[1]
    } else {
      heightInches.value = null
    }
  }
})

/**
 * Formats the previous value for the input field based on the previous record value.
 * @param actionRecordValue
 */
function previousValue(actionRecordValue: Optional<number>) {
  if (actionRecordValue !== null && actionRecordValue !== undefined) {
    return `← ${actionRecordValue} lbs`
  } else {
    return ''
  }
}

/**
 * Weight lbs validation rule for the template component.
 */
function lbsRule() {
  return (val: number) =>
    (val !== null && val !== undefined && val >= Limit.MIN_BMI_LBS && val <= Limit.MAX_BMI_LBS) ||
    `Must be between ${Limit.MIN_BMI_LBS} and ${Limit.MAX_BMI_LBS}`
}

/**
 * Ensures the values are set to null if the input is empty.
 */
function cleanBodyWeightBmiInput() {
  const val = actionStore.record[DatabaseField.BODY_WEIGHT_BMI][0]

  if (val === null || val === undefined || val === '') {
    actionStore.record[DatabaseField.BODY_WEIGHT_BMI][0] = null
  } else {
    actionStore.record[DatabaseField.BODY_WEIGHT_BMI][0] = parseFloat(val.toFixed(2))
  }
}

/**
 * Updates the BMI based on the height setting and weight input.
 */
function updateBmi() {
  const weight = actionStore.record[DatabaseField.BODY_WEIGHT_BMI][0]
  const totalHeightInches = Number(heightInches.value)

  if (totalHeightInches && weight) {
    const calculatedBmi = parseFloat(
      ((weight / (totalHeightInches * totalHeightInches)) * 703).toFixed(2)
    )
    actionStore.record[DatabaseField.BODY_WEIGHT_BMI][1] = calculatedBmi
    bmi.value = calculatedBmi
  } else {
    actionStore.record[DatabaseField.BODY_WEIGHT_BMI][1] = null
    bmi.value = null
  }
}
</script>

<template>
  <QCard v-if="isVisible">
    <QCardSection>
      <div class="text-h6 q-mb-md">{{ label }}</div>

      <div class="q-mb-md">Enter your body weight in pounds.</div>

      <div class="row q-gutter-sm q-mb-md">
        <div class="text-h6 q-pt-xs">Weight</div>

        <div class="col-4">
          <!-- Note: v-model.number for number types -->
          <QInput
            v-model.number="actionStore.record[DatabaseField.BODY_WEIGHT_BMI][0]"
            ref="inputRef"
            label="lbs"
            :rules="[lbsRule()]"
            type="number"
            step="0.01"
            dense
            rounded
            outlined
            color="primary"
            @blur="cleanBodyWeightBmiInput()"
            @update:model-value="updateBmi()"
          />
        </div>
        <div class="text-h6 q-pt-xs">
          {{ previousValue(previousRecord?.[DatabaseField.BODY_WEIGHT_BMI]?.[0]) }}
        </div>
      </div>

      <div class="q-mb-md">
        The Body Mass Index will is automatically calculated as long as your height is recorded on
        the Settings page and you have entered a weight above.
      </div>

      <div v-if="bmi" class="text-h5">{{ bmi }} bmi</div>
      <div v-else class="text-h5">- bmi</div>
    </QCardSection>
  </QCard>
</template>

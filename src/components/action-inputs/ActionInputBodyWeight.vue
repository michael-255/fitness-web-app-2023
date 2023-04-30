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
const { isVisible, previousRecord } = useParentIdWatcher(MeasurementInput.BODY_WEIGHT)

// Data
const inputRef: Ref<any> = ref(null)
const heightInches: Ref<SettingValue> = ref(null)
const bmi: Ref<Optional<number>> = ref(null)

onMounted(async () => {
  actionStore.record[DatabaseField.BODY_WEIGHT] =
    actionStore.record[DatabaseField.BODY_WEIGHT] ?? FieldDefault[DatabaseField.BODY_WEIGHT]() // function call

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
 * Weight lbs validation rule for the template component.
 */
function lbsRule() {
  return (val: number) =>
    (val !== null && val !== undefined && val >= Limit.MIN_BMI_LBS && val <= Limit.MAX_BMI_LBS) ||
    `Weight must be between ${Limit.MIN_BMI_LBS} and ${Limit.MAX_BMI_LBS}`
}

/**
 * Updates the BMI based on the height setting and weight input.
 */
function updateBmi() {
  const weight = actionStore.record[DatabaseField.BODY_WEIGHT][0]
  const totalHeightInches = Number(heightInches.value)

  if (totalHeightInches && weight) {
    const calculatedBmi = Number(
      ((weight / (totalHeightInches * totalHeightInches)) * 703).toFixed(2)
    )
    actionStore.record[DatabaseField.BODY_WEIGHT][1] = calculatedBmi
    bmi.value = calculatedBmi
  } else {
    actionStore.record[DatabaseField.BODY_WEIGHT][1] = null
    bmi.value = null
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

      <div class="q-mb-md">Enter your body weight in pounds.</div>

      <div class="row q-gutter-sm">
        <div class="col-6">
          <!-- Note: v-model.number for number types -->
          <QInput
            v-model.number="actionStore.record[DatabaseField.BODY_WEIGHT][0]"
            ref="inputRef"
            :label="`Previous (${previousRecord?.[DatabaseField.BODY_WEIGHT]?.[0] ?? '-'})`"
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
        The Body Mass Index value will be automatically calculated as long as your height is
        recorded in the Settings and you have entered a weight.
      </div>

      <div v-if="bmi" class="text-h6">{{ bmi }} bmi</div>
      <div v-else class="text-h6">- bmi</div>
    </QCardSection>
  </QCard>
</template>

<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { DatabaseField, MeasurementInput } from '@/types/database'
import { Icon } from '@/types/icons'
import { Limit, type Optional } from '@/types/misc'
import { FieldDefault } from '@/services/Defaults'
import useParentIdWatcher from '@/composables/useParentIdWatcher'
import useActionStore from '@/stores/action'

// Props & Emits
defineProps<{
  locked?: boolean
  label: string
}>()

// Composables & Stores
const actionStore = useActionStore()
const { isVisible, previousRecord } = useParentIdWatcher(MeasurementInput.PERCENTAGE)

// Data
const inputRef: Ref<any> = ref(null)

onMounted(() => {
  actionStore.record[DatabaseField.PERCENTAGE] =
    actionStore.record[DatabaseField.PERCENTAGE] ?? FieldDefault[DatabaseField.PERCENTAGE]() // function call
})

/**
 * Percentage validation rule for the template component.
 */
function percentageRule() {
  return (val: Optional<number>) =>
    (val !== null &&
      val !== undefined &&
      val >= Limit.MIN_PERCENTAGE &&
      val <= Limit.MAX_PERCENTAGE) ||
    `Must be between ${Limit.MIN_PERCENTAGE}-${Limit.MAX_PERCENTAGE}`
}

/**
 * Ensures the values are set to null if the input is empty and integers if it is not.
 */
function cleanIntegerInputValue() {
  const percentage = actionStore.record[DatabaseField.PERCENTAGE]

  if (percentage === null || percentage === undefined || percentage === '') {
    actionStore.record[DatabaseField.PERCENTAGE] = null
  } else {
    actionStore.record[DatabaseField.PERCENTAGE] = parseInt(percentage.toFixed(0))
  }
}

/**
 * Formats the previous value for the input field based on the previous record value.
 * @param actionRecordValue
 */
function previousValue(actionRecordValue: Optional<number>) {
  if (actionRecordValue !== null && actionRecordValue !== undefined) {
    return `← ${actionRecordValue}%`
  } else {
    return ''
  }
}
</script>

<template>
  <QCard v-if="!locked && isVisible">
    <QCardSection>
      <div class="text-h6 q-mb-md">
        {{ label }}
        <QIcon v-if="locked" :name="Icon.LOCK" color="warning" class="q-pb-xs" />
      </div>

      <div class="row q-gutter-sm q-mb-md">
        <div class="col-4">
          <!-- Note: v-model.number for number types -->
          <QInput
            v-model.number="actionStore.record[DatabaseField.PERCENTAGE]"
            ref="inputRef"
            label="%"
            :rules="[percentageRule()]"
            type="number"
            step="1"
            dense
            rounded
            outlined
            color="primary"
            @blur="cleanIntegerInputValue()"
          />
        </div>
        <div class="text-h6 q-pt-xs">
          {{ previousValue(previousRecord?.[DatabaseField.PERCENTAGE]) }}
        </div>
      </div>
    </QCardSection>
  </QCard>
</template>

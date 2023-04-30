<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { DatabaseField, MeasurementInput } from '@/types/database'
import { Icon } from '@/types/icons'
import { FieldDefault } from '@/services/Defaults'
import type { Optional } from '@/types/misc'
import useParentIdWatcher from '@/composables/useParentIdWatcher'
import useActionStore from '@/stores/action'

// Props & Emits
defineProps<{
  locked?: boolean
  label: string
}>()

// Composables & Stores
const actionStore = useActionStore()
const { isVisible, previousRecord } = useParentIdWatcher(MeasurementInput.INCHES)

// Data
const inputRef: Ref<any> = ref(null)

onMounted(() => {
  actionStore.record[DatabaseField.INCHES] =
    actionStore.record[DatabaseField.INCHES] ?? FieldDefault[DatabaseField.INCHES]() // function call
})

/**
 * Decimal validation rule for the template component.
 */
function decimalRule() {
  return (val: Optional<number>) =>
    (val !== null &&
      val !== undefined &&
      val >= Number.MIN_SAFE_INTEGER &&
      val <= Number.MAX_SAFE_INTEGER) ||
    `Must have a valid decimal number`
}

/**
 * Ensures the values are set to null if the input is empty and decimals if it is not.
 */
function cleanDecimalInputValue() {
  const inches = actionStore.record[DatabaseField.INCHES]

  if (inches === null || inches === undefined || inches === '') {
    actionStore.record[DatabaseField.INCHES] = null
  } else {
    actionStore.record[DatabaseField.INCHES] = parseFloat(inches.toFixed(2))
  }
}

/**
 * Formats the previous value for the input field based on the previous record value.
 * @param actionRecordValue
 */
function previousValue(actionRecordValue: Optional<number>) {
  if (actionRecordValue !== null && actionRecordValue !== undefined) {
    return `← ${actionRecordValue} in`
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
            v-model.number="actionStore.record[DatabaseField.INCHES]"
            ref="inputRef"
            label="inches"
            :rules="[decimalRule()]"
            type="number"
            step="0.01"
            dense
            rounded
            outlined
            color="primary"
            @blur="cleanDecimalInputValue()"
          />
        </div>
        <div class="text-h6 q-pt-xs">
          {{ previousValue(previousRecord?.[DatabaseField.INCHES]) }}
        </div>
      </div>
    </QCardSection>
  </QCard>
</template>

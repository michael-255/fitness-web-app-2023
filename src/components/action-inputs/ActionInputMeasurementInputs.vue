<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { DatabaseField, MeasurementInput } from '@/types/database'
import { Icon } from '@/types/icons'
import useLogger from '@/composables/useLogger'
import useActionRecordStore from '@/stores/action-record'

// Props & Emits
defineProps<{
  locked?: boolean
}>()

// Composables & Stores
const { log } = useLogger()
const actionRecordStore = useActionRecordStore()

// Data
const inputRef: Ref<any> = ref(null)
const options: Ref<any[]> = ref([])

onMounted(async () => {
  try {
    const measurementInputs = Object.values(MeasurementInput)

    // Build select box options
    options.value = measurementInputs.map((m: MeasurementInput) => ({
      value: m,
      label: m,
    }))

    // Check for initial valid state
    if (
      actionRecordStore.actionRecord[DatabaseField.MEASUREMENT_INPUTS] &&
      actionRecordStore.actionRecord[DatabaseField.MEASUREMENT_INPUTS].length > 0
    ) {
      actionRecordStore.valid[DatabaseField.MEASUREMENT_INPUTS] = true
    } else {
      actionRecordStore.valid[DatabaseField.MEASUREMENT_INPUTS] = false
    }
  } catch (error) {
    log.error('Error with measurement inputs', error)
  }
})

/**
 * Input validation rule test for the template component.
 * @param val
 */
function validationRule(val: MeasurementInput[]) {
  return Array.isArray(val) && val.length > 0
}

/**
 * Runs the input validation and sets the store valid property to the result.
 */
function validateInput() {
  actionRecordStore.valid[DatabaseField.MEASUREMENT_INPUTS] = !!inputRef?.value?.validate()
}
</script>

<template>
  <QCard v-show="!locked">
    <QCardSection>
      <div class="text-h6 q-mb-md">
        Measurement Inputs
        <QIcon v-if="locked" :name="Icon.LOCK" color="warning" class="q-pb-xs" />
      </div>

      <div class="q-mb-md">
        Available input options for the associated Measurement. At least one is required.
      </div>

      <QSelect
        v-model="actionRecordStore.actionRecord[DatabaseField.MEASUREMENT_INPUTS]"
        ref="inputRef"
        label="Measurement Inputs"
        :disable="locked"
        :options="options"
        :rules="[(val: MeasurementInput[]) => validationRule(val) || '* Required']"
        multiple
        emit-value
        map-options
        options-dense
        dense
        outlined
        color="primary"
        @blur="validateInput()"
      />
    </QCardSection>
  </QCard>
</template>

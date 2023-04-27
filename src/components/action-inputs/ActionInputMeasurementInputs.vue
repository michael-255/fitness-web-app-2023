<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { DatabaseField, MeasurementInput } from '@/types/database'
import { Icon } from '@/types/icons'
import useLogger from '@/composables/useLogger'
import useActionStore from '@/stores/action'

// Props & Emits
defineProps<{
  locked?: boolean
  label: string
}>()

// Composables & Stores
const { log } = useLogger()
const actionStore = useActionStore()

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
</script>

<template>
  <QCard v-show="!locked">
    <QCardSection>
      <div class="text-h6 q-mb-md">
        {{ label }}
        <QIcon v-if="locked" :name="Icon.LOCK" color="warning" class="q-pb-xs" />
      </div>

      <div class="q-mb-md">
        Available input options for the associated Measurement. At least one is required.
      </div>

      <QSelect
        v-model="actionStore.record[DatabaseField.MEASUREMENT_INPUTS]"
        ref="inputRef"
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
      />
    </QCardSection>
  </QCard>
</template>

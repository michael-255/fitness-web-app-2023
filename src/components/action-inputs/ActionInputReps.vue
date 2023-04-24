<script setup lang="ts">
import { onMounted, ref, type Ref, watch } from 'vue'
import { DatabaseField, DatabaseType, MeasurementInput } from '@/types/database'
import { FieldDefault } from '@/services/Defaults'
import useActionStore from '@/stores/action'
import useLogger from '@/composables/useLogger'
import DB from '@/services/LocalDatabase'

// Props & Emits
defineProps<{
  locked?: boolean
  label: string
}>()

// Composables & Stores
const actionStore = useActionStore()
const { log } = useLogger()

// Data
const inputRef: Ref<any> = ref(null)
const isCardVisible = ref(true)

onMounted(() => {
  // TODO
  actionStore.record[DatabaseField.LBS] =
    actionStore.record[DatabaseField.LBS] ?? FieldDefault[DatabaseField.LBS]() // function call
})

/**
 * Defaults the input if the current value is not valid.
 */
function defaultNonValidInput() {
  // TODO
  const val = actionStore.record[DatabaseField.LBS]

  if (!(typeof val === 'number') || val < 0) {
    actionStore.record[DatabaseField.LBS] = FieldDefault[DatabaseField.LBS]() // function call
  } else if (val > Number.MAX_SAFE_INTEGER) {
    actionStore.record[DatabaseField.LBS] = Number.MAX_SAFE_INTEGER
  }
}

/**
 * TODO
 * Watching actionStore parent id for the property to change.
 * Determines if the card should be visible or not.
 */
watch(
  () => actionStore.record[DatabaseField.PARENT_ID] as string,
  async (parentId) => {
    // TODO
    try {
      if (!parentId) {
        return (isCardVisible.value = false)
      }

      const measurementRecord = await DB.getRecord(DatabaseType.MEASUREMENT, parentId)

      if (!measurementRecord) {
        return (isCardVisible.value = false)
      }

      const measurementInputs = measurementRecord[DatabaseField.MEASUREMENT_INPUTS]

      // Checks for specific measurement input
      if (measurementInputs?.includes(MeasurementInput.LBS)) {
        isCardVisible.value = true
      } else {
        isCardVisible.value = false
      }
    } catch (error) {
      log.error('Error with blood pressure watcher', error)
    }
  },
  { immediate: true }
)
</script>

<template>
  <!-- TODO -->
  <!-- Note: v-model.number for number types -->
  <QInput
    v-model.number="actionStore.record[DatabaseField.LBS]"
    ref="inputRef"
    :label="label"
    :disable="locked"
    type="number"
    dense
    outlined
    color="primary"
    @blur="defaultNonValidInput()"
  />
</template>

<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { DatabaseField, ExerciseInput } from '@/types/database'
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
const { isVisible, previousRecord } = useParentIdWatcher(ExerciseInput.WEIGHT_LBS)

// Data
const inputRef: Ref<any> = ref(null)

onMounted(() => {
  // TODO
  actionStore.record[DatabaseField.WEIGHT_LBS] =
    actionStore.record[DatabaseField.WEIGHT_LBS] ?? FieldDefault[DatabaseField.WEIGHT_LBS]() // function call
})

/**
 * Defaults the input if the current value is not valid.
 */
function defaultNonValidInput() {
  // TODO
  const val = actionStore.record[DatabaseField.WEIGHT_LBS]

  if (!(typeof val === 'number') || val < 0) {
    actionStore.record[DatabaseField.WEIGHT_LBS] = FieldDefault[DatabaseField.WEIGHT_LBS]() // function call
  } else if (val > Number.MAX_SAFE_INTEGER) {
    actionStore.record[DatabaseField.WEIGHT_LBS] = Number.MAX_SAFE_INTEGER
  }
}
</script>

<template>
  <!-- TODO -->
  <!-- Note: v-model.number for number types -->
  <QInput
    v-if="isVisible"
    v-model.number="actionStore.record[DatabaseField.WEIGHT_LBS]"
    ref="inputRef"
    :label="`${previousRecord?.weightLbs ?? 'No previous record'}`"
    :disable="locked"
    type="number"
    dense
    outlined
    color="primary"
    @blur="defaultNonValidInput()"
  />
</template>

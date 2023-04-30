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
const { isVisible, previousRecord } = useParentIdWatcher(ExerciseInput.RESISTANCE)

// Data
const inputRef: Ref<any> = ref(null)

onMounted(() => {
  // TODO
  actionStore.record[DatabaseField.RESISTANCE] =
    actionStore.record[DatabaseField.RESISTANCE] ?? FieldDefault[DatabaseField.RESISTANCE]() // function call
})

/**
 * Defaults the input if the current value is not valid.
 */
function defaultNonValidInput() {
  // TODO
  const val = actionStore.record[DatabaseField.RESISTANCE]

  if (!(typeof val === 'number') || val < 0) {
    actionStore.record[DatabaseField.RESISTANCE] = FieldDefault[DatabaseField.RESISTANCE]() // function call
  } else if (val > Number.MAX_SAFE_INTEGER) {
    actionStore.record[DatabaseField.RESISTANCE] = Number.MAX_SAFE_INTEGER
  }
}
</script>

<template>
  <!-- TODO -->
  <!-- Note: v-model.number for number types -->
  <QInput
    v-if="isVisible"
    v-model.number="actionStore.record[DatabaseField.RESISTANCE]"
    ref="inputRef"
    :label="`${previousRecord?.resistance ?? 'No previous data'}`"
    :disable="locked"
    type="number"
    dense
    outlined
    color="primary"
    @blur="defaultNonValidInput()"
  />
</template>

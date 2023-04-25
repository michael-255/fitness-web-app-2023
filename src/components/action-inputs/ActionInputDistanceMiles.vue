<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { DatabaseField, DatabaseType, ExerciseInput } from '@/types/database'
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
const { isVisible } = useParentIdWatcher(DatabaseType.EXERCISE, ExerciseInput.DISTANCE_MILES)

// Data
const inputRef: Ref<any> = ref(null)

onMounted(() => {
  // TODO
  actionStore.record[DatabaseField.DISTANCE_MILES] =
    actionStore.record[DatabaseField.DISTANCE_MILES] ?? FieldDefault[DatabaseField.DISTANCE_MILES]() // function call
})

/**
 * Defaults the input if the current value is not valid.
 */
function defaultNonValidInput() {
  // TODO
  const val = actionStore.record[DatabaseField.DISTANCE_MILES]

  if (!(typeof val === 'number') || val < 0) {
    actionStore.record[DatabaseField.DISTANCE_MILES] = FieldDefault[DatabaseField.DISTANCE_MILES]() // function call
  } else if (val > Number.MAX_SAFE_INTEGER) {
    actionStore.record[DatabaseField.DISTANCE_MILES] = Number.MAX_SAFE_INTEGER
  }
}
</script>

<template>
  <!-- TODO -->
  <!-- Note: v-model.number for number types -->
  <QInput
    v-if="isVisible"
    v-model.number="actionStore.record[DatabaseField.DISTANCE_MILES]"
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

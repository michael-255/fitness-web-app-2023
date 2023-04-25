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
const { isVisible } = useParentIdWatcher(DatabaseType.EXERCISE, ExerciseInput.DURATION_MINUTES)

// Data
const inputRef: Ref<any> = ref(null)

onMounted(() => {
  // TODO
  actionStore.record[DatabaseField.DURATION_MINUTES] =
    actionStore.record[DatabaseField.DURATION_MINUTES] ??
    FieldDefault[DatabaseField.DURATION_MINUTES]() // function call
})

/**
 * Defaults the input if the current value is not valid.
 */
function defaultNonValidInput() {
  // TODO
  const val = actionStore.record[DatabaseField.DURATION_MINUTES]

  if (!(typeof val === 'number') || val < 0) {
    actionStore.record[DatabaseField.DURATION_MINUTES] =
      FieldDefault[DatabaseField.DURATION_MINUTES]() // function call
  } else if (val > Number.MAX_SAFE_INTEGER) {
    actionStore.record[DatabaseField.DURATION_MINUTES] = Number.MAX_SAFE_INTEGER
  }
}
</script>

<template>
  <!-- TODO -->
  <!-- Note: v-model.number for number types -->
  <QInput
    v-if="isVisible"
    v-model.number="actionStore.record[DatabaseField.DURATION_MINUTES]"
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

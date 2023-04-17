<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { DatabaseField, ExerciseInput } from '@/types/database'
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

/**
 * Sets the select box options with the parent items from the database.
 */
onMounted(async () => {
  try {
    const exerciseInputs = Object.values(ExerciseInput)

    options.value = exerciseInputs.map((i: ExerciseInput) => ({
      value: i,
      label: i,
    }))

    // Valid state starts true because you can have no inputs if you want
    actionRecordStore.valid[DatabaseField.EXERCISE_INPUTS] = true
  } catch (error) {
    log.error('Error with exercise inputs', error)
  }
})

/**
 * Runs the input validation and sets the store valid property to the result.
 */
function validateInput() {
  actionRecordStore.valid[DatabaseField.EXERCISE_INPUTS] = !!inputRef?.value?.validate()
}
</script>

<template>
  <QCard v-show="!locked">
    <QCardSection>
      <div class="text-h6 q-mb-md">
        Exercise Inputs
        <QIcon v-if="locked" :name="Icon.LOCK" color="warning" class="q-pb-xs" />
      </div>

      <div class="q-mb-md">
        Available input options for the associated Exercise. These will appear in order in the
        Active Workout when relevent. You can leave this empty if you want this Exercise to act as a
        reminder during the Active Workout.
      </div>

      <QSelect
        v-model="actionRecordStore.actionRecord[DatabaseField.EXERCISE_INPUTS]"
        ref="inputRef"
        label="Exercises"
        :disable="locked"
        :options="options"
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

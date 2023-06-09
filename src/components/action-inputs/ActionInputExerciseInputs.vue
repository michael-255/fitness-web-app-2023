<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { DatabaseField, ExerciseInput } from '@/types/database'
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
    const exerciseInputs = Object.values(ExerciseInput)

    // Build select box options
    options.value = exerciseInputs.map((i: ExerciseInput) => ({
      value: i,
      label: i,
    }))
  } catch (error) {
    log.error('Error with exercise inputs', error)
  }
})
</script>

<template>
  <QCard v-show="!locked">
    <QCardSection>
      <div class="text-h6 q-mb-md">
        {{ label }}
        <QIcon v-if="locked" :name="Icon.LOCK" color="warning" class="q-pb-xs" />
      </div>

      <div class="q-mb-md">
        Available input options for the associated Exercise. These will appear in order in the
        Active Workout when relevent. You can leave this empty if you want this Exercise to act as a
        reminder during the Active Workout.
      </div>

      <QSelect
        v-model="actionStore.record[DatabaseField.EXERCISE_INPUTS]"
        ref="inputRef"
        :disable="locked"
        :options="options"
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

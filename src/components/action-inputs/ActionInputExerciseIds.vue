<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { truncateString } from '@/utils/common'
import { DatabaseField, DatabaseType } from '@/types/database'
import { Icon } from '@/types/icons'
import type { DatabaseRecord } from '@/types/models'
import useLogger from '@/composables/useLogger'
import useActionRecordStore from '@/stores/action-record'
import DB from '@/services/LocalDatabase'

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
    const allEnabledExercises = await DB.getEnabledParentRecords(DatabaseType.EXERCISE)

    // Build options with value as the id, and the label as the name and truncated id
    options.value = allEnabledExercises.map((r: DatabaseRecord) => ({
      value: r.id,
      label: `${r.name} (${truncateString(r.id, 4, '*')})`, // Truncate id for readability
    }))

    // Check for initial valid state
    if (
      actionRecordStore.actionRecord[DatabaseField.EXERCISE_IDS] &&
      actionRecordStore.actionRecord[DatabaseField.EXERCISE_IDS].length > 0
    ) {
      actionRecordStore.valid[DatabaseField.EXERCISE_IDS] = true
    } else {
      actionRecordStore.valid[DatabaseField.EXERCISE_IDS] = false
    }
  } catch (error) {
    log.error('Error with exercise ids input', error)
  }
})

/**
 * Input validation rule test for the template component.
 * @param val
 */
function validationRule(val: string[]) {
  return Array.isArray(val) && val.length > 0
}

/**
 * Runs the input validation and sets the store valid property to the result.
 */
function validateInput() {
  actionRecordStore.valid[DatabaseField.EXERCISE_IDS] = !!inputRef?.value?.validate()
}
</script>

<template>
  <QCard v-show="!locked">
    <QCardSection>
      <div class="text-h6 q-mb-md">
        Exercises
        <QIcon v-if="locked" :name="Icon.LOCK" color="warning" class="q-pb-xs" />
      </div>

      <div class="q-mb-md">
        Exercises associated with this Workout. They will appear in the order they are selected from
        the list in the Active Workout.
      </div>

      <QSelect
        v-model="actionRecordStore.actionRecord[DatabaseField.EXERCISE_IDS]"
        ref="inputRef"
        label="Exercises"
        :disable="locked"
        :options="options"
        :rules="[(val: string[]) => validationRule(val) || '* Required']"
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
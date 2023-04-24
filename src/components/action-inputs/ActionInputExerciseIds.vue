<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { truncateString } from '@/utils/common'
import { DatabaseField, DatabaseType } from '@/types/database'
import { Icon } from '@/types/icons'
import type { DatabaseRecord } from '@/types/models'
import useLogger from '@/composables/useLogger'
import useActionStore from '@/stores/action'
import DB from '@/services/LocalDatabase'

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
    const allEnabledExercises = await DB.getEnabledParentRecords(DatabaseType.EXERCISE)

    // Build select box options
    options.value = allEnabledExercises.map((r: DatabaseRecord) => ({
      value: r.id,
      label: `${r.name} (${truncateString(r.id, 4, '*')})`, // Truncate id for readability
    }))
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
</script>

<template>
  <QCard v-show="!locked">
    <QCardSection>
      <div class="text-h6 q-mb-md">
        {{ label }}
        <QIcon v-if="locked" :name="Icon.LOCK" color="warning" class="q-pb-xs" />
      </div>

      <div class="q-mb-md">
        Exercises associated with this Workout. They will appear in the order they are selected from
        the list in the Active Workout.
      </div>

      <QSelect
        v-model="actionStore.record[DatabaseField.EXERCISE_IDS]"
        ref="inputRef"
        :label="label"
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
      />
    </QCardSection>
  </QCard>
</template>

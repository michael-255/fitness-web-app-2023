<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
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
    const allExerciseResults = await DB.getRecordsByType(DatabaseType.EXERCISE_RESULT)

    // Build select box options
    options.value = allExerciseResults.map((r: DatabaseRecord) => ({
      value: r.id,
      label: r.id,
    }))

    // Valid state starts true because you can have no result ids if you want
    actionStore.valid[DatabaseField.EXERCISE_RESULT_IDS] = true
  } catch (error) {
    log.error('Error with exercise ids input', error)
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

      <div class="q-mb-md">Exercise Result Ids associated with this Workout Result.</div>

      <QSelect
        v-model="actionStore.record[DatabaseField.EXERCISE_RESULT_IDS]"
        ref="inputRef"
        :label="label"
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

import { ref, watch, type Ref } from 'vue'
import {
  DatabaseField,
  DatabaseType,
  ExerciseInput,
  MeasurementInput,
  type DatabaseParentType,
} from '@/types/database'
import type { Optional } from '@/types/misc'
import type { DatabaseRecord } from '@/types/models'
import {
  getChildCategoryTypes,
  getChildType,
  getParentCategoryTypes,
  getParentType,
} from '@/services/Blueprints'
import useActionStore from '@/stores/action'
import useLogger from '@/composables/useLogger'
import DB from '@/services/LocalDatabase'

/**
 * Composable with the watcher for parent id.
 * @param input
 */
export default function useParentIdWatcher(input?: MeasurementInput | ExerciseInput) {
  const actionStore = useActionStore()
  const { log } = useLogger()

  const isVisible = ref(false)
  const previousRecord: Ref<Optional<DatabaseRecord>> = ref(null)

  /**
   * Watching actionStore parent id.
   */
  watch(
    () => actionStore.record[DatabaseField.PARENT_ID] as string,
    async (parentId) => {
      try {
        const type = actionStore.record[DatabaseField.TYPE]

        // Do NOT continue without a parent id or type
        if (!parentId || !type) {
          return (isVisible.value = false)
        }

        // Nothing to do on parent types
        if (getParentCategoryTypes().includes(type)) {
          return (isVisible.value = false)
        }

        previousRecord.value = await DB.getPreviousChildRecord(type, parentId)

        const parentRecord = await DB.getRecord(getParentType(type) as DatabaseParentType, parentId)

        if (!parentRecord) {
          return (isVisible.value = false)
        }

        let inputs: (MeasurementInput | ExerciseInput)[] = []

        // Get inputs from the parent record
        if (type === DatabaseType.MEASUREMENT_RESULT) {
          inputs = parentRecord[DatabaseField.MEASUREMENT_INPUTS] as MeasurementInput[]
        } else if (type === DatabaseType.EXERCISE_RESULT) {
          inputs = parentRecord[DatabaseField.EXERCISE_INPUTS] as ExerciseInput[]
        } else {
          inputs = []
        }

        // Checks for specific input (must be provided)
        if (inputs?.includes(input as MeasurementInput | ExerciseInput)) {
          isVisible.value = true
        } else {
          isVisible.value = false
        }
      } catch (error) {
        log.error('Error with parent id watcher', error)
      }
    },
    { immediate: true }
  )

  return { isVisible, previousRecord }
}

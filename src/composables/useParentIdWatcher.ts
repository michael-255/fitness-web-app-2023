import { ref, watch } from 'vue'
import { DatabaseField, DatabaseType, ExerciseInput, MeasurementInput } from '@/types/database'
import useActionStore from '@/stores/action'
import useLogger from './useLogger'
import DB from '@/services/LocalDatabase'

/**
 * Composable with the watcher for triggering input component visiblity.
 * @param type
 * @param input
 */
export default function useParentIdWatcher(
  type: DatabaseType.MEASUREMENT | DatabaseType.EXERCISE,
  input: MeasurementInput | ExerciseInput
) {
  const actionStore = useActionStore()
  const { log } = useLogger()

  const isVisible = ref(true)

  /**
   * Watching actionStore parent id for the property to change.
   * Determines if the card should be visible or not.
   */
  watch(
    () => actionStore.record[DatabaseField.PARENT_ID] as string,
    async (parentId) => {
      try {
        if (!parentId) {
          return (isVisible.value = false)
        }

        const record = await DB.getRecord(type, parentId)

        if (!record) {
          return (isVisible.value = false)
        }

        let inputs: (MeasurementInput | ExerciseInput)[] = []

        // Get inputs from the parent record
        if (type === DatabaseType.MEASUREMENT) {
          inputs = record[DatabaseField.MEASUREMENT_INPUTS] as MeasurementInput[]
        } else if (type === DatabaseType.EXERCISE) {
          inputs = record[DatabaseField.EXERCISE_INPUTS] as ExerciseInput[]
        } else {
          inputs = []
        }

        // Checks for specific input
        if (inputs?.includes(input)) {
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

  return { isVisible }
}

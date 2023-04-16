import { DatabaseField, DatabaseType, MeasurementInput } from '@/types/database'
import { Icon } from '@/types/icons'
import type { DatabaseRecord, Workout, Exercise, Measurement } from '@/types/models'
import { ExerciseInput } from '@/types/database'
import useLogger from '@/composables/useLogger'
import useDialogs from '@/composables/useDialogs'
import DB from '@/services/LocalDatabase'

/**
 * Composable with functions for generating default data for the app.
 */
export default function useDefaults() {
  const { log } = useLogger()
  const { confirmDialog } = useDialogs()

  /**
   * On confirmation, add the barbell strength workouts into the database.
   */
  async function onAddBarbellStrengthWorkouts() {
    confirmDialog(
      'Add Barbell Strength Workouts',
      `Would you like to add the Barbell Strength workouts into the database?`,
      Icon.INFO,
      'info',
      async () => {
        try {
          const records: DatabaseRecord[] = [
            {
              [DatabaseField.TYPE]: DatabaseType.EXERCISE,
              [DatabaseField.ID]: '50c1fc75-0975-45f8-8177-ff4988b00de2', // From Fitness Tracker v16 (Alpha & Beta)
              [DatabaseField.NAME]: 'Barbell Squat',
              [DatabaseField.DESCRIPTION]:
                'Standing barbell squat with the bar resting near your neck.',
              [DatabaseField.IS_FAVORITED]: false,
              [DatabaseField.IS_ENABLED]: true,
              [DatabaseField.EXERCISE_INPUTS]: [
                ExerciseInput.MULTIPLE_SETS,
                ExerciseInput.REPS,
                ExerciseInput.WEIGHT_LBS,
              ],
            } as Exercise,
            {
              [DatabaseField.TYPE]: DatabaseType.EXERCISE,
              [DatabaseField.ID]: 'd681459e-10c8-40ae-94e9-9b06b7c40367', // From Fitness Tracker v16 (Alpha)
              [DatabaseField.NAME]: 'Barbell Bench Press',
              [DatabaseField.DESCRIPTION]: 'Lying barbell bench press chest exercise.',
              [DatabaseField.IS_FAVORITED]: false,
              [DatabaseField.IS_ENABLED]: true,
              [DatabaseField.EXERCISE_INPUTS]: [
                ExerciseInput.MULTIPLE_SETS,
                ExerciseInput.REPS,
                ExerciseInput.WEIGHT_LBS,
              ],
            } as Exercise,
            {
              [DatabaseField.TYPE]: DatabaseType.EXERCISE,
              [DatabaseField.ID]: '08b12cc1-d4b9-4d22-82db-9e33b3e5c3fa', // From Fitness Tracker v16 (Alpha)
              [DatabaseField.NAME]: 'Barbell Standing Rows',
              [DatabaseField.DESCRIPTION]:
                'Standing barbell rows where you hinge at the waist and pull the bar up into your stomach.',
              [DatabaseField.IS_FAVORITED]: false,
              [DatabaseField.IS_ENABLED]: true,
              [DatabaseField.EXERCISE_INPUTS]: [
                ExerciseInput.MULTIPLE_SETS,
                ExerciseInput.REPS,
                ExerciseInput.WEIGHT_LBS,
              ],
            } as Exercise,
            {
              [DatabaseField.TYPE]: DatabaseType.EXERCISE,
              [DatabaseField.ID]: 'cc279615-91a6-42ac-a073-4339e7c2034f', // From Fitness Tracker v16 (Beta)
              [DatabaseField.NAME]: 'Barbell Overhead Press',
              [DatabaseField.DESCRIPTION]:
                'Standing barbell overhead press. Flex your glutes and abs to keep your back straight while pushing the bar above your head.',
              [DatabaseField.IS_FAVORITED]: false,
              [DatabaseField.IS_ENABLED]: true,
              [DatabaseField.EXERCISE_INPUTS]: [
                ExerciseInput.MULTIPLE_SETS,
                ExerciseInput.REPS,
                ExerciseInput.WEIGHT_LBS,
              ],
            } as Exercise,
            {
              [DatabaseField.TYPE]: DatabaseType.EXERCISE,
              [DatabaseField.ID]: 'b8f1a60e-7f21-4f62-8757-d9b371bffd45', // From Fitness Tracker v16 (Beta)
              [DatabaseField.NAME]: 'Barbell Deadlift',
              [DatabaseField.DESCRIPTION]:
                'Standing barbell deadlift. Keep your back straight and flexed while lifting with your legs and lower back.',
              [DatabaseField.IS_FAVORITED]: false,
              [DatabaseField.IS_ENABLED]: true,
              [DatabaseField.EXERCISE_INPUTS]: [
                ExerciseInput.MULTIPLE_SETS,
                ExerciseInput.REPS,
                ExerciseInput.WEIGHT_LBS,
              ],
            } as Exercise,
            {
              [DatabaseField.TYPE]: DatabaseType.WORKOUT,
              [DatabaseField.ID]: '2158e1b2-27e0-4012-bb14-3846b3ee1d6a', // From Fitness Tracker v16
              [DatabaseField.NAME]: 'Barbell Strength - A',
              [DatabaseField.DESCRIPTION]:
                'Workout A of a barbell strength building program where you alternate between two workouts 3-4 times per week.',
              [DatabaseField.IS_FAVORITED]: false,
              [DatabaseField.IS_ENABLED]: true,
              [DatabaseField.EXERCISE_IDS]: [
                '50c1fc75-0975-45f8-8177-ff4988b00de2',
                'd681459e-10c8-40ae-94e9-9b06b7c40367',
                '08b12cc1-d4b9-4d22-82db-9e33b3e5c3fa',
              ],
            } as Workout,
            {
              [DatabaseField.TYPE]: DatabaseType.WORKOUT,
              [DatabaseField.ID]: 'f3a1537c-4d63-43e1-99bd-df5ef59ac220', // From Fitness Tracker v16
              [DatabaseField.NAME]: 'Barbell Strength - B',
              [DatabaseField.DESCRIPTION]:
                'Workout B of a barbell strength building program where you alternate between two workouts 3-4 times per week. You should only do 1 set of the Barbell Deaflift exercise.',
              [DatabaseField.IS_FAVORITED]: false,
              [DatabaseField.IS_ENABLED]: true,
              [DatabaseField.EXERCISE_IDS]: [
                '50c1fc75-0975-45f8-8177-ff4988b00de2',
                'cc279615-91a6-42ac-a073-4339e7c2034f',
                'b8f1a60e-7f21-4f62-8757-d9b371bffd45',
              ],
            } as Workout,
          ]

          await DB.bulkAddRecords(records)
          log.info('Barbell Strength workouts added')
        } catch (error) {
          log.error('Failed to add Barbell Strength workouts', error)
        }
      }
    )
  }

  /**
   * On confirmation, add standard measurements into the database.
   */
  async function onAddStandardMeasurements() {
    confirmDialog(
      'Add Standard Measurements',
      `Would you like to add the standard measurements into the database?`,
      Icon.INFO,
      'info',
      async () => {
        try {
          const records: DatabaseRecord[] = [
            {
              [DatabaseField.TYPE]: DatabaseType.MEASUREMENT,
              [DatabaseField.ID]: '43e3fc4e-b419-468c-9888-b5e072d81dfb', // From Fitness Tracker v16
              [DatabaseField.NAME]: 'Body Fat',
              [DatabaseField.DESCRIPTION]: 'Body fat percentage.',
              [DatabaseField.IS_FAVORITED]: false,
              [DatabaseField.IS_ENABLED]: true,
              [DatabaseField.MEASUREMENT_INPUTS]: [MeasurementInput.PERCENT],
            } as Measurement,
            {
              [DatabaseField.TYPE]: DatabaseType.MEASUREMENT,
              [DatabaseField.ID]: 'b4450018-1506-450f-a429-9903aded5c9b', // From Fitness Tracker v16
              [DatabaseField.NAME]: 'Body Weight',
              [DatabaseField.DESCRIPTION]: 'Body weight in pounds.',
              [DatabaseField.IS_FAVORITED]: false,
              [DatabaseField.IS_ENABLED]: true,
              [DatabaseField.MEASUREMENT_INPUTS]: [MeasurementInput.LBS],
            } as Measurement,
            {
              [DatabaseField.TYPE]: DatabaseType.MEASUREMENT,
              [DatabaseField.ID]: '880cb344-e537-4f0f-bad4-e212a6df51cd', // From Fitness Tracker v16
              [DatabaseField.NAME]: 'Chest',
              [DatabaseField.DESCRIPTION]: 'Chest circumference in inches.',
              [DatabaseField.IS_FAVORITED]: false,
              [DatabaseField.IS_ENABLED]: true,
              [DatabaseField.MEASUREMENT_INPUTS]: [MeasurementInput.INCHES],
            } as Measurement,
            {
              [DatabaseField.TYPE]: DatabaseType.MEASUREMENT,
              [DatabaseField.ID]: 'e126e959-1675-4b3b-866c-261e453d8dae', // From Fitness Tracker v16
              [DatabaseField.NAME]: 'Left Bicep',
              [DatabaseField.DESCRIPTION]: 'Left bicep circumference in inches.',
              [DatabaseField.IS_FAVORITED]: false,
              [DatabaseField.IS_ENABLED]: true,
              [DatabaseField.MEASUREMENT_INPUTS]: [MeasurementInput.INCHES],
            } as Measurement,
            {
              [DatabaseField.TYPE]: DatabaseType.MEASUREMENT,
              [DatabaseField.ID]: '09108d87-8337-4424-83a1-1ee5be5e8585', // From Fitness Tracker v16
              [DatabaseField.NAME]: 'Left Calf',
              [DatabaseField.DESCRIPTION]: 'Left calf circumference in inches.',
              [DatabaseField.IS_FAVORITED]: false,
              [DatabaseField.IS_ENABLED]: true,
              [DatabaseField.MEASUREMENT_INPUTS]: [MeasurementInput.INCHES],
            } as Measurement,
            {
              [DatabaseField.TYPE]: DatabaseType.MEASUREMENT,
              [DatabaseField.ID]: '96c7229d-91e8-4470-b0a9-ebb1234fe6e7', // From Fitness Tracker v16
              [DatabaseField.NAME]: 'Left Forearm',
              [DatabaseField.DESCRIPTION]: 'Left forearm circumference in inches.',
              [DatabaseField.IS_FAVORITED]: false,
              [DatabaseField.IS_ENABLED]: true,
              [DatabaseField.MEASUREMENT_INPUTS]: [MeasurementInput.INCHES],
            } as Measurement,
            {
              [DatabaseField.TYPE]: DatabaseType.MEASUREMENT,
              [DatabaseField.ID]: '3e3d0d91-3280-491d-967e-d56dcfc51520', // From Fitness Tracker v16
              [DatabaseField.NAME]: 'Left Thigh',
              [DatabaseField.DESCRIPTION]: 'Left thigh circumference in inches.',
              [DatabaseField.IS_FAVORITED]: false,
              [DatabaseField.IS_ENABLED]: true,
              [DatabaseField.MEASUREMENT_INPUTS]: [MeasurementInput.INCHES],
            } as Measurement,
            {
              [DatabaseField.TYPE]: DatabaseType.MEASUREMENT,
              [DatabaseField.ID]: '0090f468-5917-4124-98bd-1e7711ab360e', // From Fitness Tracker v16
              [DatabaseField.NAME]: 'Neck',
              [DatabaseField.DESCRIPTION]: 'Neck circumference in inches.',
              [DatabaseField.IS_FAVORITED]: false,
              [DatabaseField.IS_ENABLED]: true,
              [DatabaseField.MEASUREMENT_INPUTS]: [MeasurementInput.INCHES],
            } as Measurement,
            {
              [DatabaseField.TYPE]: DatabaseType.MEASUREMENT,
              [DatabaseField.ID]: '9fddbad2-ba89-4476-95e4-10d9969e782c', // From Fitness Tracker v16
              [DatabaseField.NAME]: 'Right Bicep',
              [DatabaseField.DESCRIPTION]: 'Right bicep circumference in inches.',
              [DatabaseField.IS_FAVORITED]: false,
              [DatabaseField.IS_ENABLED]: true,
              [DatabaseField.MEASUREMENT_INPUTS]: [MeasurementInput.INCHES],
            } as Measurement,
            {
              [DatabaseField.TYPE]: DatabaseType.MEASUREMENT,
              [DatabaseField.ID]: '0ee16da1-3c8d-48fc-9af1-41ec09cf6317', // From Fitness Tracker v16
              [DatabaseField.NAME]: 'Right Calf',
              [DatabaseField.DESCRIPTION]: 'Right calf circumference in inches.',
              [DatabaseField.IS_FAVORITED]: false,
              [DatabaseField.IS_ENABLED]: true,
              [DatabaseField.MEASUREMENT_INPUTS]: [MeasurementInput.INCHES],
            } as Measurement,
            {
              [DatabaseField.TYPE]: DatabaseType.MEASUREMENT,
              [DatabaseField.ID]: 'fa4c25c7-e1d5-48bf-975a-4fdfd2305646', // From Fitness Tracker v16
              [DatabaseField.NAME]: 'Right Forearm',
              [DatabaseField.DESCRIPTION]: 'Right forearm circumference in inches.',
              [DatabaseField.IS_FAVORITED]: false,
              [DatabaseField.IS_ENABLED]: true,
              [DatabaseField.MEASUREMENT_INPUTS]: [MeasurementInput.INCHES],
            } as Measurement,
            {
              [DatabaseField.TYPE]: DatabaseType.MEASUREMENT,
              [DatabaseField.ID]: '843c6b0f-ce23-4468-9d67-dd1af076b10a', // From Fitness Tracker v16
              [DatabaseField.NAME]: 'Right Thigh',
              [DatabaseField.DESCRIPTION]: 'Right thigh circumference in inches.',
              [DatabaseField.IS_FAVORITED]: false,
              [DatabaseField.IS_ENABLED]: true,
              [DatabaseField.MEASUREMENT_INPUTS]: [MeasurementInput.INCHES],
            } as Measurement,
            {
              [DatabaseField.TYPE]: DatabaseType.MEASUREMENT,
              [DatabaseField.ID]: '222452a2-aa29-460e-85a8-4617092d1ba5', // From Fitness Tracker v16
              [DatabaseField.NAME]: 'Shoulders',
              [DatabaseField.DESCRIPTION]: 'Shoulder circumference in inches.',
              [DatabaseField.IS_FAVORITED]: false,
              [DatabaseField.IS_ENABLED]: true,
              [DatabaseField.MEASUREMENT_INPUTS]: [MeasurementInput.INCHES],
            } as Measurement,
            {
              [DatabaseField.TYPE]: DatabaseType.MEASUREMENT,
              [DatabaseField.ID]: 'ed12d669-cffd-45f7-802c-9025426341fa', // From Fitness Tracker v16
              [DatabaseField.NAME]: 'Waist',
              [DatabaseField.DESCRIPTION]: 'Waist circumference in inches at the belly button.',
              [DatabaseField.IS_FAVORITED]: false,
              [DatabaseField.IS_ENABLED]: true,
              [DatabaseField.MEASUREMENT_INPUTS]: [MeasurementInput.INCHES],
            } as Measurement,
            {
              [DatabaseField.TYPE]: DatabaseType.MEASUREMENT,
              [DatabaseField.ID]: '417b47fd-bb32-4f28-a887-e5f0d50f37b5', // New!
              [DatabaseField.NAME]: 'Heart Rate',
              [DatabaseField.DESCRIPTION]: 'Heart rate in beats per minute.',
              [DatabaseField.IS_FAVORITED]: false,
              [DatabaseField.IS_ENABLED]: true,
              [DatabaseField.MEASUREMENT_INPUTS]: [MeasurementInput.BEATS_PER_MINUTE],
            } as Measurement,
            {
              [DatabaseField.TYPE]: DatabaseType.MEASUREMENT,
              [DatabaseField.ID]: '40968b77-cc2a-4f07-b812-a48bb459c2bc', // New!
              [DatabaseField.NAME]: 'Blood Pressure',
              [DatabaseField.DESCRIPTION]: 'Blood pressure systolic and diastolic reading.',
              [DatabaseField.IS_FAVORITED]: false,
              [DatabaseField.IS_ENABLED]: true,
              [DatabaseField.MEASUREMENT_INPUTS]: [
                MeasurementInput.BP_SYSTOLIC,
                MeasurementInput.BP_DIASTOLIC,
              ],
            } as Measurement,
          ]

          await DB.bulkAddRecords(records)
          log.info('Standard measurements added')
        } catch (error) {
          log.error('Failed to add standard measurements', error)
        }
      }
    )
  }

  return { onAddBarbellStrengthWorkouts, onAddStandardMeasurements }
}

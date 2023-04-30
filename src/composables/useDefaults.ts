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
              [DatabaseField.EXERCISE_INPUTS]: [ExerciseInput.REPS, ExerciseInput.WEIGHT_LBS],
            } as Exercise,
            {
              [DatabaseField.TYPE]: DatabaseType.EXERCISE,
              [DatabaseField.ID]: 'd681459e-10c8-40ae-94e9-9b06b7c40367', // From Fitness Tracker v16 (Alpha)
              [DatabaseField.NAME]: 'Barbell Bench Press',
              [DatabaseField.DESCRIPTION]: 'Lying barbell bench press chest exercise.',
              [DatabaseField.IS_FAVORITED]: false,
              [DatabaseField.IS_ENABLED]: true,
              [DatabaseField.EXERCISE_INPUTS]: [ExerciseInput.REPS, ExerciseInput.WEIGHT_LBS],
            } as Exercise,
            {
              [DatabaseField.TYPE]: DatabaseType.EXERCISE,
              [DatabaseField.ID]: '08b12cc1-d4b9-4d22-82db-9e33b3e5c3fa', // From Fitness Tracker v16 (Alpha)
              [DatabaseField.NAME]: 'Barbell Standing Rows',
              [DatabaseField.DESCRIPTION]:
                'Standing barbell rows where you hinge at the waist and pull the bar up into your stomach.',
              [DatabaseField.IS_FAVORITED]: false,
              [DatabaseField.IS_ENABLED]: true,
              [DatabaseField.EXERCISE_INPUTS]: [ExerciseInput.REPS, ExerciseInput.WEIGHT_LBS],
            } as Exercise,
            {
              [DatabaseField.TYPE]: DatabaseType.EXERCISE,
              [DatabaseField.ID]: 'cc279615-91a6-42ac-a073-4339e7c2034f', // From Fitness Tracker v16 (Beta)
              [DatabaseField.NAME]: 'Barbell Overhead Press',
              [DatabaseField.DESCRIPTION]:
                'Standing barbell overhead press. Flex your glutes and abs to keep your back straight while pushing the bar above your head.',
              [DatabaseField.IS_FAVORITED]: false,
              [DatabaseField.IS_ENABLED]: true,
              [DatabaseField.EXERCISE_INPUTS]: [ExerciseInput.REPS, ExerciseInput.WEIGHT_LBS],
            } as Exercise,
            {
              [DatabaseField.TYPE]: DatabaseType.EXERCISE,
              [DatabaseField.ID]: 'b8f1a60e-7f21-4f62-8757-d9b371bffd45', // From Fitness Tracker v16 (Beta)
              [DatabaseField.NAME]: 'Barbell Deadlift',
              [DatabaseField.DESCRIPTION]:
                'Standing barbell deadlift. Keep your back straight and flexed while lifting with your legs and lower back.',
              [DatabaseField.IS_FAVORITED]: false,
              [DatabaseField.IS_ENABLED]: true,
              [DatabaseField.EXERCISE_INPUTS]: [ExerciseInput.REPS, ExerciseInput.WEIGHT_LBS],
            } as Exercise,
            {
              [DatabaseField.TYPE]: DatabaseType.WORKOUT,
              [DatabaseField.ID]: '2158e1b2-27e0-4012-bb14-3846b3ee1d6a', // From Fitness Tracker v16
              [DatabaseField.NAME]: 'Barbell Strength - A',
              [DatabaseField.DESCRIPTION]:
                'Workout A of a barbell strength building program where you alternate between this and workout B. Do this workout 1-2 times per week.',
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
                'Workout B of a barbell strength building program where you alternate between this and workout A. Do this workout 1-2 times per week. You should only do 1 set of the Barbell Deadlift exercise in this program.',
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
          log.info('Barbell Strength workouts added', { newRecords: records?.length ?? 0 })
        } catch (error) {
          log.error('Error adding Barbell Strength workouts', error)
        }
      }
    )
  }

  /**
   * On confirmation, add the stretch routine into the database.
   */
  async function onAddStretchRoutine() {
    confirmDialog(
      'Add Stretch Routine',
      `Would you like to add the Stretch Routine into the database?`,
      Icon.INFO,
      'info',
      async () => {
        try {
          const records: DatabaseRecord[] = [
            {
              [DatabaseField.TYPE]: DatabaseType.EXERCISE,
              [DatabaseField.ID]: 'e0cd33be-e28a-46c3-80e6-263240ad5b87',
              [DatabaseField.NAME]: 'Lying Glute Stretch',
              [DatabaseField.DESCRIPTION]:
                'Lying on your back, bring your knee to your chest and then across your body. Hold for 30 seconds and then repeat on the other side.',
              [DatabaseField.IS_FAVORITED]: false,
              [DatabaseField.IS_ENABLED]: true,
              [DatabaseField.EXERCISE_INPUTS]: [], // No inputs (records nothing)
            } as Exercise,
            {
              [DatabaseField.TYPE]: DatabaseType.EXERCISE,
              [DatabaseField.ID]: '9007a082-249b-48b7-ba59-463d58a20ba5',
              [DatabaseField.NAME]: 'Pigeon Stretch',
              [DatabaseField.DESCRIPTION]:
                'Bring one leg in front of you at an angle with the other behind you. Hold for 30 seconds and then repeat on the other side.',
              [DatabaseField.IS_FAVORITED]: false,
              [DatabaseField.IS_ENABLED]: true,
              [DatabaseField.EXERCISE_INPUTS]: [], // No inputs (records nothing)
            } as Exercise,
            {
              [DatabaseField.TYPE]: DatabaseType.EXERCISE,
              [DatabaseField.ID]: '8653a6cf-8d26-4115-bda3-d28598065d02',
              [DatabaseField.NAME]: 'Frog Stretch',
              [DatabaseField.DESCRIPTION]:
                'Get on all fours and spread your knees apart. Hold for 30 seconds.',
              [DatabaseField.IS_FAVORITED]: false,
              [DatabaseField.IS_ENABLED]: true,
              [DatabaseField.EXERCISE_INPUTS]: [], // No inputs (records nothing)
            } as Exercise,
            {
              [DatabaseField.TYPE]: DatabaseType.EXERCISE,
              [DatabaseField.ID]: 'a6e35a70-9249-4515-a45f-6b7787e23156',
              [DatabaseField.NAME]: 'Standing Quad Stretch',
              [DatabaseField.DESCRIPTION]:
                'Standing on one leg, bring your other leg up behind you. Hold for 30 seconds and then repeat on the other side.',
              [DatabaseField.IS_FAVORITED]: false,
              [DatabaseField.IS_ENABLED]: true,
              [DatabaseField.EXERCISE_INPUTS]: [], // No inputs (records nothing)
            } as Exercise,
            {
              [DatabaseField.TYPE]: DatabaseType.EXERCISE,
              [DatabaseField.ID]: '7f40466f-8621-4567-9181-5fd45fa2418b',
              [DatabaseField.NAME]: 'Standing Toe Touch Stretch',
              [DatabaseField.DESCRIPTION]:
                'Standing with your legs straight, bend over and try to touch your toes. Hold for 30 seconds.',
              [DatabaseField.IS_FAVORITED]: false,
              [DatabaseField.IS_ENABLED]: true,
              [DatabaseField.EXERCISE_INPUTS]: [], // No inputs (records nothing)
            } as Exercise,
            {
              [DatabaseField.TYPE]: DatabaseType.EXERCISE,
              [DatabaseField.ID]: 'a291154a-bd22-4738-8559-0e4ee48e570d',
              [DatabaseField.NAME]: 'Standing Calf Stretch',
              [DatabaseField.DESCRIPTION]:
                'Lean against a wall with one leg in front of the other. Hold for 30 seconds and then repeat on the other side.',
              [DatabaseField.IS_FAVORITED]: false,
              [DatabaseField.IS_ENABLED]: true,
              [DatabaseField.EXERCISE_INPUTS]: [], // No inputs (records nothing)
            } as Exercise,
            {
              [DatabaseField.TYPE]: DatabaseType.EXERCISE,
              [DatabaseField.ID]: '5756d452-9272-4cbd-a144-e2b98acf8a3f',
              [DatabaseField.NAME]: 'Standing Chest Stretch',
              [DatabaseField.DESCRIPTION]:
                'Lean against a wall with your elbows behind you. Hold for 15 seconds.',
              [DatabaseField.IS_FAVORITED]: false,
              [DatabaseField.IS_ENABLED]: true,
              [DatabaseField.EXERCISE_INPUTS]: [], // No inputs (records nothing)
            } as Exercise,
            {
              [DatabaseField.TYPE]: DatabaseType.EXERCISE,
              [DatabaseField.ID]: '66c24ef3-0d53-460f-bff4-4888fb687b93',
              [DatabaseField.NAME]: 'Cross Spinal Foam Roll',
              [DatabaseField.DESCRIPTION]:
                'Foam roll your back going up and down your spine for 90 seconds.',
              [DatabaseField.IS_FAVORITED]: false,
              [DatabaseField.IS_ENABLED]: true,
              [DatabaseField.EXERCISE_INPUTS]: [], // No inputs (records nothing)
            } as Exercise,
            {
              [DatabaseField.TYPE]: DatabaseType.EXERCISE,
              [DatabaseField.ID]: '2a940995-08fc-4faf-9e52-d94f01e684b8',
              [DatabaseField.NAME]: 'Parallel Spinal Foam Roll',
              [DatabaseField.DESCRIPTION]:
                'Lay on a foam roller with it aligned with your spine. Rest with your arms out to the side for 90 seconds.',
              [DatabaseField.IS_FAVORITED]: false,
              [DatabaseField.IS_ENABLED]: true,
              [DatabaseField.EXERCISE_INPUTS]: [], // No inputs (records nothing)
            } as Exercise,
            {
              [DatabaseField.TYPE]: DatabaseType.WORKOUT,
              [DatabaseField.ID]: '80add653-aa96-4253-9d94-a30cb10cfa5f',
              [DatabaseField.NAME]: 'Stretch Routine',
              [DatabaseField.DESCRIPTION]:
                'Simple routine with a variety of stretches focusing on larger muscle groups to help you relax and recover. Do this routine after a workout or every day if possible.',
              [DatabaseField.IS_FAVORITED]: false,
              [DatabaseField.IS_ENABLED]: true,
              [DatabaseField.EXERCISE_IDS]: [
                'e0cd33be-e28a-46c3-80e6-263240ad5b87',
                '9007a082-249b-48b7-ba59-463d58a20ba5',
                '8653a6cf-8d26-4115-bda3-d28598065d02',
                'a6e35a70-9249-4515-a45f-6b7787e23156',
                '7f40466f-8621-4567-9181-5fd45fa2418b',
                'a291154a-bd22-4738-8559-0e4ee48e570d',
                '5756d452-9272-4cbd-a144-e2b98acf8a3f',
                '66c24ef3-0d53-460f-bff4-4888fb687b93',
                '2a940995-08fc-4faf-9e52-d94f01e684b8',
              ],
            } as Workout,
          ]

          await DB.bulkAddRecords(records)
          log.info('Stretch Routine added', { newRecords: records?.length ?? 0 })
        } catch (error) {
          log.error('Error adding Stretch Routine', error)
        }
      }
    )
  }

  /**
   * On confirmation, add the carpal tunnel routine into the database.
   */
  async function onAddCarpalTunnelRoutine() {
    confirmDialog(
      'Add Carpal Tunnel Routine',
      `Would you like to add the Carpal Tunnel Routine into the database?`,
      Icon.INFO,
      'info',
      async () => {
        try {
          const records: DatabaseRecord[] = [
            {
              [DatabaseField.TYPE]: DatabaseType.EXERCISE,
              [DatabaseField.ID]: 'db513a6b-b0c0-497a-a034-7456d072d98b',
              [DatabaseField.NAME]: 'Median Nerve Sliders',
              [DatabaseField.DESCRIPTION]:
                'Bring you hand in front of your face, then fully extend your arm to the side while stretching your hand back and forth. Repeat 15 times on each hand.',
              [DatabaseField.IS_FAVORITED]: false,
              [DatabaseField.IS_ENABLED]: true,
              [DatabaseField.EXERCISE_INPUTS]: [], // No inputs (records nothing)
            } as Exercise,
            {
              [DatabaseField.TYPE]: DatabaseType.EXERCISE,
              [DatabaseField.ID]: '3776575a-3c89-4286-904f-f724bd143aca',
              [DatabaseField.NAME]: 'Fist, Knuckle, Finger Extensions',
              [DatabaseField.DESCRIPTION]:
                'Start with your hands in a fist, then role out to your knuckles, and then extend your fingers. Repeat 15 times.',
              [DatabaseField.IS_FAVORITED]: false,
              [DatabaseField.IS_ENABLED]: true,
              [DatabaseField.EXERCISE_INPUTS]: [], // No inputs (records nothing)
            } as Exercise,
            {
              [DatabaseField.TYPE]: DatabaseType.EXERCISE,
              [DatabaseField.ID]: 'ceac93d5-6db9-4cca-bcaf-570a25e4a282',
              [DatabaseField.NAME]: 'Finger Tip Flexion',
              [DatabaseField.DESCRIPTION]:
                'Flex each of your finger (including your thumbs) without bending your knuckles if possible one at a time. Repeat 15 times per finger.',
              [DatabaseField.IS_FAVORITED]: false,
              [DatabaseField.IS_ENABLED]: true,
              [DatabaseField.EXERCISE_INPUTS]: [], // No inputs (records nothing)
            } as Exercise,
            {
              [DatabaseField.TYPE]: DatabaseType.EXERCISE,
              [DatabaseField.ID]: 'e7ddd519-807e-456e-9cb5-7496be50cb9c',
              [DatabaseField.NAME]: 'Finger Knuckle Flexion',
              [DatabaseField.DESCRIPTION]:
                'Flex each of your finger knuckles one at a time. Repeat 15 times per finger (minus the thumb).',
              [DatabaseField.IS_FAVORITED]: false,
              [DatabaseField.IS_ENABLED]: true,
              [DatabaseField.EXERCISE_INPUTS]: [], // No inputs (records nothing)
            } as Exercise,
            {
              [DatabaseField.TYPE]: DatabaseType.EXERCISE,
              [DatabaseField.ID]: 'ee84a9f7-961c-4dbc-bf97-aa9f5b8a353e',
              [DatabaseField.NAME]: 'In/Out Thumb Stretch',
              [DatabaseField.DESCRIPTION]:
                'Touch your thumbs as close to the base of your pinky as possible, then open your hands and spread them far apart. Repeat 15 times.',
              [DatabaseField.IS_FAVORITED]: false,
              [DatabaseField.IS_ENABLED]: true,
              [DatabaseField.EXERCISE_IDS]: [], // No inputs (records nothing)
            } as Exercise,
            {
              [DatabaseField.TYPE]: DatabaseType.EXERCISE,
              [DatabaseField.ID]: 'f66d5c5f-03fc-43a4-b0f3-af0af58b41a7',
              [DatabaseField.NAME]: 'Gentle Wrist Stretch',
              [DatabaseField.DESCRIPTION]:
                'Relax your arms in a T-Rex position, then bring them back while opening your hands for a brief stretch. Repeat 15 times.',
              [DatabaseField.IS_FAVORITED]: false,
              [DatabaseField.IS_ENABLED]: true,
              [DatabaseField.EXERCISE_IDS]: [], // No inputs (records nothing)
            } as Exercise,
            {
              [DatabaseField.TYPE]: DatabaseType.WORKOUT,
              [DatabaseField.ID]: 'cba94a35-d450-4d0f-955f-df6315522622',
              [DatabaseField.NAME]: 'Carpal Tunnel Routine',
              [DatabaseField.DESCRIPTION]:
                'Physical therapy routine for carpal tunnel syndrome. Do this routine on days where you did any heavy activity with your wrists (including workouts).',
              [DatabaseField.IS_FAVORITED]: false,
              [DatabaseField.IS_ENABLED]: true,
              [DatabaseField.EXERCISE_IDS]: [
                'db513a6b-b0c0-497a-a034-7456d072d98b',
                '3776575a-3c89-4286-904f-f724bd143aca',
                'ceac93d5-6db9-4cca-bcaf-570a25e4a282',
                'e7ddd519-807e-456e-9cb5-7496be50cb9c',
                'ee84a9f7-961c-4dbc-bf97-aa9f5b8a353e',
                'f66d5c5f-03fc-43a4-b0f3-af0af58b41a7',
              ],
            } as Workout,
          ]

          await DB.bulkAddRecords(records)
          log.info('Carpal Tunnel Routine added', { newRecords: records?.length ?? 0 })
        } catch (error) {
          log.error('Error adding Carpal Tunnel Routine', error)
        }
      }
    )
  }

  /**
   * On confirmation, adds the deep breathing routine into the database.
   */
  async function onAddDeepBreathingRoutine() {
    confirmDialog(
      'Add Deep Breathing Routine',
      `Would you like to add the Deep Breathing Routine into the database?`,
      Icon.INFO,
      'info',
      async () => {
        try {
          const records: DatabaseRecord[] = [
            {
              [DatabaseField.TYPE]: DatabaseType.EXERCISE,
              [DatabaseField.ID]: '729bcb7e-6b40-4497-ba0e-8cce6b57341a',
              [DatabaseField.NAME]: 'Pursed Lip Breathing',
              [DatabaseField.DESCRIPTION]:
                'Inhale through your nose for 2 seconds, then exhale slowly through pursed lips for 4 seconds. Repeat 10 times.',
              [DatabaseField.IS_FAVORITED]: false,
              [DatabaseField.IS_ENABLED]: true,
              [DatabaseField.EXERCISE_INPUTS]: [], // No inputs (records nothing)
            } as Exercise,
            {
              [DatabaseField.TYPE]: DatabaseType.EXERCISE,
              [DatabaseField.ID]: '15092ca3-e7c8-4214-a935-8c90126cf408',
              [DatabaseField.NAME]: 'Diaphragmatic Breathing',
              [DatabaseField.DESCRIPTION]:
                'Place one hand on your chest. Inhale through your nose for 2 seconds, then contract your abdominal muscles and exhale slowly through pursed lips for 4 seconds. The hand on your chest should have minimal movement during this process. Repeat 10 times.',
              [DatabaseField.IS_FAVORITED]: false,
              [DatabaseField.IS_ENABLED]: true,
              [DatabaseField.EXERCISE_INPUTS]: [], // No inputs (records nothing)
            } as Exercise,
            {
              [DatabaseField.TYPE]: DatabaseType.EXERCISE,
              [DatabaseField.ID]: 'cd75a9c7-fed8-4c98-83db-9dc3a64725a0',
              [DatabaseField.NAME]: 'Box Breathing',
              [DatabaseField.DESCRIPTION]:
                'Inhale through your nose for 4 seconds, hold your breath for 4 seconds, exhale through your mouth for 4 seconds, then hold your breath for 4 seconds. Repeat 10 times.',
              [DatabaseField.IS_FAVORITED]: false,
              [DatabaseField.IS_ENABLED]: true,
              [DatabaseField.EXERCISE_INPUTS]: [], // No inputs (records nothing)
            } as Exercise,
            {
              [DatabaseField.TYPE]: DatabaseType.WORKOUT,
              [DatabaseField.ID]: 'b0752f64-e6ba-4d98-a981-67860d7ab665',
              [DatabaseField.NAME]: 'Deep Breathing Routine',
              [DatabaseField.DESCRIPTION]:
                'Deep breathing routine for improving lung compacity, oxygen intake, and relieving stress. Do this routine in a comfortable position (sitting or lying down) and in a quiet environment.',
              [DatabaseField.IS_FAVORITED]: false,
              [DatabaseField.IS_ENABLED]: true,
              [DatabaseField.EXERCISE_IDS]: [
                '729bcb7e-6b40-4497-ba0e-8cce6b57341a',
                '15092ca3-e7c8-4214-a935-8c90126cf408',
                'cd75a9c7-fed8-4c98-83db-9dc3a64725a0',
              ],
            } as Workout,
          ]

          await DB.bulkAddRecords(records)
          log.info('Deep Breathing Routine added', { newRecords: records?.length ?? 0 })
        } catch (error) {
          log.error('Error adding Deep Breathing Routine', error)
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
      `Would you like to add the Standard Measurements into the database?`,
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
              [DatabaseField.MEASUREMENT_INPUTS]: [MeasurementInput.PERCENTAGE],
            } as Measurement,
            // TODO - Import will have to handle where thesse are moved to from v16
            // {
            //   [DatabaseField.TYPE]: DatabaseType.MEASUREMENT,
            //   [DatabaseField.ID]: 'b4450018-1506-450f-a429-9903aded5c9b', // From Fitness Tracker v16
            //   [DatabaseField.NAME]: 'Body Weight',
            //   [DatabaseField.DESCRIPTION]: 'Body weight in pounds.',
            //   [DatabaseField.IS_FAVORITED]: false,
            //   [DatabaseField.IS_ENABLED]: true,
            //   [DatabaseField.MEASUREMENT_INPUTS]: [MeasurementInput.LBS],
            // } as Measurement,
            // {
            //   [DatabaseField.TYPE]: DatabaseType.MEASUREMENT,
            //   [DatabaseField.ID]: '880cb344-e537-4f0f-bad4-e212a6df51cd', // From Fitness Tracker v16
            //   [DatabaseField.NAME]: 'Chest',
            //   [DatabaseField.DESCRIPTION]: 'Chest circumference in inches.',
            //   [DatabaseField.IS_FAVORITED]: false,
            //   [DatabaseField.IS_ENABLED]: true,
            //   [DatabaseField.MEASUREMENT_INPUTS]: [MeasurementInput.INCHES],
            // } as Measurement,
            // {
            //   [DatabaseField.TYPE]: DatabaseType.MEASUREMENT,
            //   [DatabaseField.ID]: 'e126e959-1675-4b3b-866c-261e453d8dae', // From Fitness Tracker v16
            //   [DatabaseField.NAME]: 'Left Bicep',
            //   [DatabaseField.DESCRIPTION]: 'Left bicep circumference in inches.',
            //   [DatabaseField.IS_FAVORITED]: false,
            //   [DatabaseField.IS_ENABLED]: true,
            //   [DatabaseField.MEASUREMENT_INPUTS]: [MeasurementInput.INCHES],
            // } as Measurement,
            // {
            //   [DatabaseField.TYPE]: DatabaseType.MEASUREMENT,
            //   [DatabaseField.ID]: '09108d87-8337-4424-83a1-1ee5be5e8585', // From Fitness Tracker v16
            //   [DatabaseField.NAME]: 'Left Calf',
            //   [DatabaseField.DESCRIPTION]: 'Left calf circumference in inches.',
            //   [DatabaseField.IS_FAVORITED]: false,
            //   [DatabaseField.IS_ENABLED]: true,
            //   [DatabaseField.MEASUREMENT_INPUTS]: [MeasurementInput.INCHES],
            // } as Measurement,
            // {
            //   [DatabaseField.TYPE]: DatabaseType.MEASUREMENT,
            //   [DatabaseField.ID]: '96c7229d-91e8-4470-b0a9-ebb1234fe6e7', // From Fitness Tracker v16
            //   [DatabaseField.NAME]: 'Left Forearm',
            //   [DatabaseField.DESCRIPTION]: 'Left forearm circumference in inches.',
            //   [DatabaseField.IS_FAVORITED]: false,
            //   [DatabaseField.IS_ENABLED]: true,
            //   [DatabaseField.MEASUREMENT_INPUTS]: [MeasurementInput.INCHES],
            // } as Measurement,
            // {
            //   [DatabaseField.TYPE]: DatabaseType.MEASUREMENT,
            //   [DatabaseField.ID]: '3e3d0d91-3280-491d-967e-d56dcfc51520', // From Fitness Tracker v16
            //   [DatabaseField.NAME]: 'Left Thigh',
            //   [DatabaseField.DESCRIPTION]: 'Left thigh circumference in inches.',
            //   [DatabaseField.IS_FAVORITED]: false,
            //   [DatabaseField.IS_ENABLED]: true,
            //   [DatabaseField.MEASUREMENT_INPUTS]: [MeasurementInput.INCHES],
            // } as Measurement,
            // {
            //   [DatabaseField.TYPE]: DatabaseType.MEASUREMENT,
            //   [DatabaseField.ID]: '0090f468-5917-4124-98bd-1e7711ab360e', // From Fitness Tracker v16
            //   [DatabaseField.NAME]: 'Neck',
            //   [DatabaseField.DESCRIPTION]: 'Neck circumference in inches.',
            //   [DatabaseField.IS_FAVORITED]: false,
            //   [DatabaseField.IS_ENABLED]: true,
            //   [DatabaseField.MEASUREMENT_INPUTS]: [MeasurementInput.INCHES],
            // } as Measurement,
            // {
            //   [DatabaseField.TYPE]: DatabaseType.MEASUREMENT,
            //   [DatabaseField.ID]: '9fddbad2-ba89-4476-95e4-10d9969e782c', // From Fitness Tracker v16
            //   [DatabaseField.NAME]: 'Right Bicep',
            //   [DatabaseField.DESCRIPTION]: 'Right bicep circumference in inches.',
            //   [DatabaseField.IS_FAVORITED]: false,
            //   [DatabaseField.IS_ENABLED]: true,
            //   [DatabaseField.MEASUREMENT_INPUTS]: [MeasurementInput.INCHES],
            // } as Measurement,
            // {
            //   [DatabaseField.TYPE]: DatabaseType.MEASUREMENT,
            //   [DatabaseField.ID]: '0ee16da1-3c8d-48fc-9af1-41ec09cf6317', // From Fitness Tracker v16
            //   [DatabaseField.NAME]: 'Right Calf',
            //   [DatabaseField.DESCRIPTION]: 'Right calf circumference in inches.',
            //   [DatabaseField.IS_FAVORITED]: false,
            //   [DatabaseField.IS_ENABLED]: true,
            //   [DatabaseField.MEASUREMENT_INPUTS]: [MeasurementInput.INCHES],
            // } as Measurement,
            // {
            //   [DatabaseField.TYPE]: DatabaseType.MEASUREMENT,
            //   [DatabaseField.ID]: 'fa4c25c7-e1d5-48bf-975a-4fdfd2305646', // From Fitness Tracker v16
            //   [DatabaseField.NAME]: 'Right Forearm',
            //   [DatabaseField.DESCRIPTION]: 'Right forearm circumference in inches.',
            //   [DatabaseField.IS_FAVORITED]: false,
            //   [DatabaseField.IS_ENABLED]: true,
            //   [DatabaseField.MEASUREMENT_INPUTS]: [MeasurementInput.INCHES],
            // } as Measurement,
            // {
            //   [DatabaseField.TYPE]: DatabaseType.MEASUREMENT,
            //   [DatabaseField.ID]: '843c6b0f-ce23-4468-9d67-dd1af076b10a', // From Fitness Tracker v16
            //   [DatabaseField.NAME]: 'Right Thigh',
            //   [DatabaseField.DESCRIPTION]: 'Right thigh circumference in inches.',
            //   [DatabaseField.IS_FAVORITED]: false,
            //   [DatabaseField.IS_ENABLED]: true,
            //   [DatabaseField.MEASUREMENT_INPUTS]: [MeasurementInput.INCHES],
            // } as Measurement,
            // {
            //   [DatabaseField.TYPE]: DatabaseType.MEASUREMENT,
            //   [DatabaseField.ID]: '222452a2-aa29-460e-85a8-4617092d1ba5', // From Fitness Tracker v16
            //   [DatabaseField.NAME]: 'Shoulders',
            //   [DatabaseField.DESCRIPTION]: 'Shoulder circumference in inches.',
            //   [DatabaseField.IS_FAVORITED]: false,
            //   [DatabaseField.IS_ENABLED]: true,
            //   [DatabaseField.MEASUREMENT_INPUTS]: [MeasurementInput.INCHES],
            // } as Measurement,
            // {
            //   [DatabaseField.TYPE]: DatabaseType.MEASUREMENT,
            //   [DatabaseField.ID]: 'ed12d669-cffd-45f7-802c-9025426341fa', // From Fitness Tracker v16
            //   [DatabaseField.NAME]: 'Waist',
            //   [DatabaseField.DESCRIPTION]: 'Waist circumference in inches at the belly button.',
            //   [DatabaseField.IS_FAVORITED]: false,
            //   [DatabaseField.IS_ENABLED]: true,
            //   [DatabaseField.MEASUREMENT_INPUTS]: [MeasurementInput.INCHES],
            // } as Measurement,
            {
              [DatabaseField.TYPE]: DatabaseType.MEASUREMENT,
              [DatabaseField.ID]: '704b252e-c1da-44e2-a5e6-9aeeaee47fc7', // New!
              [DatabaseField.NAME]: 'Body Weight (+BMI)',
              [DatabaseField.DESCRIPTION]:
                'Track your body weight and have your BMI calculated automatically if your height is entered in the Settings.',
              [DatabaseField.IS_FAVORITED]: false,
              [DatabaseField.IS_ENABLED]: true,
              [DatabaseField.MEASUREMENT_INPUTS]: [MeasurementInput.BODY_WEIGHT],
            } as Measurement,
            {
              [DatabaseField.TYPE]: DatabaseType.MEASUREMENT,
              [DatabaseField.ID]: '54e887a2-c701-40a4-bb1e-c60b9dc30df6', // New!
              [DatabaseField.NAME]: 'Body Tape Measurements',
              [DatabaseField.DESCRIPTION]:
                'Track body measurements from head to toes with a tape measure. Inputs can be left blank if desired.',
              [DatabaseField.IS_FAVORITED]: false,
              [DatabaseField.IS_ENABLED]: true,
              [DatabaseField.MEASUREMENT_INPUTS]: [MeasurementInput.BODY_TAPE_MEASUREMENTS],
            } as Measurement,
            {
              [DatabaseField.TYPE]: DatabaseType.MEASUREMENT,
              [DatabaseField.ID]: '33d260cd-d6af-45ff-bf86-9733e4ea4850', // New!
              [DatabaseField.NAME]: 'Vitals',
              [DatabaseField.DESCRIPTION]:
                'Track your temperature, heart rate, blood oxygen, and blood pressure. Inputs can be left blank if desired.',
              [DatabaseField.IS_FAVORITED]: false,
              [DatabaseField.IS_ENABLED]: true,
              [DatabaseField.MEASUREMENT_INPUTS]: [MeasurementInput.VITALS],
            } as Measurement,
          ]

          await DB.bulkAddRecords(records)
          log.info('Standard Measurements added', { newRecords: records?.length ?? 0 })
        } catch (error) {
          log.error('Error adding Standard Measurements', error)
        }
      }
    )
  }

  return {
    onAddBarbellStrengthWorkouts,
    onAddStretchRoutine,
    onAddCarpalTunnelRoutine,
    onAddDeepBreathingRoutine,
    onAddStandardMeasurements,
  }
}

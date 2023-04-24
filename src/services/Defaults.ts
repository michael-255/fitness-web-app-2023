import { DatabaseField, SettingId } from '@/types/database'
import { LogRetention } from '@/types/misc'
import { uid } from 'quasar'

/**
 * Default functions for each field.
 */
export const FieldDefault = Object.freeze({
  // All
  [DatabaseField.TYPE]: () => null,
  [DatabaseField.ID]: () => uid(),
  // Settings
  [DatabaseField.VALUE]: () => null,
  // Logs - These fields are handled by the components that use them
  [DatabaseField.CREATED_TIMESTAMP]: () => null,
  [DatabaseField.SEVERITY]: () => null,
  [DatabaseField.LABEL]: () => null,
  [DatabaseField.DETAILS]: () => null,
  [DatabaseField.MESSAGE]: () => null,
  [DatabaseField.STACK]: () => null,
  // Parent
  [DatabaseField.NAME]: () => 'Example',
  [DatabaseField.DESCRIPTION]: () => '',
  [DatabaseField.IS_FAVORITED]: () => false,
  [DatabaseField.IS_ENABLED]: () => true,
  // Child
  [DatabaseField.PARENT_ID]: () => null,
  [DatabaseField.NOTE]: () => '',
  [DatabaseField.IS_ACTIVE]: () => false,
  // Workouts
  [DatabaseField.EXERCISE_IDS]: () => [],
  // Exercises
  [DatabaseField.EXERCISE_INPUTS]: () => [],
  // Measurements
  [DatabaseField.MEASUREMENT_INPUTS]: () => [],
  // Workout Results & Active Workouts
  [DatabaseField.FINISHED_TIMESTAMP]: () => null,
  [DatabaseField.EXERCISE_RESULT_IDS]: () => [],
  // Exercise Results & Active Exercises
  [DatabaseField.REPS]: () => 0,
  [DatabaseField.WEIGHT_LBS]: () => 0,
  [DatabaseField.DISTANCE_MILES]: () => 0,
  [DatabaseField.DURATION_MINUTES]: () => 0,
  [DatabaseField.RESISTANCE]: () => 0,
  // Measurement Results
  [DatabaseField.LBS]: () => 0,
  [DatabaseField.INCHES]: () => 0,
  [DatabaseField.FEET]: () => 0,
  [DatabaseField.PERCENTAGE]: () => 0,
  [DatabaseField.HEART_BPM]: () => 0,
  [DatabaseField.HEART_RATE]: () => [0, 0],
})

/**
 * Default values for each setting.
 */
export const SettingDefault = Object.freeze({
  [SettingId.DARK_MODE]: true,
  [SettingId.LOG_RETENTION_TIME]: LogRetention.THREE_MONTHS,
  [SettingId.SHOW_ALL_DATA_COLUMNS]: false,
  [SettingId.SHOW_INTRODUCTION]: true,
  [SettingId.SHOW_CONSOLE_LOGS]: false,
  [SettingId.SHOW_INFO_MESSAGES]: true,
})

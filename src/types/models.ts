import type {
  DatabaseField,
  DatabaseType,
  ExerciseInput,
  MeasurementInput,
  SettingId,
  SettingValue,
  Severity,
} from '@/types/database'
import type { Optional } from '@/types/misc'

/**
 * All database record types. Cast your result to the one you are currently working with if known.
 * Cast back to this type when saving or updating the database.
 */
export interface DatabaseRecord {
  // All
  [DatabaseField.TYPE]: DatabaseType
  [DatabaseField.ID]: string | SettingId
  // Settings
  [DatabaseField.VALUE]?: SettingValue
  // Logs
  [DatabaseField.CREATED_TIMESTAMP]?: number
  [DatabaseField.SEVERITY]?: Severity
  [DatabaseField.LABEL]?: string
  [DatabaseField.DETAILS]?: Optional<any>
  [DatabaseField.MESSAGE]?: Optional<string>
  [DatabaseField.STACK]?: Optional<string>
  // Parent
  [DatabaseField.NAME]?: string
  [DatabaseField.DESCRIPTION]?: Optional<string>
  [DatabaseField.IS_FAVORITED]?: boolean
  [DatabaseField.IS_ENABLED]?: boolean
  // Child
  [DatabaseField.PARENT_ID]?: string
  [DatabaseField.NOTE]?: Optional<string>
  [DatabaseField.IS_ACTIVE]?: boolean
  // Workouts
  [DatabaseField.EXERCISE_IDS]?: string[]
  // Exercises
  [DatabaseField.EXERCISE_INPUTS]?: ExerciseInput[]
  // Measurements
  [DatabaseField.MEASUREMENT_INPUTS]?: MeasurementInput[]
  // Workout Results & Active Workouts
  [DatabaseField.FINISHED_TIMESTAMP]?: Optional<number>
  [DatabaseField.EXERCISE_RESULT_IDS]?: string[]
  // Exercise Results & Active Exercises (all arrays due to sets)
  [DatabaseField.REPS]?: number[]
  [DatabaseField.WEIGHT_LBS]?: number[]
  [DatabaseField.DISTANCE_MILES]?: number[]
  [DatabaseField.DURATION_MINUTES]?: number[]
  [DatabaseField.RESISTANCE]?: number[]
  // Measurement Results
  [DatabaseField.PERCENT]?: number
  [DatabaseField.LBS]?: number
  [DatabaseField.FEET]?: number
  [DatabaseField.INCHES]?: number
  [DatabaseField.HEART_BPM]?: number
  [DatabaseField.HEART_RATE]?: [number, number] // Systolic,Diastolic
}

/**
 * Core app setting type.
 */
export type Setting = Pick<
  DatabaseRecord,
  DatabaseField.TYPE | DatabaseField.ID | DatabaseField.VALUE
>

/**
 * Core app log type.
 */
export type Log = Pick<
  DatabaseRecord,
  | DatabaseField.TYPE
  | DatabaseField.ID
  | DatabaseField.CREATED_TIMESTAMP
  | DatabaseField.SEVERITY
  | DatabaseField.LABEL
  | DatabaseField.DETAILS
  | DatabaseField.MESSAGE
  | DatabaseField.STACK
>

/**
 * Workout parent type.
 */
export type Workout = Pick<
  DatabaseRecord,
  | DatabaseField.TYPE
  | DatabaseField.ID
  | DatabaseField.NAME
  | DatabaseField.DESCRIPTION
  | DatabaseField.IS_FAVORITED
  | DatabaseField.IS_ENABLED
  | DatabaseField.EXERCISE_IDS
>

/**
 * Exercise parent type.
 */
export type Exercise = Pick<
  DatabaseRecord,
  | DatabaseField.TYPE
  | DatabaseField.ID
  | DatabaseField.NAME
  | DatabaseField.DESCRIPTION
  | DatabaseField.IS_FAVORITED
  | DatabaseField.IS_ENABLED
  | DatabaseField.EXERCISE_INPUTS
>

/**
 * Measurement parent type.
 */
export type Measurement = Pick<
  DatabaseRecord,
  | DatabaseField.TYPE
  | DatabaseField.ID
  | DatabaseField.NAME
  | DatabaseField.DESCRIPTION
  | DatabaseField.IS_FAVORITED
  | DatabaseField.IS_ENABLED
  | DatabaseField.MEASUREMENT_INPUTS
>

/**
 * Workout result child type.
 */
export type WorkoutResult = Pick<
  DatabaseRecord,
  | DatabaseField.TYPE
  | DatabaseField.ID
  | DatabaseField.CREATED_TIMESTAMP
  | DatabaseField.PARENT_ID
  | DatabaseField.NOTE
  | DatabaseField.IS_ACTIVE
  | DatabaseField.FINISHED_TIMESTAMP
  | DatabaseField.EXERCISE_RESULT_IDS
>

/**
 * Exercise result child type.
 */
export type ExerciseResult = Pick<
  DatabaseRecord,
  | DatabaseField.TYPE
  | DatabaseField.ID
  | DatabaseField.CREATED_TIMESTAMP
  | DatabaseField.PARENT_ID
  | DatabaseField.NOTE
  | DatabaseField.IS_ACTIVE
  | DatabaseField.REPS
  | DatabaseField.WEIGHT_LBS
  | DatabaseField.DISTANCE_MILES
  | DatabaseField.DURATION_MINUTES
  | DatabaseField.RESISTANCE
>

/**
 * Measurement result child type.
 */
export type MeasurementResult = Pick<
  DatabaseRecord,
  | DatabaseField.TYPE
  | DatabaseField.ID
  | DatabaseField.CREATED_TIMESTAMP
  | DatabaseField.PARENT_ID
  | DatabaseField.NOTE
  | DatabaseField.IS_ACTIVE
  | DatabaseField.PERCENT
  | DatabaseField.LBS
  | DatabaseField.FEET
  | DatabaseField.INCHES
  | DatabaseField.HEART_BPM
  | DatabaseField.HEART_RATE
>

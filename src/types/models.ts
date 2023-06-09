import type {
  BodyTapeMeasurements,
  BodyWeightBmi,
  DatabaseField,
  DatabaseType,
  ExerciseInput,
  MeasurementInput,
  SettingId,
  SettingValue,
  Severity,
  Vitals,
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
  // Exercise Results & Active Exercises (each array index is an Exercise Set)
  [DatabaseField.REPS]?: Optional<number>[]
  [DatabaseField.WEIGHT_LBS]?: Optional<number>[]
  [DatabaseField.DISTANCE_MILES]?: Optional<number>[]
  [DatabaseField.DURATION_MINUTES]?: Optional<number>[]
  [DatabaseField.RESISTANCE]?: Optional<number>[]
  // Measurement Results
  [DatabaseField.LBS]?: Optional<number>
  [DatabaseField.INCHES]?: Optional<number>
  [DatabaseField.PERCENTAGE]?: Optional<number>
  [DatabaseField.BODY_WEIGHT_BMI]?: BodyWeightBmi
  [DatabaseField.BODY_TAPE_MEASUREMENTS]?: BodyTapeMeasurements
  [DatabaseField.VITALS]?: Vitals
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
  | DatabaseField.LBS
  | DatabaseField.INCHES
  | DatabaseField.PERCENTAGE
  | DatabaseField.BODY_WEIGHT_BMI
  | DatabaseField.BODY_TAPE_MEASUREMENTS
  | DatabaseField.VITALS
>

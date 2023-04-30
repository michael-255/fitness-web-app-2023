import type { LogRetention, Optional } from '@/types/misc'

/**
 * Current database version. Change this to force a new database to be created for users.
 * Cannot use records from the previous database without importing it through the Settings if version changes.
 */
export const DatabaseVersion = 1

/**
 * All database types that separate the different types of records.
 * Using compound indices instead of splitting records by table.
 * The order here determines the order when retrieving these types.
 * Use the plural version of the type for the value.
 */
export enum DatabaseType {
  LOG = 'Logs', // First in order
  SETTING = 'Settings',
  WORKOUT = 'Workouts',
  EXERCISE = 'Exercises',
  MEASUREMENT = 'Measurements',
  WORKOUT_RESULT = 'Workout Results',
  EXERCISE_RESULT = 'Exercise Results',
  MEASUREMENT_RESULT = 'Measurement Results',
}

/**
 * Parent types in the database.
 */
export type DatabaseParentType =
  | DatabaseType.WORKOUT
  | DatabaseType.EXERCISE
  | DatabaseType.MEASUREMENT

/**
 * Child types to parent types in the database.
 */
export type DatabaseChildType =
  | DatabaseType.WORKOUT_RESULT
  | DatabaseType.EXERCISE_RESULT
  | DatabaseType.MEASUREMENT_RESULT

/**
 * Each database type has a category. These determine how certain parts of the app treat them.
 */
export enum DatabaseCategory {
  INTERNAL = 'Internal',
  PARENT = 'Parent',
  CHILD = 'Child',
}

/**
 * All field names used by database records.
 * Update database models and database constants when adding new fields.
 */
export enum DatabaseField {
  // All
  TYPE = 'type',
  ID = 'id',
  // Settings
  VALUE = 'value',
  // Logs
  CREATED_TIMESTAMP = 'createdTimestamp',
  SEVERITY = 'severity',
  LABEL = 'label',
  DETAILS = 'details',
  MESSAGE = 'message',
  STACK = 'stack',
  // Parent
  NAME = 'name',
  DESCRIPTION = 'description',
  IS_FAVORITED = 'isFavorited',
  IS_ENABLED = 'isEnabled',
  // Child
  PARENT_ID = 'parentId',
  NOTE = 'note',
  IS_ACTIVE = 'isActive', // For Active Workouts and Active Exercises
  // Workouts
  EXERCISE_IDS = 'exerciseIds',
  // Exercises
  EXERCISE_INPUTS = 'exerciseInputs',
  // Measurements
  MEASUREMENT_INPUTS = 'measurementInputs',
  // Workout Results & Active Workouts
  FINISHED_TIMESTAMP = 'finishedTimestamp',
  EXERCISE_RESULT_IDS = 'exerciseResultIds',
  // Exercise Results & Active Exercises
  REPS = 'reps',
  WEIGHT_LBS = 'weightLbs',
  DISTANCE_MILES = 'distanceMiles',
  DURATION_MINUTES = 'durationMinutes',
  RESISTANCE = 'resistance',
  // Measurement Results
  LBS = 'lbs',
  INCHES = 'inches',
  PERCENTAGE = 'percentage',
  BMI = 'bmi',
  VITALS = 'vitals',
  BODY_WEIGHT = 'bodyWeight',
  BODY_TAPE_MEASUREMENTS = 'bodyTapeMeasurements',
}

/**
 * Setting values are restricted to a few primitive types.
 */
export type SettingValue =
  | string
  | number
  | boolean
  | DatabaseType
  | LogRetention
  | YourHeight
  | null
  | null[]

/**
 * Tuple for user height values.
 * @param 0 - height (ft)
 * @param 1 - height (in)
 */
export type YourHeight = [Optional<number>, Optional<number>]

/**
 * Measurement result Body Mass Index inputs.
 */
export type BMI = [
  Optional<number>, // height (ft)
  Optional<number>, // height (in)
  Optional<number>, // weight (lbs)
  Optional<number> // bmi (calculated)
]

/**
 * Measurement result Body Weight inputs.
 * @param 0 - weight (lbs)
 * @param 1 - bmi (auto calculated based on height and weight)
 */
export type BodyWeight = [Optional<number>, Optional<number>]

/**
 * Measurement result Vitals inputs.
 */
export type Vitals = [
  Optional<number>, // temperature (°F)
  Optional<number>, // heart rate (bpm)
  Optional<number>, // blood oxygen (%)
  Optional<number>, // blood pressure (systolic)
  Optional<number> // blood pressure (diastolic)
]

/**
 * Measurement result Body Tape Measurements inputs.
 */
export type BodyTapeMeasurements = [
  Optional<number>, // neck
  Optional<number>, // chest
  Optional<number>, // shoulders
  Optional<number>, // right bicep
  Optional<number>, // left bicep
  Optional<number>, // right forearm
  Optional<number>, // left forearm
  Optional<number>, // waist
  Optional<number>, // right thigh
  Optional<number>, // left thigh
  Optional<number>, // right calf
  Optional<number> // left calf
]

/**
 * The only valid setting ids.
 */
export enum SettingId {
  YOUR_HEIGHT = 'your-height',
  SHOW_INTRODUCTION = 'show-introduction',
  SHOW_DASHBOARD_DESCRIPTIONS = 'show-dashboard-descriptions',
  DARK_MODE = 'dark-mode',
  SHOW_ALL_DATA_COLUMNS = 'show-all-data-columns',
  SHOW_CONSOLE_LOGS = 'show-console-logs',
  SHOW_INFO_MESSAGES = 'show-info-messages',
  LOG_RETENTION_TIME = 'log-retention-time',
}

/**
 * Log severity levels.
 */
export enum Severity {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

/**
 * Available measurement input types.
 */
export enum MeasurementInput {
  LBS = 'Lbs',
  INCHES = 'Inches',
  FEET = 'Feet',
  PERCENTAGE = 'Percentage',
  BMI = 'BMI', // Body mass index
  VITALS = 'Vitals',
  BODY_TAPE_MEASUREMENTS = 'Body Tape Measurements',
}

/**
 * Available exercise input types.
 */
export enum ExerciseInput {
  NO_SETS = 'No Sets',
  REPS = 'Reps',
  WEIGHT_LBS = 'Weight (lbs)',
  DISTANCE_MILES = 'Distance (miles)',
  DURATION_MINUTES = 'Duration (minutes)',
  RESISTANCE = 'Resistence',
}

/**
 * Actions that a database type can support. Used for action and routing controls.
 */
export enum DatabaseAction {
  INSPECT = 'Inspect',
  CREATE = 'Create',
  EDIT = 'Edit',
  DELETE = 'Delete',
  CHARTS = 'Charts',
}

/**
 * Record issues for record curing.
 * None: None issue is used as a filter to be removed before displaying.
 * Unused: Parent record with no child records.
 * Orphaned: Child record with no parent record.
 */
export enum RecordIssue {
  NONE = 'None',
  UNUSED = 'Unused',
  ORPHANED = 'Orphaned',
}

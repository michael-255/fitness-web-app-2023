import {
  DatabaseField,
  Severity,
  type SettingValue,
  ExerciseInput,
  MeasurementInput,
} from '@/types/database'
import type { AppObject, FieldBlueprint } from '@/types/misc'
import { getDisplayDate } from '@/utils/common'
import { defineAsyncComponent } from 'vue'

/*
This file contains field property objects used by many components that interact with database records.
Do NOT mutate these objects as they are used by multiple components.
*/

/**
 * Type field used by all records.
 */
export const typeField: FieldBlueprint = {
  field: DatabaseField.TYPE,
  label: 'Type',
  inspectFormat: (val: string) => `${val}`,
}

/**
 * Id field used by all records.
 */
export const idField: FieldBlueprint = {
  field: DatabaseField.ID,
  label: 'Id',
  inspectFormat: (val: string) => `${val}`,
  component: defineAsyncComponent(() => import('@/components/action-inputs/ActionInputId.vue')),
}

/**
 * Value field used by Settings.
 */
export const valueField: FieldBlueprint = {
  field: DatabaseField.VALUE,
  label: 'Setting Value',
  inspectFormat: (val: SettingValue) => `${val}`,
}

/**
 * Created Timestamp field used by Logs and child records. Inspection format converts timestamp to a readable date.
 */
export const createdTimestampField: FieldBlueprint = {
  field: DatabaseField.CREATED_TIMESTAMP,
  label: 'Created Date',
  inspectFormat: (val: number) => getDisplayDate(val),
  component: defineAsyncComponent(
    () => import('@/components/action-inputs/ActionInputCreatedTimestamp.vue')
  ),
}

/**
 * Severity field used by Logs.
 */
export const severityField: FieldBlueprint = {
  field: DatabaseField.SEVERITY,
  label: 'Severity',
  inspectFormat: (val: Severity) => `${val}`,
}

/**
 * Label field used by Logs.
 */
export const labelField: FieldBlueprint = {
  field: DatabaseField.LABEL,
  label: 'Label',
  inspectFormat: (val: string) => `${val}`,
}

/**
 * Details field used by Logs. Inspection format converts details to json for display.
 */
export const detailsField: FieldBlueprint = {
  field: DatabaseField.DETAILS,
  label: 'Details',
  inspectFormat: (val: any) => JSON.stringify(val),
}

/**
 * Message field used by Logs.
 */
export const messageField: FieldBlueprint = {
  field: DatabaseField.MESSAGE,
  label: 'Message',
  inspectFormat: (val: string) => `${val}`,
}

/**
 * Stack field used by Logs.
 */
export const stackField: FieldBlueprint = {
  field: DatabaseField.STACK,
  label: 'Stack',
  inspectFormat: (val: string) => `${val}`,
}

/**
 * Name field used by parent records.
 */
export const nameField: FieldBlueprint = {
  field: DatabaseField.NAME,
  label: 'Name',
  inspectFormat: (val: string) => `${val}`,
  component: defineAsyncComponent(() => import('@/components/action-inputs/ActionInputName.vue')),
}

/**
 * Description field used by parent records.
 */
export const descriptionField: FieldBlueprint = {
  field: DatabaseField.DESCRIPTION,
  label: 'Description',
  inspectFormat: (val: string) => `${val}`,
  component: defineAsyncComponent(
    () => import('@/components/action-inputs/ActionInputDescription.vue')
  ),
}

/**
 * Favorited field used by parent records. Inspection format converts boolean to Yes/No.
 */
export const favoritedField: FieldBlueprint = {
  field: DatabaseField.IS_FAVORITED,
  label: 'Favorited',
  inspectFormat: (val: boolean) => (val ? 'Yes' : 'No'),
  component: defineAsyncComponent(
    () => import('@/components/action-inputs/ActionInputFavorited.vue')
  ),
}

/**
 * Enabled field used by parent records. Inspection format converts boolean to Yes/No.
 */
export const enabledField: FieldBlueprint = {
  field: DatabaseField.IS_ENABLED,
  label: 'Enabled',
  inspectFormat: (val: boolean) => (val ? 'Yes' : 'No'),
  component: defineAsyncComponent(
    () => import('@/components/action-inputs/ActionInputEnabled.vue')
  ),
}

/**
 * Parent Id field used by child records.
 */
export const parentIdField: FieldBlueprint = {
  field: DatabaseField.PARENT_ID,
  label: 'Parent Id',
  inspectFormat: (val: string) => `${val}`,
  component: defineAsyncComponent(
    () => import('@/components/action-inputs/ActionInputParentId.vue')
  ),
}

/**
 * Note field used by child records.
 */
export const noteField: FieldBlueprint = {
  field: DatabaseField.NOTE,
  label: 'Note',
  inspectFormat: (val: string) => `${val}`,
  component: defineAsyncComponent(() => import('@/components/action-inputs/ActionInputNote.vue')),
}

// TODO - Implement new action input components for these fields.
/**
 * Active field used by child records. Inspection format converts boolean to Yes/No.
 * Used to determine if a workout or exercise result is active.
 */
export const activeField: FieldBlueprint = {
  field: DatabaseField.IS_ACTIVE,
  label: 'Active',
  inspectFormat: (val: boolean) => (val ? 'Yes' : 'No'),
  // component: defineAsyncComponent(
  //   () => import('@/components/action-inputs/ActionInputActive.vue')
  // ),
}

/**
 * Exercise Ids field used by workouts.
 */
export const exerciseIdsField: FieldBlueprint = {
  field: DatabaseField.EXERCISE_IDS,
  label: 'Exercise Ids',
  inspectFormat: (val: string[]) => `${val}`,
  // component: defineAsyncComponent(
  //   () => import('@/components/action-inputs/ActionInputExerciseIds.vue')
  // ),
}

/**
 * Exercise Inputs field used by exercises.
 */
export const exerciseInputsField: FieldBlueprint = {
  field: DatabaseField.EXERCISE_INPUTS,
  label: 'Exercise Inputs',
  inspectFormat: (val: ExerciseInput[]) => `${val}`,
  // component: defineAsyncComponent(
  //   () => import('@/components/action-inputs/ActionInputExerciseInput.vue')
  // ),
}

/**
 * Measurement Inputs field used by measurements.
 */
export const measurementInputsField: FieldBlueprint = {
  field: DatabaseField.MEASUREMENT_INPUTS,
  label: 'Measurement Inputs',
  inspectFormat: (val: MeasurementInput[]) => `${val}`,
  // component: defineAsyncComponent(
  //   () => import('@/components/action-inputs/ActionInputMeasurementInput.vue')
  // ),
}

/**
 * Finished Timestamp field used by workout results and active workouts.
 */
export const finishedTimestampField: FieldBlueprint = {
  field: DatabaseField.FINISHED_TIMESTAMP,
  label: 'Finished Date',
  inspectFormat: (val: number) => getDisplayDate(val),
  // component: defineAsyncComponent(
  //   () => import('@/components/action-inputs/ActionInputFinishedTimestamp.vue.vue')
  // ),
}

/**
 * Exercise Result Ids field used by workout results and active workouts.
 */
export const exerciseResultIdsField: FieldBlueprint = {
  field: DatabaseField.EXERCISE_RESULT_IDS,
  label: 'Exercise Result Ids',
  inspectFormat: (val: string[]) => `${val}`,
  // component: defineAsyncComponent(
  //   () => import('@/components/action-inputs/ActionInputExerciseResultIds.vue')
  // ),
}

/**
 * Reps field used by exercise results and active exercises.
 */
export const repsField: FieldBlueprint = {
  field: DatabaseField.REPS,
  label: 'Reps',
  inspectFormat: (val: number[]) => `${val}`,
  // component: defineAsyncComponent(() => import('@/components/action-inputs/ActionInputReps.vue')),
}

/**
 * Weight Lbs field used by exercise results and active exercises.
 */
export const weightLbsField: FieldBlueprint = {
  field: DatabaseField.WEIGHT_LBS,
  label: 'Weight (lbs)',
  inspectFormat: (val: number[]) => `${val}`,
  // component: defineAsyncComponent(
  //   () => import('@/components/action-inputs/ActionInputWeightLbs.vue')
  // ),
}

/**
 * Weight Kg field used by exercise results and active exercises.
 */
export const weightKgField: FieldBlueprint = {
  field: DatabaseField.WEIGHT_KG,
  label: 'Weight (kg)',
  inspectFormat: (val: number[]) => `${val}`,
  // component: defineAsyncComponent(
  //   () => import('@/components/action-inputs/ActionInputWeightKg.vue')
  // ),
}

/**
 * Distance Miles field used by exercise results and active exercises.
 */
export const distanceMilesField: FieldBlueprint = {
  field: DatabaseField.DISTANCE_MILES,
  label: 'Distance (miles)',
  inspectFormat: (val: number[]) => `${val}`,
  // component: defineAsyncComponent(
  //   () => import('@/components/action-inputs/ActionInputDistanceMiles.vue')
  // ),
}

/**
 * Distance Km field used by exercise results and active exercises.
 */
export const distanceKmField: FieldBlueprint = {
  field: DatabaseField.DISTANCE_KM,
  label: 'Distance (km)',
  inspectFormat: (val: number[]) => `${val}`,
  // component: defineAsyncComponent(
  //   () => import('@/components/action-inputs/ActionInputDistanceKm.vue')
  // ),
}

/**
 * Duration Minutes field used by exercise results and active exercises.
 */
export const durationMinutesField: FieldBlueprint = {
  field: DatabaseField.DURATION_MINUTES,
  label: 'Duration (minutes)',
  inspectFormat: (val: number[]) => `${val}`,
  // component: defineAsyncComponent(
  //   () => import('@/components/action-inputs/ActionInputDurationMinutes.vue')
  // ),
}

/**
 * Resistance field used by exercise results and active exercises.
 */
export const resistanceField: FieldBlueprint = {
  field: DatabaseField.RESISTANCE,
  label: 'Resistance',
  inspectFormat: (val: number[]) => `${val}`,
  // component: defineAsyncComponent(
  //   () => import('@/components/action-inputs/ActionInputResistance.vue')
  // ),
}

/**
 * Measurement Values field used by measurement results.
 */
export const measurementValuesField: FieldBlueprint = {
  field: DatabaseField.MEASUREMENT_VALUES,
  label: 'Measurement Values',
  inspectFormat: (val: number[]) => `${val}`,
  // component: defineAsyncComponent(
  //   () => import('@/components/action-inputs/ActionInputMeasurementValues.vue')
  // ),
}

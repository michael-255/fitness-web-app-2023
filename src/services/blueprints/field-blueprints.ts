import {
  DatabaseField,
  Severity,
  type SettingValue,
  ExerciseInput,
  MeasurementInput,
} from '@/types/database'
import type { FieldBlueprint } from '@/types/misc'
import { getDisplayDate } from '@/utils/common'
import { uid } from 'quasar'
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
  getDefault: () => null,
  inspectFormat: (val: string) => `${val}`,
}

/**
 * Id field used by all records.
 */
export const idField: FieldBlueprint = {
  field: DatabaseField.ID,
  label: 'Id',
  getDefault: () => uid(),
  inspectFormat: (val: string) => `${val}`,
  component: defineAsyncComponent(() => import('@/components/action-inputs/ActionInputId.vue')),
}

/**
 * Value field used by Settings.
 */
export const valueField: FieldBlueprint = {
  field: DatabaseField.VALUE,
  label: 'Setting Value',
  getDefault: () => null,
  inspectFormat: (val: SettingValue) => `${val}`,
}

/**
 * Created Timestamp field used by Logs and child records. Inspection format converts timestamp to a readable date.
 */
export const createdTimestampField: FieldBlueprint = {
  field: DatabaseField.CREATED_TIMESTAMP,
  label: 'Created Date',
  getDefault: () => null,
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
  getDefault: () => Severity.DEBUG,
  inspectFormat: (val: Severity) => `${val}`,
}

/**
 * Label field used by Logs.
 */
export const labelField: FieldBlueprint = {
  field: DatabaseField.LABEL,
  label: 'Label',
  getDefault: () => 'Error',
  inspectFormat: (val: string) => `${val}`,
}

/**
 * Details field used by Logs. Inspection format converts details to json for display.
 */
export const detailsField: FieldBlueprint = {
  field: DatabaseField.DETAILS,
  label: 'Details',
  getDefault: () => null,
  inspectFormat: (val: any) => JSON.stringify(val),
}

/**
 * Message field used by Logs.
 */
export const messageField: FieldBlueprint = {
  field: DatabaseField.MESSAGE,
  label: 'Message',
  getDefault: () => null,
  inspectFormat: (val: string) => `${val ?? '-'}`,
}

/**
 * Stack field used by Logs.
 */
export const stackField: FieldBlueprint = {
  field: DatabaseField.STACK,
  label: 'Stack',
  getDefault: () => null,
  inspectFormat: (val: string) => `${val ?? '-'}`,
}

/**
 * Name field used by parent records.
 */
export const nameField: FieldBlueprint = {
  field: DatabaseField.NAME,
  label: 'Name',
  getDefault: () => 'Example',
  inspectFormat: (val: string) => `${val}`,
  component: defineAsyncComponent(() => import('@/components/action-inputs/ActionInputName.vue')),
}

/**
 * Description field used by parent records.
 */
export const descriptionField: FieldBlueprint = {
  field: DatabaseField.DESCRIPTION,
  label: 'Description',
  getDefault: () => '',
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
  getDefault: () => false,
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
  getDefault: () => true,
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
  getDefault: () => null,
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
  getDefault: () => '',
  inspectFormat: (val: string) => `${val}`,
  component: defineAsyncComponent(() => import('@/components/action-inputs/ActionInputNote.vue')),
}

/**
 * Active field used by child records. Inspection format converts boolean to Yes/No.
 * Used to determine if a workout or exercise result is active.
 */
export const activeField: FieldBlueprint = {
  field: DatabaseField.IS_ACTIVE,
  label: 'Active',
  getDefault: () => false,
  inspectFormat: (val: boolean) => (val ? 'Yes' : 'No'),
  component: defineAsyncComponent(() => import('@/components/action-inputs/ActionInputActive.vue')),
}

/**
 * Exercise Ids field used by workouts.
 */
export const exerciseIdsField: FieldBlueprint = {
  field: DatabaseField.EXERCISE_IDS,
  label: 'Exercise Ids',
  getDefault: () => null,
  inspectFormat: (val: string[]) => `${val}`,
  component: defineAsyncComponent(
    () => import('@/components/action-inputs/ActionInputExerciseIds.vue')
  ),
}

/**
 * Exercise Inputs field used by exercises.
 */
export const exerciseInputsField: FieldBlueprint = {
  field: DatabaseField.EXERCISE_INPUTS,
  label: 'Exercise Inputs',
  getDefault: () => null,
  inspectFormat: (val: ExerciseInput[]) => `${val}`,
  component: defineAsyncComponent(
    () => import('@/components/action-inputs/ActionInputExerciseInputs.vue')
  ),
}

/**
 * Measurement Inputs field used by measurements.
 */
export const measurementInputsField: FieldBlueprint = {
  field: DatabaseField.MEASUREMENT_INPUTS,
  label: 'Measurement Inputs',
  getDefault: () => null,
  inspectFormat: (val: MeasurementInput[]) => `${val}`,
  component: defineAsyncComponent(
    () => import('@/components/action-inputs/ActionInputMeasurementInputs.vue')
  ),
}

/**
 * Finished Timestamp field used by workout results and active workouts.
 */
export const finishedTimestampField: FieldBlueprint = {
  field: DatabaseField.FINISHED_TIMESTAMP,
  label: 'Finished Date',
  getDefault: () => null,
  inspectFormat: (val: number) => getDisplayDate(val),
  component: defineAsyncComponent(
    () => import('@/components/action-inputs/ActionInputFinishedTimestamp.vue')
  ),
}

/**
 * Exercise Result Ids field used by workout results and active workouts.
 */
export const exerciseResultIdsField: FieldBlueprint = {
  field: DatabaseField.EXERCISE_RESULT_IDS,
  label: 'Exercise Result Ids',
  getDefault: () => null,
  inspectFormat: (val: string[]) => `${val}`,
  component: defineAsyncComponent(
    () => import('@/components/action-inputs/ActionInputExerciseResultIds.vue')
  ),
}

/**
 * Exercise Result set contains all exercise input fields.
 */
export const setField: FieldBlueprint = {
  field: 'set' as DatabaseField, // Special field to collect all exercise inputs
  label: 'Set',
  getDefault: () => null,
  inspectFormat: (val: number) => `${val}`,
  component: defineAsyncComponent(() => import('@/components/action-inputs/ActionInputSet.vue')),
}

/**
 * Lbs field used by measurement results.
 */
export const lbsField: FieldBlueprint = {
  field: DatabaseField.LBS,
  label: 'Lbs',
  getDefault: () => 0,
  inspectFormat: (val: number) => `${val} lbs`,
  component: defineAsyncComponent(() => import('@/components/action-inputs/ActionInputLbs.vue')),
}

/**
 * Inches field used by measurement results.
 */
export const inchesField: FieldBlueprint = {
  field: DatabaseField.INCHES,
  label: 'Inches',
  getDefault: () => 0,
  inspectFormat: (val: number) => `${val} in`,
  component: defineAsyncComponent(() => import('@/components/action-inputs/ActionInputInches.vue')),
}

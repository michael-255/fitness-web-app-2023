import {
  DatabaseField,
  DatabaseType,
  ExerciseInput,
  MeasurementInput,
  Severity,
} from '@/types/database'
import { truncateString } from '@/utils/common'
import { getDisplayDate } from '@/utils/common'
import type { QTableColumn } from 'quasar'

/*
This file contains table column objects used by the Data view for the QTable component.
Do NOT mutate these objects as they are used by multiple components.
*/

/**
 * Hidden Type column (required).
 * Used for data table row operations. User doesn't need to see this which saves horizontal space on the Data view.
 * (Must be at position 0 for Data Table props.cols[0])
 */
export const requiredTypeColumn: QTableColumn = {
  name: 'hiddenType',
  label: '',
  align: 'left',
  sortable: false,
  required: true,
  field: (row: any) => row[DatabaseField.TYPE],
  format: (val: DatabaseType) => `${val}`,
  style: 'display: none', // Hide column in QTable
}

/**
 * Hidden Id column (required).
 * Used for data table row operations. User doesn't need to see this which saves horizontal space on the Data view.
 * (Must be at position 1 for Data Table props.cols[1])
 */
export const requiredIdColumn: QTableColumn = {
  name: 'hiddenId',
  label: '',
  align: 'left',
  sortable: false,
  required: true,
  field: (row: any) => row[DatabaseField.ID],
  format: (val: string) => `${val}`,
  style: 'display: none', // Hide column in QTable
}

/**
 * Type column used by all records.
 */
export const typeColumn: QTableColumn = {
  name: DatabaseField.TYPE,
  label: 'Type',
  align: 'left',
  sortable: true,
  required: false,
  field: (row: any) => row[DatabaseField.TYPE],
  format: (val: DatabaseType) => `${val}`,
}

/**
 * Partial Id column used by all records. Format truncates id to provide more horizontal space on Data view.
 */
export const partialIdColumn: QTableColumn = {
  name: DatabaseField.ID,
  label: 'Id*',
  align: 'left',
  sortable: true,
  required: false,
  field: (row: any) => row[DatabaseField.ID],
  format: (val: string) => truncateString(val, 8, '*'),
}

/**
 * Full Id column used by Settings since setting ids are short readable slugs.
 */
export const idColumn: QTableColumn = {
  name: DatabaseField.ID,
  label: 'Id',
  align: 'left',
  sortable: true,
  required: false,
  field: (row: any) => row[DatabaseField.ID],
  format: (val: string) => `${val}`,
}

/**
 * Created Date column used by Logs and child records. Format converts the timestamp to a readable date.
 */
export const createdTimestampColumn: QTableColumn = {
  name: DatabaseField.CREATED_TIMESTAMP,
  label: 'Created Date',
  align: 'left',
  sortable: true,
  required: false,
  field: (row: any) => row[DatabaseField.CREATED_TIMESTAMP],
  format: (val: number) => getDisplayDate(val),
}

/**
 * Setting Value column used by Settings. Format truncates value in case it is to large.
 */
export const valueColumn: QTableColumn = {
  name: DatabaseField.VALUE,
  label: 'Setting Value',
  align: 'left',
  sortable: true,
  required: false,
  field: (row: any) => row[DatabaseField.VALUE],
  format: (val: any) => truncateString(JSON.stringify(val), 30, '...'),
}

/**
 * Severity column used by Logs.
 */
export const severityColumn: QTableColumn = {
  name: DatabaseField.SEVERITY,
  label: 'Severity',
  align: 'left',
  sortable: true,
  required: false,
  field: (row: any) => row[DatabaseField.SEVERITY],
  format: (val: Severity) => `${val}`,
}

/**
 * Label column used by Logs. Format truncates value in case it is to large.
 */
export const labelColumn: QTableColumn = {
  name: DatabaseField.LABEL,
  label: 'Label',
  align: 'left',
  sortable: true,
  required: false,
  field: (row: any) => row[DatabaseField.LABEL],
  format: (val: string) => truncateString(val, 30, '...'),
}

/**
 * Details column used by Logs. Format truncates value in case it is to large.
 */
export const detailsColumn: QTableColumn = {
  name: DatabaseField.DETAILS,
  label: 'Details',
  align: 'left',
  sortable: false,
  required: false,
  field: (row: any) => row[DatabaseField.DETAILS],
  format: (val: any) => truncateString(JSON.stringify(val), 30, '...'),
}

/**
 * Message column used by Logs. Format truncates value in case it is to large.
 */
export const messageColumn: QTableColumn = {
  name: DatabaseField.MESSAGE,
  label: 'Message',
  align: 'left',
  sortable: true,
  required: false,
  field: (row: any) => row[DatabaseField.MESSAGE],
  format: (val: string) => truncateString(val, 30, '...'),
}

/**
 * Stack column used by Logs. Format truncates value in case it is to large.
 */
export const stackColumn: QTableColumn = {
  name: DatabaseField.STACK,
  label: 'Stack',
  align: 'left',
  sortable: true,
  required: false,
  field: (row: any) => row[DatabaseField.STACK],
  format: (val: string) => truncateString(val, 30, '...'),
}

/**
 * Name column used by parent records. Format truncates value in case it is to large.
 */
export const nameColumn: QTableColumn = {
  name: DatabaseField.NAME,
  label: 'Name',
  align: 'left',
  sortable: true,
  required: false,
  field: (row: any) => row[DatabaseField.NAME],
  format: (val: string) => truncateString(val, 30, '...'),
}

/**
 * Description column used by parent records. Format truncates value in case it is to large.
 */
export const descriptionColumn: QTableColumn = {
  name: DatabaseField.DESCRIPTION,
  label: 'Description',
  align: 'left',
  sortable: true,
  required: false,
  field: (row: any) => row[DatabaseField.DESCRIPTION],
  format: (val: string) => truncateString(val, 30, '...'),
}

/**
 * Favorite column used by parent records. Format converts boolean to Yes/No.
 */
export const favoritedColumn: QTableColumn = {
  name: DatabaseField.IS_FAVORITED,
  label: 'Favorited',
  align: 'left',
  sortable: true,
  required: false,
  field: (row: any) => row[DatabaseField.IS_FAVORITED],
  format: (val: boolean) => (val ? 'Yes' : 'No'),
}

/**
 * Enabled column used by parent records. Format converts boolean to Yes/No.
 */
export const enabledColumn: QTableColumn = {
  name: DatabaseField.IS_ENABLED,
  label: 'Enabled',
  align: 'left',
  sortable: true,
  required: false,
  field: (row: any) => row[DatabaseField.IS_ENABLED],
  format: (val: boolean) => (val ? 'Yes' : 'No'),
}

/**
 * Parent Id column used by child records. Format truncates id to provide more horizontal space on Data view.
 */
export const parentIdColumn: QTableColumn = {
  name: DatabaseField.PARENT_ID,
  label: 'Parent Id*',
  align: 'left',
  sortable: true,
  required: false,
  field: (row: any) => row[DatabaseField.PARENT_ID],
  format: (val: string) => truncateString(val, 8, '*'),
}

/**
 * Note column used by child records. Format truncates value in case it is to large.
 */
export const noteColumn: QTableColumn = {
  name: DatabaseField.NOTE,
  label: 'Note',
  align: 'left',
  sortable: true,
  required: false,
  field: (row: any) => row[DatabaseField.NOTE],
  format: (val: string) => truncateString(val, 30, '...'),
}

/**
 * Active column used by Active Workouts and Active Exercises. Format converts boolean to Yes/No.
 */
export const activeColumn: QTableColumn = {
  name: DatabaseField.IS_ACTIVE,
  label: 'Active',
  align: 'left',
  sortable: true,
  required: false,
  field: (row: any) => row[DatabaseField.IS_ACTIVE],
  format: (val: boolean) => (val ? 'Yes' : 'No'),
}

/**
 * Exercise Ids column used by Workouts. Format truncates value in case it is to large.
 */
export const exerciseIdsColumn: QTableColumn = {
  name: DatabaseField.EXERCISE_IDS,
  label: 'Exercise Ids',
  align: 'left',
  sortable: true,
  required: false,
  field: (row: any) => row[DatabaseField.EXERCISE_IDS],
  format: (val: string[]) => truncateString(JSON.stringify(val), 30, '...'),
}

/**
 * Exercise Inputs column used by Exercises. Format truncates value in case it is to large.
 */
export const exerciseInputsColumn: QTableColumn = {
  name: DatabaseField.EXERCISE_INPUTS,
  label: 'Exercise Inputs',
  align: 'left',
  sortable: true,
  required: false,
  field: (row: any) => row[DatabaseField.EXERCISE_INPUTS],
  format: (val: ExerciseInput[]) => truncateString(JSON.stringify(val), 30, '...'),
}

/**
 * Measurement Inputs column used by Measurements. Format truncates value in case it is to large.
 */
export const measurementInputsColumn: QTableColumn = {
  name: DatabaseField.MEASUREMENT_INPUTS,
  label: 'Measurement Inputs',
  align: 'left',
  sortable: true,
  required: false,
  field: (row: any) => row[DatabaseField.MEASUREMENT_INPUTS],
  format: (val: MeasurementInput[]) => truncateString(JSON.stringify(val), 30, '...'),
}

/**
 * Finished Date column used by Active Workouts and Active Exercises. Format converts the timestamp to a readable date.
 */
export const finishedTimestampColumn: QTableColumn = {
  name: DatabaseField.FINISHED_TIMESTAMP,
  label: 'Finished Date',
  align: 'left',
  sortable: true,
  required: false,
  field: (row: any) => row[DatabaseField.FINISHED_TIMESTAMP],
  format: (val: number) => getDisplayDate(val),
}

/**
 * Exercise Result Ids column used by Workout Results. Format truncates value in case it is to large.
 */
export const exerciseResultIdsColumn: QTableColumn = {
  name: DatabaseField.EXERCISE_RESULT_IDS,
  label: 'Exercise Result Ids',
  align: 'left',
  sortable: true,
  required: false,
  field: (row: any) => row[DatabaseField.EXERCISE_RESULT_IDS],
  format: (val: string[]) => truncateString(JSON.stringify(val), 30, '...'),
}

/**
 * Reps column used by Exercise Results. Format truncates value in case it is to large.
 */
export const repsColumn: QTableColumn = {
  name: DatabaseField.REPS,
  label: 'Reps',
  align: 'left',
  sortable: true,
  required: false,
  field: (row: any) => row[DatabaseField.REPS],
  format: (val: number[]) => truncateString(JSON.stringify(val), 30, '...'),
}

/**
 * Weight Lbs column used by Exercise Results. Format truncates value in case it is to large.
 */
export const weightLbsColumn: QTableColumn = {
  name: DatabaseField.WEIGHT_LBS,
  label: 'Weight (lbs)',
  align: 'left',
  sortable: true,
  required: false,
  field: (row: any) => row[DatabaseField.WEIGHT_LBS],
  format: (val: number[]) => truncateString(JSON.stringify(val), 30, '...'),
}

/**
 * Distance Miles column used by Exercise Results. Format truncates value in case it is to large.
 */
export const distanceMilesColumn: QTableColumn = {
  name: DatabaseField.DISTANCE_MILES,
  label: 'Distance (miles)',
  align: 'left',
  sortable: true,
  required: false,
  field: (row: any) => row[DatabaseField.DISTANCE_MILES],
  format: (val: number[]) => truncateString(JSON.stringify(val), 30, '...'),
}

/**
 * Duration Minutes column used by Exercise Results. Format truncates value in case it is to large.
 */
export const durationMinutesColumn: QTableColumn = {
  name: DatabaseField.DURATION_MINUTES,
  label: 'Duration (minutes)',
  align: 'left',
  sortable: true,
  required: false,
  field: (row: any) => row[DatabaseField.DURATION_MINUTES],
  format: (val: number[]) => truncateString(JSON.stringify(val), 30, '...'),
}

/**
 * Resistance column used by Exercise Results. Format truncates value in case it is to large.
 */
export const resistanceColumn: QTableColumn = {
  name: DatabaseField.RESISTANCE,
  label: 'Resistance',
  align: 'left',
  sortable: true,
  required: false,
  field: (row: any) => row[DatabaseField.RESISTANCE],
  format: (val: number[]) => truncateString(JSON.stringify(val), 30, '...'),
}

/**
 * Measurement Values column used by Measurement Results. Format truncates value in case it is to large.
 */
export const measurementValuesColumn: QTableColumn = {
  name: DatabaseField.MEASUREMENT_VALUES,
  label: 'Measurement Values',
  align: 'left',
  sortable: true,
  required: false,
  field: (row: any) => row[DatabaseField.MEASUREMENT_VALUES],
  format: (val: number[]) => truncateString(JSON.stringify(val), 30, '...'),
}

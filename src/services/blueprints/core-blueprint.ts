import { Icon } from '@/types/icons'
import type { CoreBlueprint } from '@/types/misc'
import { slugify } from '@/utils/common'
import { DatabaseAction, DatabaseCategory, DatabaseField, DatabaseType } from '@/types/database'
import {
  idField,
  valueField,
  createdTimestampField,
  severityField,
  labelField,
  detailsField,
  enabledField,
  favoritedField,
  descriptionField,
  nameField,
  parentIdField,
  noteField,
  typeField,
  activeField,
  exerciseIdsField,
  exerciseInputsField,
  measurementInputsField,
  repsField,
  weightLbsField,
  distanceMilesField,
  durationMinutesField,
  resistanceField,
  finishedTimestampField,
  messageField,
  stackField,
} from '@/services/blueprints/field-bluprints'
import {
  requiredTypeColumn,
  requiredIdColumn,
  createdTimestampColumn,
  descriptionColumn,
  detailsColumn,
  enabledColumn,
  favoritedColumn,
  idColumn,
  labelColumn,
  nameColumn,
  noteColumn,
  parentIdColumn,
  partialIdColumn,
  severityColumn,
  valueColumn,
  exerciseIdsColumn,
  exerciseInputsColumn,
  measurementInputsColumn,
  activeColumn,
  messageColumn,
  stackColumn,
} from '@/services/blueprints/table-columns'
import { exerciseResultIdsField } from '@/services/blueprints/field-bluprints'
import { measurementValuesField } from '@/services/blueprints/field-bluprints'
import { finishedTimestampColumn } from '@/services/blueprints/table-columns'
import { exerciseResultIdsColumn } from '@/services/blueprints/table-columns'
import { repsColumn } from '@/services/blueprints/table-columns'
import { weightLbsColumn } from '@/services/blueprints/table-columns'
import { weightKgColumn } from '@/services/blueprints/table-columns'
import { distanceMilesColumn } from '@/services/blueprints/table-columns'
import { distanceKmColumn } from '@/services/blueprints/table-columns'
import { durationMinutesColumn } from '@/services/blueprints/table-columns'
import { resistanceColumn } from '@/services/blueprints/table-columns'
import { measurementValuesColumn } from '@/services/blueprints/table-columns'

/*
This file contains the core blueprints for all database types.
Do NOT mutate these objects as they are used by multiple components.
*/

/**
 * Core blueprints for all database types.
 */
export const coreBlueprint: readonly CoreBlueprint[] = [
  /**
   * Logs Blueprint
   */
  {
    type: DatabaseType.LOG,
    typeSlug: slugify(DatabaseType.LOG),
    category: DatabaseCategory.INTERNAL,
    singularLabel: 'Log',
    pluralLabel: 'Logs',
    icon: Icon.LOGS,
    parentType: null,
    childType: null,
    supportedActions: [DatabaseAction.INSPECT, DatabaseAction.DELETE],
    chartBluprints: [],
    fieldBlueprints: [
      typeField,
      idField,
      createdTimestampField,
      severityField,
      labelField,
      detailsField,
      messageField,
      stackField,
    ],
    visibleColumns: [
      DatabaseField.ID,
      DatabaseField.CREATED_TIMESTAMP,
      DatabaseField.SEVERITY,
      DatabaseField.LABEL,
    ],
    tableColumns: [
      requiredTypeColumn,
      requiredIdColumn,
      partialIdColumn,
      createdTimestampColumn,
      severityColumn,
      labelColumn,
      detailsColumn,
      messageColumn,
      stackColumn,
    ],
  },
  /**
   * Settings Blueprint
   */
  {
    type: DatabaseType.SETTING,
    typeSlug: slugify(DatabaseType.SETTING),
    category: DatabaseCategory.INTERNAL,
    singularLabel: 'Setting',
    pluralLabel: 'Settings',
    icon: Icon.SETTINGS,
    parentType: null,
    childType: null,
    supportedActions: [DatabaseAction.INSPECT],
    chartBluprints: [],
    fieldBlueprints: [typeField, idField, valueField],
    visibleColumns: [DatabaseField.ID, DatabaseField.VALUE],
    tableColumns: [requiredTypeColumn, requiredIdColumn, idColumn, valueColumn],
  },
  /**
   * Workouts Blueprint
   */
  {
    type: DatabaseType.WORKOUT,
    typeSlug: slugify(DatabaseType.WORKOUT),
    category: DatabaseCategory.PARENT,
    singularLabel: 'Workout',
    pluralLabel: 'Workouts',
    icon: Icon.WORKOUT,
    parentType: null,
    childType: DatabaseType.WORKOUT_RESULT,
    supportedActions: [
      DatabaseAction.INSPECT,
      DatabaseAction.CREATE,
      DatabaseAction.EDIT,
      DatabaseAction.DELETE,
      DatabaseAction.CHARTS,
    ],
    chartBluprints: [], // TODO
    fieldBlueprints: [
      typeField,
      idField,
      nameField,
      descriptionField,
      favoritedField,
      enabledField,
      activeField,
      exerciseIdsField,
    ],
    visibleColumns: [
      DatabaseField.ID,
      DatabaseField.NAME,
      DatabaseField.IS_FAVORITED,
      DatabaseField.IS_ENABLED,
    ],
    tableColumns: [
      requiredTypeColumn,
      requiredIdColumn,
      partialIdColumn,
      nameColumn,
      descriptionColumn,
      favoritedColumn,
      enabledColumn,
      exerciseIdsColumn,
    ],
  },
  /**
   * Exercies Blueprint
   */
  {
    type: DatabaseType.EXERCISE,
    typeSlug: slugify(DatabaseType.EXERCISE),
    category: DatabaseCategory.PARENT,
    singularLabel: 'Exercise',
    pluralLabel: 'Exercises',
    icon: Icon.EXERCISE,
    parentType: null,
    childType: DatabaseType.EXERCISE_RESULT,
    supportedActions: [
      DatabaseAction.INSPECT,
      DatabaseAction.CREATE,
      DatabaseAction.EDIT,
      DatabaseAction.DELETE,
      DatabaseAction.CHARTS,
    ],
    chartBluprints: [], // TODO
    fieldBlueprints: [
      typeField,
      idField,
      nameField,
      descriptionField,
      favoritedField,
      enabledField,
      activeField,
      exerciseInputsField,
    ],
    visibleColumns: [
      DatabaseField.ID,
      DatabaseField.NAME,
      DatabaseField.IS_FAVORITED,
      DatabaseField.IS_ENABLED,
    ],
    tableColumns: [
      requiredTypeColumn,
      requiredIdColumn,
      partialIdColumn,
      nameColumn,
      descriptionColumn,
      favoritedColumn,
      enabledColumn,
      exerciseInputsColumn,
    ],
  },
  /**
   * Measurements Blueprint
   */
  {
    type: DatabaseType.MEASUREMENT,
    typeSlug: slugify(DatabaseType.MEASUREMENT),
    category: DatabaseCategory.PARENT,
    singularLabel: 'Measurement',
    pluralLabel: 'Measurements',
    icon: Icon.MEASUREMENT,
    parentType: null,
    childType: DatabaseType.MEASUREMENT_RESULT,
    supportedActions: [
      DatabaseAction.INSPECT,
      DatabaseAction.CREATE,
      DatabaseAction.EDIT,
      DatabaseAction.DELETE,
      DatabaseAction.CHARTS,
    ],
    chartBluprints: [], // TODO
    fieldBlueprints: [
      typeField,
      idField,
      nameField,
      descriptionField,
      favoritedField,
      enabledField,
      activeField,
      measurementInputsField,
    ],
    visibleColumns: [
      DatabaseField.ID,
      DatabaseField.NAME,
      DatabaseField.IS_FAVORITED,
      DatabaseField.IS_ENABLED,
    ],
    tableColumns: [
      requiredTypeColumn,
      requiredIdColumn,
      partialIdColumn,
      nameColumn,
      descriptionColumn,
      favoritedColumn,
      enabledColumn,
      measurementInputsColumn,
    ],
  },
  /**
   * Workout Results Blueprint
   */
  {
    type: DatabaseType.WORKOUT_RESULT,
    typeSlug: slugify(DatabaseType.WORKOUT_RESULT),
    category: DatabaseCategory.CHILD,
    singularLabel: 'Workout Result',
    pluralLabel: 'Workout Results',
    icon: Icon.RECORDS,
    parentType: DatabaseType.WORKOUT,
    childType: null,
    supportedActions: [
      DatabaseAction.INSPECT,
      DatabaseAction.CREATE,
      DatabaseAction.EDIT,
      DatabaseAction.DELETE,
    ],
    chartBluprints: [], // TODO
    fieldBlueprints: [
      typeField,
      idField,
      parentIdField,
      noteField,
      activeField,
      finishedTimestampField,
      exerciseResultIdsField,
    ],
    visibleColumns: [DatabaseField.ID, DatabaseField.PARENT_ID, DatabaseField.FINISHED_TIMESTAMP],
    tableColumns: [
      requiredTypeColumn,
      requiredIdColumn,
      partialIdColumn,
      parentIdColumn,
      noteColumn,
      activeColumn,
      finishedTimestampColumn,
      exerciseResultIdsColumn,
    ],
  },
  /**
   * Exercise Results Blueprint
   */
  {
    type: DatabaseType.EXERCISE_RESULT,
    typeSlug: slugify(DatabaseType.EXERCISE_RESULT),
    category: DatabaseCategory.CHILD,
    singularLabel: 'Exercise Result',
    pluralLabel: 'Exercise Results',
    icon: Icon.RECORDS,
    parentType: DatabaseType.EXERCISE,
    childType: null,
    supportedActions: [
      DatabaseAction.INSPECT,
      DatabaseAction.CREATE,
      DatabaseAction.EDIT,
      DatabaseAction.DELETE,
    ],
    chartBluprints: [], // TODO
    fieldBlueprints: [
      typeField,
      idField,
      parentIdField,
      noteField,
      activeField,
      repsField,
      weightLbsField,
      distanceMilesField,
      durationMinutesField,
      resistanceField,
    ],
    visibleColumns: [DatabaseField.ID, DatabaseField.PARENT_ID, DatabaseField.NOTE],
    tableColumns: [
      requiredTypeColumn,
      requiredIdColumn,
      partialIdColumn,
      parentIdColumn,
      noteColumn,
      activeColumn,
      repsColumn,
      weightLbsColumn,
      weightKgColumn,
      distanceMilesColumn,
      distanceKmColumn,
      durationMinutesColumn,
      resistanceColumn,
    ],
  },
  /**
   * Measurement Results Blueprint
   */
  {
    type: DatabaseType.MEASUREMENT_RESULT,
    typeSlug: slugify(DatabaseType.MEASUREMENT_RESULT),
    category: DatabaseCategory.CHILD,
    singularLabel: 'Measurement Result',
    pluralLabel: 'Measurement Results',
    icon: Icon.RECORDS,
    parentType: DatabaseType.MEASUREMENT,
    childType: null,
    supportedActions: [
      DatabaseAction.INSPECT,
      DatabaseAction.CREATE,
      DatabaseAction.EDIT,
      DatabaseAction.DELETE,
    ],
    chartBluprints: [], // TODO
    fieldBlueprints: [
      typeField,
      idField,
      parentIdField,
      noteField,
      activeField,
      measurementValuesField,
    ],
    visibleColumns: [
      DatabaseField.ID,
      DatabaseField.PARENT_ID,
      DatabaseField.NOTE,
      DatabaseField.MEASUREMENT_VALUES,
    ],
    tableColumns: [
      requiredTypeColumn,
      requiredIdColumn,
      partialIdColumn,
      parentIdColumn,
      noteColumn,
      activeColumn,
      measurementValuesColumn,
    ],
  },
]

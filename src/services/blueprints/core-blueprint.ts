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
  finishedTimestampField,
  messageField,
  stackField,
  exerciseResultIdsField,
  setField,
  lbsField,
  inchesField,
} from '@/services/blueprints/field-blueprints'
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
  finishedTimestampColumn,
  exerciseResultIdsColumn,
  repsColumn,
  weightLbsColumn,
  distanceMilesColumn,
  durationMinutesColumn,
  resistanceColumn,
  lbsColumn,
  inchesColumn,
} from '@/services/blueprints/table-columns'

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
      createdTimestampField,
      finishedTimestampField,
      parentIdField,
      noteField,
      activeField,
      exerciseResultIdsField,
    ],
    visibleColumns: [
      DatabaseField.ID,
      DatabaseField.CREATED_TIMESTAMP,
      DatabaseField.FINISHED_TIMESTAMP,
      DatabaseField.PARENT_ID,
    ],
    tableColumns: [
      requiredTypeColumn,
      requiredIdColumn,
      partialIdColumn,
      createdTimestampColumn,
      finishedTimestampColumn,
      parentIdColumn,
      noteColumn,
      activeColumn,
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
      createdTimestampField,
      parentIdField,
      noteField,
      activeField,
      setField,
    ],
    visibleColumns: [
      DatabaseField.ID,
      DatabaseField.CREATED_TIMESTAMP,
      DatabaseField.PARENT_ID,
      DatabaseField.NOTE,
    ],
    tableColumns: [
      requiredTypeColumn,
      requiredIdColumn,
      partialIdColumn,
      createdTimestampColumn,
      parentIdColumn,
      noteColumn,
      activeColumn,
      repsColumn,
      weightLbsColumn,
      distanceMilesColumn,
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
      createdTimestampField,
      parentIdField,
      noteField,
      activeField,
      lbsField,
      inchesField,
    ],
    visibleColumns: [
      DatabaseField.ID,
      DatabaseField.CREATED_TIMESTAMP,
      DatabaseField.PARENT_ID,
      DatabaseField.NOTE,
    ],
    tableColumns: [
      requiredTypeColumn,
      requiredIdColumn,
      partialIdColumn,
      createdTimestampColumn,
      parentIdColumn,
      noteColumn,
      activeColumn,
      lbsColumn,
      inchesColumn,
    ],
  },
]

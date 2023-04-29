import { DatabaseField, SettingId, type BMI, type Vitals } from '@/types/database'
import { LogRetention, type Optional } from '@/types/misc'
import { uid } from 'quasar'

/**
 * Default functions for fields that can benefit from using them.
 */
export const FieldDefault = Object.freeze({
  [DatabaseField.ID]: () => uid(),
  [DatabaseField.NAME]: () => 'Example',
  [DatabaseField.DESCRIPTION]: () => '',
  [DatabaseField.IS_FAVORITED]: () => false,
  [DatabaseField.IS_ENABLED]: () => true,
  [DatabaseField.NOTE]: (): string => '',
  [DatabaseField.IS_ACTIVE]: (): boolean => false,
  [DatabaseField.FINISHED_TIMESTAMP]: (): Optional<number> => null,
  // Result Defaults
  [DatabaseField.REPS]: (): Optional<number>[] => [],
  [DatabaseField.WEIGHT_LBS]: (): Optional<number>[] => [],
  [DatabaseField.DISTANCE_MILES]: (): Optional<number>[] => [],
  [DatabaseField.DURATION_MINUTES]: (): Optional<number>[] => [],
  [DatabaseField.RESISTANCE]: (): Optional<number>[] => [],
  [DatabaseField.LBS]: (): Optional<number> => null,
  [DatabaseField.INCHES]: (): Optional<number> => null,
  [DatabaseField.PERCENTAGE]: (): Optional<number> => null,
  [DatabaseField.BMI]: (): BMI => [null, null, null, null],
  [DatabaseField.VITALS]: (): Vitals => [null, null, null, null, null],
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

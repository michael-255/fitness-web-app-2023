<script setup lang="ts">
import { onMounted, ref, type Ref, watch } from 'vue'
import { DatabaseField, DatabaseType, MeasurementInput } from '@/types/database'
import { Icon } from '@/types/icons'
import { Limit } from '@/types/misc'
import { FieldDefault } from '@/services/Defaults'
import useActionStore from '@/stores/action'
import useLogger from '@/composables/useLogger'
import DB from '@/services/LocalDatabase'

// Props & Emits
defineProps<{
  locked?: boolean
  label: string
}>()

// Composables & Stores
const actionStore = useActionStore()
const { log } = useLogger()

// Data
const inputRef: Ref<any> = ref(null)
const isCardVisible = ref(true)

onMounted(() => {
  actionStore.record[DatabaseField.BLOOD_PRESSURE] =
    actionStore.record[DatabaseField.BLOOD_PRESSURE] ?? FieldDefault[DatabaseField.BLOOD_PRESSURE]() // function call

  actionStore.record[DatabaseField.BLOOD_PRESSURE][0] =
    actionStore.record[DatabaseField.BLOOD_PRESSURE][0] ??
    FieldDefault[DatabaseField.BLOOD_PRESSURE]()[0] // function call

  actionStore.record[DatabaseField.BLOOD_PRESSURE][1] =
    actionStore.record[DatabaseField.BLOOD_PRESSURE][1] ??
    FieldDefault[DatabaseField.BLOOD_PRESSURE]()[1] // function call
})

/**
 * Defaults the input if the current value is not valid.
 */
function defaultNonValidInput() {
  const val =
    actionStore.record[DatabaseField.BLOOD_PRESSURE] ?? FieldDefault[DatabaseField.BLOOD_PRESSURE]() // function call
  const systolic = val[0] ?? FieldDefault[DatabaseField.BLOOD_PRESSURE]()[0] // function call
  const diastolic = val[1] ?? FieldDefault[DatabaseField.BLOOD_PRESSURE]()[1] // function call

  if (!(typeof systolic === 'number') || systolic < 0) {
    actionStore.record[DatabaseField.BLOOD_PRESSURE][0] =
      FieldDefault[DatabaseField.BLOOD_PRESSURE]()[0] // function call
  } else if (systolic > Limit.MAX_HEART_VALUE) {
    actionStore.record[DatabaseField.BLOOD_PRESSURE][0] = Limit.MAX_HEART_VALUE
  }

  if (!(typeof diastolic === 'number') || diastolic < 0) {
    actionStore.record[DatabaseField.BLOOD_PRESSURE][1] =
      FieldDefault[DatabaseField.BLOOD_PRESSURE]()[1] // function call
  } else if (diastolic > Limit.MAX_HEART_VALUE) {
    actionStore.record[DatabaseField.BLOOD_PRESSURE][1] = Limit.MAX_HEART_VALUE
  }
}

/**
 * Watching actionStore parent id for the property to change.
 * Determines if the card should be visible or not.
 */
watch(
  () => actionStore.record[DatabaseField.PARENT_ID] as string,
  async (parentId) => {
    try {
      if (!parentId) {
        return (isCardVisible.value = false)
      }

      const measurementRecord = await DB.getRecord(DatabaseType.MEASUREMENT, parentId)

      if (!measurementRecord) {
        return (isCardVisible.value = false)
      }

      const measurementInputs = measurementRecord[DatabaseField.MEASUREMENT_INPUTS]

      // Checks for specific measurement input
      if (measurementInputs?.includes(MeasurementInput.BLOOD_PRESSURE)) {
        isCardVisible.value = true
      } else {
        isCardVisible.value = false
      }
    } catch (error) {
      log.error('Error with blood pressure watcher', error)
    }
  },
  { immediate: true }
)
</script>

<template>
  <QCard v-if="!locked && isCardVisible">
    <QCardSection>
      <div class="text-h6 q-mb-md">
        {{ label }}
        <QIcon v-if="locked" :name="Icon.LOCK" color="warning" class="q-pb-xs" />
      </div>

      <div class="q-mb-md">Measurement values for blood pressure.</div>

      <div class="row q-gutter-sm">
        <div class="col">
          <!-- Note: v-model.number for number types -->
          <QInput
            v-model.number="actionStore.record[DatabaseField.BLOOD_PRESSURE][0]"
            ref="inputRef"
            label="Systolic"
            :disable="locked"
            type="number"
            dense
            outlined
            color="primary"
            @blur="defaultNonValidInput()"
          />
        </div>

        <div class="text-h4">/</div>

        <div class="col">
          <!-- Note: v-model.number for number types -->
          <QInput
            v-model.number="actionStore.record[DatabaseField.BLOOD_PRESSURE][1]"
            ref="inputRef"
            label="Dystolic"
            :disable="locked"
            type="number"
            dense
            outlined
            color="primary"
            @blur="defaultNonValidInput()"
          />
        </div>
      </div>
    </QCardSection>
  </QCard>
</template>

<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { DatabaseField, MeasurementInput } from '@/types/database'
import { Icon } from '@/types/icons'
import { Limit } from '@/types/misc'
import { FieldDefault } from '@/services/Defaults'
import useParentIdWatcher from '@/composables/useParentIdWatcher'
import useActionStore from '@/stores/action'

// Props & Emits
defineProps<{
  locked?: boolean
  label: string
}>()

// Composables & Stores
const actionStore = useActionStore()
const { isVisible, previousRecord } = useParentIdWatcher(MeasurementInput.BLOOD_PRESSURE)

// Data
const inputRef: Ref<any> = ref(null)

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
</script>

<template>
  <QCard v-if="!locked && isVisible">
    <QCardSection>
      <div class="text-h6 q-mb-md">
        {{ label }}
        <QIcon v-if="locked" :name="Icon.LOCK" color="warning" class="q-pb-xs" />
      </div>

      <div class="row q-gutter-sm">
        <div class="col">
          <!-- Note: v-model.number for number types -->
          <QInput
            v-model.number="actionStore.record[DatabaseField.BLOOD_PRESSURE][0]"
            ref="inputRef"
            :label="`Systolic (${previousRecord?.bloodPressure?.[0] ?? '-'})`"
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
            :label="`Diastolic (${previousRecord?.bloodPressure?.[1] ?? '-'})`"
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

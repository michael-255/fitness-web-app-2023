<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { DatabaseField } from '@/types/database'
import { Icon } from '@/types/icons'
import { Limit } from '@/types/misc'
import { FieldDefault } from '@/services/Defaults'
import useActionStore from '@/stores/action'

// Props & Emits
defineProps<{
  locked?: boolean
  label: string
}>()

// Composables & Stores
const actionStore = useActionStore()

// Data
const inputRef: Ref<any> = ref(null)

onMounted(() => {
  actionStore.record[DatabaseField.HEART_RATE] =
    actionStore.record[DatabaseField.HEART_RATE] ?? FieldDefault[DatabaseField.HEART_RATE]() // function call

  actionStore.record[DatabaseField.HEART_RATE][0] =
    actionStore.record[DatabaseField.HEART_RATE][0] ?? FieldDefault[DatabaseField.HEART_RATE]()[0] // function call

  actionStore.record[DatabaseField.HEART_RATE][1] =
    actionStore.record[DatabaseField.HEART_RATE][1] ?? FieldDefault[DatabaseField.HEART_RATE]()[1] // function call

  // This input defaults itself, so it should always be valid
  actionStore.valid[DatabaseField.HEART_RATE] = true
})

/**
 * Defaults the input if the current value is not valid.
 */
function defaultNonValidInput() {
  const val =
    actionStore.record[DatabaseField.HEART_RATE] ?? FieldDefault[DatabaseField.HEART_RATE]() // function call
  const systolic = val[0] ?? FieldDefault[DatabaseField.HEART_RATE]()[0] // function call
  const diastolic = val[1] ?? FieldDefault[DatabaseField.HEART_RATE]()[1] // function call

  if (!(typeof systolic === 'number') || systolic < 0) {
    actionStore.record[DatabaseField.HEART_RATE][0] = FieldDefault[DatabaseField.HEART_RATE]()[0] // function call
  } else if (systolic > Limit.MAX_HEART_VALUE) {
    actionStore.record[DatabaseField.HEART_RATE][0] = Limit.MAX_HEART_VALUE
  }

  if (!(typeof diastolic === 'number') || diastolic < 0) {
    actionStore.record[DatabaseField.HEART_RATE][1] = FieldDefault[DatabaseField.HEART_RATE]()[1] // function call
  } else if (diastolic > Limit.MAX_HEART_VALUE) {
    actionStore.record[DatabaseField.HEART_RATE][1] = Limit.MAX_HEART_VALUE
  }
}
</script>

<template>
  <QCard v-show="!locked">
    <QCardSection>
      <div class="text-h6 q-mb-md">
        {{ label }}
        <QIcon v-if="locked" :name="Icon.LOCK" color="warning" class="q-pb-xs" />
      </div>

      <div class="q-mb-md">Measurement values for heart rate (systolic/diastolic).</div>

      <!-- Note: v-model.number for number types -->
      <QInput
        v-model.number="actionStore.record[DatabaseField.HEART_RATE][0]"
        ref="inputRef"
        label="Systolic"
        :disable="locked"
        type="number"
        dense
        outlined
        color="primary"
        @blur="defaultNonValidInput()"
      />
      <!-- Note: v-model.number for number types -->
      <QInput
        v-model.number="actionStore.record[DatabaseField.HEART_RATE][1]"
        ref="inputRef"
        label="Dystolic"
        :disable="locked"
        type="number"
        dense
        outlined
        color="primary"
        @blur="defaultNonValidInput()"
      />
    </QCardSection>
  </QCard>
</template>

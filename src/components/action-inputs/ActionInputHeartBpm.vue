<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { DatabaseField, DatabaseType, MeasurementInput } from '@/types/database'
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
const { isVisible } = useParentIdWatcher(DatabaseType.MEASUREMENT, MeasurementInput.HEART_BPM)

// Data
const inputRef: Ref<any> = ref(null)

onMounted(() => {
  actionStore.record[DatabaseField.HEART_BPM] =
    actionStore.record[DatabaseField.HEART_BPM] ?? FieldDefault[DatabaseField.HEART_BPM]() // function call
})

/**
 * Defaults the input if the current value is not valid.
 */
function defaultNonValidInput() {
  const val = actionStore.record[DatabaseField.HEART_BPM]

  if (!(typeof val === 'number') || val < 0) {
    actionStore.record[DatabaseField.HEART_BPM] = FieldDefault[DatabaseField.HEART_BPM]() // function call
  } else if (val > Limit.MAX_HEART_VALUE) {
    actionStore.record[DatabaseField.HEART_BPM] = Limit.MAX_HEART_VALUE
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

      <!-- Note: v-model.number for number types -->
      <QInput
        v-model.number="actionStore.record[DatabaseField.HEART_BPM]"
        ref="inputRef"
        :label="label"
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

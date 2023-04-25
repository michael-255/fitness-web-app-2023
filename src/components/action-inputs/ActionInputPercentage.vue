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
const { isVisible } = useParentIdWatcher(DatabaseType.MEASUREMENT, MeasurementInput.PERCENTAGE)

// Data
const inputRef: Ref<any> = ref(null)

onMounted(() => {
  actionStore.record[DatabaseField.PERCENTAGE] =
    actionStore.record[DatabaseField.PERCENTAGE] ?? FieldDefault[DatabaseField.PERCENTAGE]() // function call
})

/**
 * Defaults the input if the current value is not valid.
 */
function defaultNonValidInput() {
  const val = actionStore.record[DatabaseField.PERCENTAGE]

  if (!(typeof val === 'number') || val < 0) {
    actionStore.record[DatabaseField.PERCENTAGE] = FieldDefault[DatabaseField.PERCENTAGE]() // function call
  } else if (val > Limit.MAX_PERCENTAGE) {
    actionStore.record[DatabaseField.PERCENTAGE] = Limit.MAX_PERCENTAGE
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

      <div class="q-mb-md">Measurement value in percent.</div>

      <!-- Note: v-model.number for number types -->
      <QInput
        v-model.number="actionStore.record[DatabaseField.PERCENTAGE]"
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

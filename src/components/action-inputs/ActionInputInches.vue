<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { DatabaseField, MeasurementInput } from '@/types/database'
import { Icon } from '@/types/icons'
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
const { isVisible, previousRecord } = useParentIdWatcher(MeasurementInput.INCHES)

// Data
const inputRef: Ref<any> = ref(null)

onMounted(() => {
  actionStore.record[DatabaseField.INCHES] =
    actionStore.record[DatabaseField.INCHES] ?? FieldDefault[DatabaseField.INCHES]() // function call
})

/**
 * Defaults the input if the current value is not valid.
 */
function defaultNonValidInput() {
  const val = actionStore.record[DatabaseField.INCHES]

  if (!(typeof val === 'number') || val < 0) {
    actionStore.record[DatabaseField.INCHES] = FieldDefault[DatabaseField.INCHES]() // function call
  } else if (val > Number.MAX_SAFE_INTEGER) {
    actionStore.record[DatabaseField.INCHES] = Number.MAX_SAFE_INTEGER
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
        v-model.number="actionStore.record[DatabaseField.INCHES]"
        ref="inputRef"
        :label="`${previousRecord?.inches ?? 'No previous record'}`"
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

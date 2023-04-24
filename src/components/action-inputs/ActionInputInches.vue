<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { DatabaseField } from '@/types/database'
import { Icon } from '@/types/icons'
import { FieldDefault } from '@/services/Defaults'
import useActionStore from '@/stores/action'

// Props & Emits
defineProps<{
  locked?: boolean
}>()

// Composables & Stores
const actionStore = useActionStore()

// Data
const inputRef: Ref<any> = ref(null)

onMounted(() => {
  actionStore.record[DatabaseField.INCHES] =
    actionStore.record[DatabaseField.INCHES] ?? FieldDefault[DatabaseField.INCHES]() // function call
  // This input defaults itself, so it should always be valid
  actionStore.valid[DatabaseField.INCHES] = true
})

/**
 * Defaults the input if the current value is not valid.
 */
function defaultNonValidInput() {
  const val = actionStore.record[DatabaseField.INCHES] ?? 0

  if (!(typeof val === 'number') || val < 0) {
    actionStore.record[DatabaseField.INCHES] = 0
  } else if (val > Number.MAX_SAFE_INTEGER) {
    actionStore.record[DatabaseField.INCHES] = Number.MAX_SAFE_INTEGER
  }
}
</script>

<template>
  <QCard v-show="!locked">
    <QCardSection>
      <div class="text-h6 q-mb-md">
        Inches
        <QIcon v-if="locked" :name="Icon.LOCK" color="warning" class="q-pb-xs" />
      </div>

      <div class="q-mb-md">Measurement value in inches.</div>

      <!-- Note: v-model.number for number types -->
      <QInput
        v-model.number="actionStore.record[DatabaseField.INCHES]"
        ref="inputRef"
        label="Inches"
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

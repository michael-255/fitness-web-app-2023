<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { DatabaseField } from '@/types/database'
import { Icon } from '@/types/icons'
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
  actionStore.record[DatabaseField.LBS] =
    actionStore.record[DatabaseField.LBS] ?? FieldDefault[DatabaseField.LBS]() // function call
  // This input defaults itself, so it should always be valid
  actionStore.valid[DatabaseField.LBS] = true
})

/**
 * Defaults the input if the current value is not valid.
 */
function defaultNonValidInput() {
  const val = actionStore.record[DatabaseField.LBS]

  if (!(typeof val === 'number') || val < 0) {
    actionStore.record[DatabaseField.LBS] = FieldDefault[DatabaseField.LBS]() // function call
  } else if (val > Number.MAX_SAFE_INTEGER) {
    actionStore.record[DatabaseField.LBS] = Number.MAX_SAFE_INTEGER
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

      <div class="q-mb-md">Measurement value in pounds.</div>

      <!-- Note: v-model.number for number types -->
      <QInput
        v-model.number="actionStore.record[DatabaseField.LBS]"
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

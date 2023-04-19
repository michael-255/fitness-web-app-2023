<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { DatabaseField } from '@/types/database'
import { Icon } from '@/types/icons'
import useActionRecordStore from '@/stores/action-record'

// Props & Emits
defineProps<{
  locked?: boolean
}>()

// Composables & Stores
const actionRecordStore = useActionRecordStore()

// Data
const inputRef: Ref<any> = ref(null)

onMounted(() => {
  actionRecordStore.actionRecord[DatabaseField.LBS] =
    actionRecordStore.actionRecord[DatabaseField.LBS] ?? 0
  // This input defaults itself, so it should always be valid
  actionRecordStore.valid[DatabaseField.LBS] = true
})

/**
 * Defaults the input if the current value is not valid.
 */
function defaultNonValidInput() {
  const val = actionRecordStore.actionRecord[DatabaseField.LBS]

  if (!(typeof val === 'number') || val < 0) {
    actionRecordStore.actionRecord[DatabaseField.LBS] = 0
  } else if (val > Number.MAX_SAFE_INTEGER) {
    actionRecordStore.actionRecord[DatabaseField.LBS] = Number.MAX_SAFE_INTEGER
  }
}
</script>

<template>
  <QCard v-show="!locked">
    <QCardSection>
      <div class="text-h6 q-mb-md">
        Lbs
        <QIcon v-if="locked" :name="Icon.LOCK" color="warning" class="q-pb-xs" />
      </div>

      <div class="q-mb-md">Measurement value in pounds.</div>

      <!-- Note: v-model.number for number types -->
      <QInput
        v-model.number="actionRecordStore.actionRecord[DatabaseField.LBS]"
        ref="inputRef"
        label="Lbs"
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

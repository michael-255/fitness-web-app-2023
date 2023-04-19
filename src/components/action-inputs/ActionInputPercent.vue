<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { DatabaseField } from '@/types/database'
import { Icon } from '@/types/icons'
import { slugify } from '@/utils/common'
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
  actionRecordStore.actionRecord[DatabaseField.PERCENT] =
    actionRecordStore.actionRecord[DatabaseField.PERCENT] ?? 0
  actionRecordStore.valid[DatabaseField.PERCENT] = true
})

/**
 * Input validation rule test for the template component.
 * @param val
 */
function validationRule(val: number) {
  return typeof val === 'number' && val >= 0 && val <= 100
}

/**
 * Runs the input validation and sets the store valid property to the result. Slugifies the input.
 */
function validateInput() {
  actionRecordStore.actionRecord[DatabaseField.PERCENT] = slugify(
    actionRecordStore.actionRecord[DatabaseField.PERCENT]
  )
  actionRecordStore.valid[DatabaseField.PERCENT] = !!inputRef?.value?.validate()
}
</script>

<template>
  <QCard v-show="!locked">
    <QCardSection>
      <div class="text-h6 q-mb-md">
        Percent
        <QIcon v-if="locked" :name="Icon.LOCK" color="warning" class="q-pb-xs" />
      </div>

      <div class="q-mb-md">Measurement value in percent.</div>

      <!-- Note: v-model.number for number types -->
      <QInput
        v-model.number="actionRecordStore.actionRecord[DatabaseField.PERCENT]"
        ref="inputRef"
        label="Percent"
        :rules="[(val: number) => validationRule(val) || 'Percent must be a number between 0 and 100']"
        :disable="locked"
        :maxlength="50"
        type="number"
        counter
        dense
        outlined
        color="primary"
        @blur="validateInput()"
      />
    </QCardSection>
  </QCard>
</template>

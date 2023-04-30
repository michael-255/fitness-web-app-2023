<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { DatabaseField, MeasurementInput } from '@/types/database'
import { FieldDefault } from '@/services/Defaults'
import { Limit, type Optional } from '@/types/misc'
import useParentIdWatcher from '@/composables/useParentIdWatcher'
import useActionStore from '@/stores/action'

// Props & Emits
defineProps<{
  label: string
}>()

// Composables & Stores
const actionStore = useActionStore()
const { isVisible, previousRecord } = useParentIdWatcher(MeasurementInput.BODY_TAPE_MEASUREMENTS)

// Data
const inputRef: Ref<any> = ref(null)

onMounted(async () => {
  actionStore.record[DatabaseField.BODY_TAPE_MEASUREMENTS] =
    actionStore.record[DatabaseField.BODY_TAPE_MEASUREMENTS] ??
    FieldDefault[DatabaseField.BODY_TAPE_MEASUREMENTS]() // function call
})

/**
 * Formats the label for the input field based on the previous record value.
 * @param actionRecordValue
 */
function previousLabel(actionRecordValue: Optional<number>) {
  if (actionRecordValue !== null && actionRecordValue !== undefined) {
    return `Previously ${actionRecordValue} inches`
  } else {
    return 'No previous data'
  }
}

/**
 * Body measurement inches validation rule for the template component.
 */
function inchesRule() {
  return (val: Optional<number>) =>
    val === null ||
    val === undefined ||
    (val >= Limit.MIN_BODY_INCHES && val <= Limit.MAX_BODY_INCHES) ||
    `Inches must be between ${Limit.MIN_BODY_INCHES} and ${Limit.MAX_BODY_INCHES}`
}
</script>

<template>
  <QCard v-if="isVisible">
    <QCardSection>
      <div class="text-h6 q-mb-md">{{ label }}</div>

      <div class="q-mb-md">
        All tape measurements recorded here are the circumference of the body part in inches. You
        can leave inputs blank if desired.
      </div>

      <div class="text-h6 q-mb-md">Neck</div>

      <!-- Note: v-model.number for number types -->
      <QInput
        v-model.number="actionStore.record[DatabaseField.BODY_TAPE_MEASUREMENTS][0]"
        ref="inputRef"
        :label="previousLabel(previousRecord?.[DatabaseField.BODY_TAPE_MEASUREMENTS]?.[0])"
        :rules="[inchesRule()]"
        type="number"
        dense
        outlined
        color="primary"
      />

      <div class="text-h6 q-mb-md">Chest</div>

      <!-- Note: v-model.number for number types -->
      <QInput
        v-model.number="actionStore.record[DatabaseField.BODY_TAPE_MEASUREMENTS][1]"
        ref="inputRef"
        :label="previousLabel(previousRecord?.[DatabaseField.BODY_TAPE_MEASUREMENTS]?.[1])"
        :rules="[inchesRule()]"
        type="number"
        dense
        outlined
        color="primary"
      />

      <div class="text-h6 q-mb-md">Shoulders</div>

      <!-- Note: v-model.number for number types -->
      <QInput
        v-model.number="actionStore.record[DatabaseField.BODY_TAPE_MEASUREMENTS][2]"
        ref="inputRef"
        :label="previousLabel(previousRecord?.[DatabaseField.BODY_TAPE_MEASUREMENTS]?.[2])"
        :rules="[inchesRule()]"
        type="number"
        dense
        outlined
        color="primary"
      />

      <div class="text-h6 q-mb-md">Right bicep</div>

      <!-- Note: v-model.number for number types -->
      <QInput
        v-model.number="actionStore.record[DatabaseField.BODY_TAPE_MEASUREMENTS][3]"
        ref="inputRef"
        :label="previousLabel(previousRecord?.[DatabaseField.BODY_TAPE_MEASUREMENTS]?.[3])"
        :rules="[inchesRule()]"
        type="number"
        dense
        outlined
        color="primary"
      />

      <div class="text-h6 q-mb-md">Left bicep</div>

      <!-- Note: v-model.number for number types -->
      <QInput
        v-model.number="actionStore.record[DatabaseField.BODY_TAPE_MEASUREMENTS][4]"
        ref="inputRef"
        :label="previousLabel(previousRecord?.[DatabaseField.BODY_TAPE_MEASUREMENTS]?.[4])"
        :rules="[inchesRule()]"
        type="number"
        dense
        outlined
        color="primary"
      />

      <div class="text-h6 q-mb-md">Right Forearm</div>

      <!-- Note: v-model.number for number types -->
      <QInput
        v-model.number="actionStore.record[DatabaseField.BODY_TAPE_MEASUREMENTS][5]"
        ref="inputRef"
        :label="previousLabel(previousRecord?.[DatabaseField.BODY_TAPE_MEASUREMENTS]?.[5])"
        :rules="[inchesRule()]"
        type="number"
        dense
        outlined
        color="primary"
      />

      <div class="text-h6 q-mb-md">Left Forearm</div>

      <!-- Note: v-model.number for number types -->
      <QInput
        v-model.number="actionStore.record[DatabaseField.BODY_TAPE_MEASUREMENTS][6]"
        ref="inputRef"
        :label="previousLabel(previousRecord?.[DatabaseField.BODY_TAPE_MEASUREMENTS]?.[6])"
        :rules="[inchesRule()]"
        type="number"
        dense
        outlined
        color="primary"
      />

      <div class="text-h6 q-mb-md">Waist</div>

      <!-- Note: v-model.number for number types -->
      <QInput
        v-model.number="actionStore.record[DatabaseField.BODY_TAPE_MEASUREMENTS][7]"
        ref="inputRef"
        :label="previousLabel(previousRecord?.[DatabaseField.BODY_TAPE_MEASUREMENTS]?.[7])"
        :rules="[inchesRule()]"
        type="number"
        dense
        outlined
        color="primary"
      />

      <div class="text-h6 q-mb-md">Right Thigh</div>

      <!-- Note: v-model.number for number types -->
      <QInput
        v-model.number="actionStore.record[DatabaseField.BODY_TAPE_MEASUREMENTS][8]"
        ref="inputRef"
        :label="previousLabel(previousRecord?.[DatabaseField.BODY_TAPE_MEASUREMENTS]?.[8])"
        :rules="[inchesRule()]"
        type="number"
        dense
        outlined
        color="primary"
      />

      <div class="text-h6 q-mb-md">Left Thigh</div>

      <!-- Note: v-model.number for number types -->
      <QInput
        v-model.number="actionStore.record[DatabaseField.BODY_TAPE_MEASUREMENTS][9]"
        ref="inputRef"
        :label="previousLabel(previousRecord?.[DatabaseField.BODY_TAPE_MEASUREMENTS]?.[9])"
        :rules="[inchesRule()]"
        type="number"
        dense
        outlined
        color="primary"
      />

      <div class="text-h6 q-mb-md">Right Calf</div>

      <!-- Note: v-model.number for number types -->
      <QInput
        v-model.number="actionStore.record[DatabaseField.BODY_TAPE_MEASUREMENTS][10]"
        ref="inputRef"
        :label="previousLabel(previousRecord?.[DatabaseField.BODY_TAPE_MEASUREMENTS]?.[10])"
        :rules="[inchesRule()]"
        type="number"
        dense
        outlined
        color="primary"
      />

      <div class="text-h6 q-mb-md">Left Calf</div>

      <!-- Note: v-model.number for number types -->
      <QInput
        v-model.number="actionStore.record[DatabaseField.BODY_TAPE_MEASUREMENTS][11]"
        ref="inputRef"
        :label="previousLabel(previousRecord?.[DatabaseField.BODY_TAPE_MEASUREMENTS]?.[11])"
        :rules="[inchesRule()]"
        type="number"
        dense
        outlined
        color="primary"
      />
    </QCardSection>
  </QCard>
</template>

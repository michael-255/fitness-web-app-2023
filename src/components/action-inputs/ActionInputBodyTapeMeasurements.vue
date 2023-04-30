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
 * Formats text for the last recorded value.
 * @param actionRecordValue
 */
function lastRecordedValue(actionRecordValue: Optional<number>) {
  // TODO - Need to find the last recorded value from the database
  if (actionRecordValue !== null && actionRecordValue !== undefined) {
    return `→ ${actionRecordValue} in`
  } else {
    return ''
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
    `${Limit.MIN_BODY_INCHES}-${Limit.MAX_BODY_INCHES} or blank`
}

/**
 * Cleans the input value and sets it to the action store.
 * @param actionRecordValue
 * @param index
 */
function cleanInputValue(actionRecordValue: Optional<number>, index: number) {
  if (actionRecordValue) {
    actionStore.record[DatabaseField.BODY_TAPE_MEASUREMENTS][index] = parseFloat(
      actionRecordValue.toFixed(2)
    )
  } else {
    actionStore.record[DatabaseField.BODY_TAPE_MEASUREMENTS][index] = null
  }
}
</script>

<template>
  <QCard v-if="isVisible">
    <QCardSection>
      <div class="text-h6 q-mb-md">{{ label }}</div>

      <div class="q-mb-md">
        All tape measurements recorded here are the circumference of the body part in inches. The
        last recorded value will be displayed to the R. of the input. You can leave inputs blank if
        desired.
      </div>

      <div class="row q-gutter-sm q-mb-md">
        <div class="text-h6 q-pt-xs">Neck</div>

        <div class="col-3">
          <!-- Note: v-model.number for number types -->
          <QInput
            v-model.number="actionStore.record[DatabaseField.BODY_TAPE_MEASUREMENTS][0]"
            ref="inputRef"
            label="inches"
            :rules="[inchesRule()]"
            type="number"
            step="0.01"
            dense
            rounded
            outlined
            color="primary"
            @blur="cleanInputValue(actionStore.record[DatabaseField.BODY_TAPE_MEASUREMENTS][0], 0)"
          />
        </div>
        <div class="text-h6 q-pt-xs">
          {{ lastRecordedValue(previousRecord?.[DatabaseField.BODY_TAPE_MEASUREMENTS]?.[0]) }}
        </div>
      </div>

      <div class="row q-gutter-sm q-mb-md">
        <div class="text-h6 q-pt-xs">Chest</div>

        <div class="col-3">
          <!-- Note: v-model.number for number types -->
          <QInput
            v-model.number="actionStore.record[DatabaseField.BODY_TAPE_MEASUREMENTS][1]"
            ref="inputRef"
            label="inches"
            :rules="[inchesRule()]"
            type="number"
            step="0.01"
            dense
            rounded
            outlined
            color="primary"
            @blur="cleanInputValue(actionStore.record[DatabaseField.BODY_TAPE_MEASUREMENTS][1], 1)"
          />
        </div>
        <div class="text-h6 q-pt-xs">
          {{ lastRecordedValue(previousRecord?.[DatabaseField.BODY_TAPE_MEASUREMENTS]?.[1]) }}
        </div>
      </div>

      <div class="row q-gutter-sm q-mb-md">
        <div class="text-h6 q-pt-xs">Shoulders</div>

        <div class="col-3">
          <!-- Note: v-model.number for number types -->
          <QInput
            v-model.number="actionStore.record[DatabaseField.BODY_TAPE_MEASUREMENTS][2]"
            ref="inputRef"
            label="inches"
            :rules="[inchesRule()]"
            type="number"
            step="0.01"
            dense
            rounded
            outlined
            color="primary"
            @blur="cleanInputValue(actionStore.record[DatabaseField.BODY_TAPE_MEASUREMENTS][2], 2)"
          />
        </div>
        <div class="text-h6 q-pt-xs">
          {{ lastRecordedValue(previousRecord?.[DatabaseField.BODY_TAPE_MEASUREMENTS]?.[2]) }}
        </div>
      </div>

      <div class="row q-gutter-sm q-mb-md">
        <div class="text-h6 q-pt-xs">R. Bicep</div>

        <div class="col-3">
          <!-- Note: v-model.number for number types -->
          <QInput
            v-model.number="actionStore.record[DatabaseField.BODY_TAPE_MEASUREMENTS][3]"
            ref="inputRef"
            label="inches"
            :rules="[inchesRule()]"
            type="number"
            step="0.01"
            dense
            rounded
            outlined
            color="primary"
            @blur="cleanInputValue(actionStore.record[DatabaseField.BODY_TAPE_MEASUREMENTS][3], 3)"
          />
        </div>
        <div class="text-h6 q-pt-xs">
          {{ lastRecordedValue(previousRecord?.[DatabaseField.BODY_TAPE_MEASUREMENTS]?.[3]) }}
        </div>
      </div>

      <div class="row q-gutter-sm q-mb-md">
        <div class="text-h6 q-pt-xs">L. Bicep</div>

        <div class="col-3">
          <!-- Note: v-model.number for number types -->
          <QInput
            v-model.number="actionStore.record[DatabaseField.BODY_TAPE_MEASUREMENTS][4]"
            ref="inputRef"
            label="inches"
            :rules="[inchesRule()]"
            type="number"
            step="0.01"
            dense
            rounded
            outlined
            color="primary"
            @blur="cleanInputValue(actionStore.record[DatabaseField.BODY_TAPE_MEASUREMENTS][4], 4)"
          />
        </div>
        <div class="text-h6 q-pt-xs">
          {{ lastRecordedValue(previousRecord?.[DatabaseField.BODY_TAPE_MEASUREMENTS]?.[4]) }}
        </div>
      </div>

      <div class="row q-gutter-sm q-mb-md">
        <div class="text-h6 q-pt-xs">R. Forearm</div>

        <div class="col-3">
          <!-- Note: v-model.number for number types -->
          <QInput
            v-model.number="actionStore.record[DatabaseField.BODY_TAPE_MEASUREMENTS][5]"
            ref="inputRef"
            label="inches"
            :rules="[inchesRule()]"
            type="number"
            step="0.01"
            dense
            rounded
            outlined
            color="primary"
            @blur="cleanInputValue(actionStore.record[DatabaseField.BODY_TAPE_MEASUREMENTS][5], 5)"
          />
        </div>
        <div class="text-h6 q-pt-xs">
          {{ lastRecordedValue(previousRecord?.[DatabaseField.BODY_TAPE_MEASUREMENTS]?.[5]) }}
        </div>
      </div>

      <div class="row q-gutter-sm q-mb-md">
        <div class="text-h6 q-pt-xs">L. Forearm</div>

        <div class="col-3">
          <!-- Note: v-model.number for number types -->
          <QInput
            v-model.number="actionStore.record[DatabaseField.BODY_TAPE_MEASUREMENTS][6]"
            ref="inputRef"
            label="inches"
            :rules="[inchesRule()]"
            type="number"
            step="0.01"
            dense
            rounded
            outlined
            color="primary"
            @blur="cleanInputValue(actionStore.record[DatabaseField.BODY_TAPE_MEASUREMENTS][6], 6)"
          />
        </div>
        <div class="text-h6 q-pt-xs">
          {{ lastRecordedValue(previousRecord?.[DatabaseField.BODY_TAPE_MEASUREMENTS]?.[6]) }}
        </div>
      </div>

      <div class="row q-gutter-sm q-mb-md">
        <div class="text-h6 q-pt-xs">Waist</div>

        <div class="col-3">
          <!-- Note: v-model.number for number types -->
          <QInput
            v-model.number="actionStore.record[DatabaseField.BODY_TAPE_MEASUREMENTS][7]"
            ref="inputRef"
            label="inches"
            :rules="[inchesRule()]"
            type="number"
            step="0.01"
            dense
            rounded
            outlined
            color="primary"
            @blur="cleanInputValue(actionStore.record[DatabaseField.BODY_TAPE_MEASUREMENTS][7], 7)"
          />
        </div>
        <div class="text-h6 q-pt-xs">
          {{ lastRecordedValue(previousRecord?.[DatabaseField.BODY_TAPE_MEASUREMENTS]?.[7]) }}
        </div>
      </div>

      <div class="row q-gutter-sm q-mb-md">
        <div class="text-h6 q-pt-xs">R. Thigh</div>

        <div class="col-3">
          <!-- Note: v-model.number for number types -->
          <QInput
            v-model.number="actionStore.record[DatabaseField.BODY_TAPE_MEASUREMENTS][8]"
            ref="inputRef"
            label="inches"
            :rules="[inchesRule()]"
            type="number"
            step="0.01"
            dense
            rounded
            outlined
            color="primary"
            @blur="cleanInputValue(actionStore.record[DatabaseField.BODY_TAPE_MEASUREMENTS][8], 8)"
          />
        </div>
        <div class="text-h6 q-pt-xs">
          {{ lastRecordedValue(previousRecord?.[DatabaseField.BODY_TAPE_MEASUREMENTS]?.[8]) }}
        </div>
      </div>

      <div class="row q-gutter-sm q-mb-md">
        <div class="text-h6 q-pt-xs">L. Thigh</div>

        <div class="col-3">
          <!-- Note: v-model.number for number types -->
          <QInput
            v-model.number="actionStore.record[DatabaseField.BODY_TAPE_MEASUREMENTS][9]"
            ref="inputRef"
            label="inches"
            :rules="[inchesRule()]"
            type="number"
            step="0.01"
            dense
            rounded
            outlined
            color="primary"
            @blur="cleanInputValue(actionStore.record[DatabaseField.BODY_TAPE_MEASUREMENTS][9], 9)"
          />
        </div>
        <div class="text-h6 q-pt-xs">
          {{ lastRecordedValue(previousRecord?.[DatabaseField.BODY_TAPE_MEASUREMENTS]?.[9]) }}
        </div>
      </div>

      <div class="row q-gutter-sm q-mb-md">
        <div class="text-h6 q-pt-xs">R. Calf</div>

        <div class="col-3">
          <!-- Note: v-model.number for number types -->
          <QInput
            v-model.number="actionStore.record[DatabaseField.BODY_TAPE_MEASUREMENTS][10]"
            ref="inputRef"
            label="inches"
            :rules="[inchesRule()]"
            type="number"
            step="0.01"
            dense
            rounded
            outlined
            color="primary"
            @blur="
              cleanInputValue(actionStore.record[DatabaseField.BODY_TAPE_MEASUREMENTS][10], 10)
            "
          />
        </div>
        <div class="text-h6 q-pt-xs">
          {{ lastRecordedValue(previousRecord?.[DatabaseField.BODY_TAPE_MEASUREMENTS]?.[10]) }}
        </div>
      </div>

      <div class="row q-gutter-sm q-mb-md">
        <div class="text-h6 q-pt-xs">L. Calf</div>

        <div class="col-3">
          <!-- Note: v-model.number for number types -->
          <QInput
            v-model.number="actionStore.record[DatabaseField.BODY_TAPE_MEASUREMENTS][11]"
            ref="inputRef"
            label="inches"
            :rules="[inchesRule()]"
            type="number"
            step="0.01"
            dense
            rounded
            outlined
            color="primary"
            @blur="
              cleanInputValue(actionStore.record[DatabaseField.BODY_TAPE_MEASUREMENTS][11], 11)
            "
          />
        </div>
        <div class="text-h6 q-pt-xs">
          {{ lastRecordedValue(previousRecord?.[DatabaseField.BODY_TAPE_MEASUREMENTS]?.[11]) }}
        </div>
      </div>
    </QCardSection>
  </QCard>
</template>

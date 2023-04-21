<script setup lang="ts">
import { date } from 'quasar'
import { onMounted, type Ref, ref } from 'vue'
import { DatabaseField } from '@/types/database'
import { Icon } from '@/types/icons'
import type { Optional } from '@/types/misc'
import useActionStore from '@/stores/action'

// Props & Emits
defineProps<{
  locked?: boolean
}>()

// Composables & Stores
const actionStore = useActionStore()

// Data
const inputRef: Ref<any> = ref(null)
const displayedDate: Ref<Optional<string>> = ref(null)
const dateTimePicker: Ref<string> = ref('')

onMounted(() => {
  if (actionStore.record[DatabaseField.FINISHED_TIMESTAMP]) {
    updateDates(actionStore.record[DatabaseField.FINISHED_TIMESTAMP])
  } else {
    updateDates()
  }

  // Valid state starts true because you can have no finished date if you want.
  actionStore.valid[DatabaseField.FINISHED_TIMESTAMP] = true
})

/**
 * Updates the displayed date model value and the action record store. Defaults to now if no date provided.
 * @param timestamp
 */
function updateDates(timestamp: number = new Date().getTime()) {
  actionStore.record[DatabaseField.FINISHED_TIMESTAMP] = timestamp
  actionStore.valid[DatabaseField.FINISHED_TIMESTAMP] = true
  displayedDate.value = date.formatDate(timestamp, 'ddd, YYYY MMM Do, h:mm A')
}

/**
 * If a picker time exists, sets display date and model ref to the picker time.
 */
function onPickerDateTime() {
  if (dateTimePicker.value) {
    updateDates(new Date(dateTimePicker.value).getTime())
  }
}

/**
 * Clears the displayed date and action record date for the finished timestamp.
 */
function clearDates(): void {
  actionStore.record[DatabaseField.FINISHED_TIMESTAMP] = null
  displayedDate.value = null
}

/**
 * Runs the input validation and sets the store valid property to the result.
 */
function validateInput() {
  actionStore.valid[DatabaseField.FINISHED_TIMESTAMP] = !!inputRef?.value?.validate()
}
</script>

<template>
  <QCard v-show="!locked">
    <QCardSection>
      <div class="text-h6 q-mb-md">
        Finished Date
        <QIcon v-if="locked" :name="Icon.LOCK" color="warning" class="q-pb-xs" />
      </div>

      <div class="q-mb-md">
        Exact date and time the Workout was finished. Use the buttons on the right to select a
        customized date and time, or remove it.
      </div>

      <QInput
        v-model="displayedDate"
        ref="inputRef"
        label="Finished Date"
        dense
        outlined
        disable
        color="primary"
        hint="Auto formatted"
        @blur="validateInput()"
      >
        <template v-slot:after>
          <!-- Date Picker -->
          <QBtn :disable="locked" :icon="Icon.CALENDAR_DATE" color="primary" class="q-px-sm">
            <QPopupProxy>
              <QDate v-model="dateTimePicker">
                <div class="row items-center justify-end q-gutter-sm">
                  <QBtn label="Cancel" flat v-close-popup />
                  <QBtn label="OK" color="primary" flat @click="onPickerDateTime()" v-close-popup />
                </div>
              </QDate>
            </QPopupProxy>
          </QBtn>

          <!-- Time Picker -->
          <QBtn :disable="locked" :icon="Icon.CLOCK" color="primary" class="q-ml-sm q-px-sm">
            <QPopupProxy>
              <QTime v-model="dateTimePicker" now-btn>
                <div class="row items-center justify-end q-gutter-sm">
                  <QBtn label="Cancel" flat v-close-popup />
                  <QBtn label="OK" color="primary" flat @click="onPickerDateTime()" v-close-popup />
                </div>
              </QTime>
            </QPopupProxy>
          </QBtn>

          <!-- Clear DateTime -->
          <QBtn
            :icon="Icon.CALENDAR_CLEAR"
            color="negative"
            class="q-ml-sm q-px-sm"
            @click="clearDates()"
          />
        </template>
      </QInput>
    </QCardSection>
  </QCard>
</template>

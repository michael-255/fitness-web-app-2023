<script setup lang="ts">
import { date } from 'quasar'
import { onMounted, type Ref, ref } from 'vue'
import { DatabaseField } from '@/types/database'
import { Icon } from '@/types/icons'
import type { Optional } from '@/types/misc'
import useActionRecordStore from '@/stores/action-record'

// Props & Emits
defineProps<{
  locked?: boolean
}>()

// Composables & Stores
const actionRecordStore = useActionRecordStore()

// Data
const inputRef: Ref<any> = ref(null)
const displayedDate: Ref<Optional<string>> = ref(null)
const dateTimePicker: Ref<string> = ref('')

onMounted(() => {
  if (actionRecordStore.actionRecord[DatabaseField.FINISHED_TIMESTAMP]) {
    updateDates(actionRecordStore.actionRecord[DatabaseField.FINISHED_TIMESTAMP])
  } else {
    updateDates()
  }

  // Valid state starts true because you can have no finished date if you want.
  actionRecordStore.valid[DatabaseField.FINISHED_TIMESTAMP] = true
})

/**
 * Updates the displayed date model value and the action record store. Defaults to now if no date provided.
 * @param timestamp
 */
function updateDates(timestamp: number = new Date().getTime()) {
  actionRecordStore.actionRecord[DatabaseField.FINISHED_TIMESTAMP] = timestamp
  actionRecordStore.valid[DatabaseField.FINISHED_TIMESTAMP] = true
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
  actionRecordStore.actionRecord[DatabaseField.FINISHED_TIMESTAMP] = null
  displayedDate.value = null
}

/**
 * Runs the input validation and sets the store valid property to the result.
 */
function validateInput() {
  actionRecordStore.valid[DatabaseField.FINISHED_TIMESTAMP] = !!inputRef?.value?.validate()
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
            <QPopupProxy cover transition-show="scale" transition-hide="scale">
              <QDate v-model="dateTimePicker" mask="YYYY-MM-DDTHH:mm:ss.000Z">
                <div class="row items-center justify-end q-gutter-sm">
                  <QBtn label="Cancel" flat v-close-popup />
                  <QBtn label="OK" color="primary" flat @click="onPickerDateTime()" v-close-popup />
                </div>
              </QDate>
            </QPopupProxy>
          </QBtn>

          <!-- Time Picker -->
          <QBtn :disable="locked" :icon="Icon.CLOCK" color="primary" class="q-ml-sm q-px-sm">
            <QPopupProxy cover transition-show="scale" transition-hide="scale">
              <QTime v-model="dateTimePicker" now-btn mask="YYYY-MM-DDTHH:mm:ss.000Z">
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
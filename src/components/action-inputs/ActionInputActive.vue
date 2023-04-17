<script setup lang="ts">
import { DatabaseField } from '@/types/database'
import { Icon } from '@/types/icons'
import { onMounted } from 'vue'
import useActionRecordStore from '@/stores/action-record'

// Props & Emits
defineProps<{
  locked?: boolean
}>()

// Composables & Stores
const actionRecordStore = useActionRecordStore()

onMounted(() => {
  actionRecordStore.actionRecord[DatabaseField.IS_ACTIVE] =
    actionRecordStore.actionRecord[DatabaseField.IS_ACTIVE] ?? false
  actionRecordStore.valid[DatabaseField.IS_ACTIVE] = true
})
</script>

<template>
  <QCard v-show="!locked">
    <QCardSection>
      <div class="text-h6 q-mb-md">
        Active
        <QIcon v-if="locked" :name="Icon.LOCK" color="warning" class="q-pb-xs" />
      </div>

      <div class="q-mb-md">
        Toggle whether this Child record is part of the current Active Workout. Do NOT edit this
        value unless you know what you are doing.
      </div>

      <QToggle
        :disable="locked"
        v-model="actionRecordStore.actionRecord[DatabaseField.IS_ACTIVE]"
      />
    </QCardSection>
  </QCard>
</template>

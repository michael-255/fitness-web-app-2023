<script setup lang="ts">
import { DatabaseField } from '@/types/database'
import { Icon } from '@/types/icons'
import { onMounted } from 'vue'
import { FieldDefault } from '@/services/Defaults'
import useActionStore from '@/stores/action'

// Props & Emits
defineProps<{
  locked?: boolean
  label: string
}>()

// Composables & Stores
const actionStore = useActionStore()

onMounted(() => {
  actionStore.record[DatabaseField.IS_ACTIVE] =
    actionStore.record[DatabaseField.IS_ACTIVE] ?? FieldDefault[DatabaseField.IS_ACTIVE]() // function call
})
</script>

<template>
  <QCard v-show="!locked">
    <QCardSection>
      <div class="text-h6 q-mb-md">
        {{ label }}
        <QIcon v-if="locked" :name="Icon.LOCK" color="warning" class="q-pb-xs" />
      </div>

      <div class="q-mb-md">
        Toggle whether this Child record is part of the current Active Workout. Do NOT edit this
        value unless you know what you are doing.
      </div>

      <QToggle :disable="locked" v-model="actionStore.record[DatabaseField.IS_ACTIVE]" />
    </QCardSection>
  </QCard>
</template>

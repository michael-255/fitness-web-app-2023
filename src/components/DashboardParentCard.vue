<script setup lang="ts">
import { useTimeAgo } from '@vueuse/core'
import {
  DatabaseField,
  DatabaseType,
  type DatabaseParentType,
  type SettingValue,
} from '@/types/database'
import { Icon } from '@/types/icons'
import { getDisplayDate } from '@/utils/common'
import type { Optional } from '@/types/misc'
import useLogger from '@/composables/useLogger'
import useDialogs from '@/composables/useDialogs'
import useRoutables from '@/composables/useRoutables'
import DB from '@/services/LocalDatabase'
import type { DatabaseRecord } from '@/types/models'

// Props & Emits
defineProps<{
  type: DatabaseParentType
  id: string
  name: string
  showDescription: Optional<SettingValue>
  description: Optional<string>
  isFavorited: boolean
  // Will be undefined if no record is found
  previousRecord?: DatabaseRecord
}>()

// Composables & Stores
const { log } = useLogger()
const { goToInspect, goToEdit, goToCharts } = useRoutables()
const { confirmDialog, dismissDialog } = useDialogs()

/**
 * Opens a dialog that displays the previous record note.
 * @param note
 */
async function viewPreviousNote(note: string) {
  dismissDialog('Previous Note', note, Icon.NOTE, 'info')
}

/**
 * On confirmation, favorite the matching record in the database.
 * @param type
 * @param id
 * @param name
 */
async function onFavorite(type: DatabaseParentType, id: string, name: string) {
  confirmDialog(
    'Favorite',
    `Do you want to favorite ${name}?`,
    Icon.FAVORITE_ON,
    'info',
    async () => {
      try {
        await DB.updateRecord(type, id, { [DatabaseField.IS_FAVORITED]: true })
        log.info(`${name} favorited`, { favoritedRecordType: type, favoritedRecordId: id })
      } catch (error) {
        log.error('Favorite update failed', error)
      }
    }
  )
}

/**
 * On confirmation, unfavorite the matching record in the database.
 * @param type
 * @param id
 * @param name
 */
async function onUnfavorite(type: DatabaseParentType, id: string, name: string) {
  confirmDialog(
    'Unfavorite',
    `Do you want to unfavorite ${name}?`,
    Icon.FAVORITE_OFF,
    'info',
    async () => {
      try {
        await DB.updateRecord(type, id, { [DatabaseField.IS_FAVORITED]: false })
        log.info(`${name} unfavorited`, {
          unfavoritedRecordType: type,
          unfavoritedRecordId: id,
        })
      } catch (error) {
        log.error('Unfavorite update failed', error)
      }
    }
  )
}

/**
 * On confirmation, delete the matching record from the database.
 * @param type
 * @param id
 */
async function onDeleteRecord(type: DatabaseType, id: string) {
  confirmDialog(
    'Delete Record',
    `Permanently delete record ${id} from ${type}?`,
    Icon.DELETE,
    'negative',
    async () => {
      try {
        await DB.deleteRecord(type, id)
        log.info('Successfully deleted record', { deletedRecordType: type, deletedRecordId: id })
      } catch (error) {
        log.error('Delete failed', error)
      }
    }
  )
}
</script>

<template>
  <QCard>
    <QCardSection>
      <div class="text-h6 q-mb-md">{{ name }}</div>

      <!-- Description (if show setting is true) -->
      <div v-if="showDescription" class="q-mb-md">{{ description }}</div>

      <!-- Top right corner buttons on card -->
      <div class="absolute-top-right q-ma-xs">
        <!-- Note Icon -->
        <QIcon
          v-show="previousRecord?.[DatabaseField.NOTE]"
          :name="Icon.NOTE"
          color="primary"
          size="md"
          class="cursor-pointer q-mr-xs"
          @click="viewPreviousNote(previousRecord?.[DatabaseField.NOTE] || '')"
        />

        <!-- Favorite Star Icon -->
        <QIcon
          v-show="isFavorited"
          :name="Icon.FAVORITE_ON"
          color="warning"
          size="md"
          class="cursor-pointer"
          @click="onUnfavorite(type, id, name)"
        />
        <QIcon
          v-show="!isFavorited"
          :name="Icon.FAVORITE_OFF"
          color="grey"
          size="md"
          class="cursor-pointer"
          @click="onFavorite(type, id, name)"
        />

        <!-- Vertical Actions Menu -->
        <QBtn round flat :icon="Icon.MENU_VERTICAL">
          <QMenu
            auto-close
            anchor="top right"
            transition-show="flip-right"
            transition-hide="flip-left"
          >
            <QList>
              <QItem clickable @click="goToInspect(type, id)">
                <QItemSection avatar>
                  <QIcon color="primary" :name="Icon.INSPECT" />
                </QItemSection>
                <QItemSection>Inspect</QItemSection>
              </QItem>

              <QItem clickable @click="goToEdit(type, id)">
                <QItemSection avatar>
                  <QIcon color="primary" :name="Icon.EDIT" />
                </QItemSection>
                <QItemSection>Edit</QItemSection>
              </QItem>

              <QItem clickable @click="goToCharts(type, id)">
                <QItemSection avatar>
                  <QIcon color="primary" :name="Icon.CHARTS" />
                </QItemSection>
                <QItemSection>Charts</QItemSection>
              </QItem>

              <QSeparator />

              <QItem clickable @click="onDeleteRecord(type, id)">
                <QItemSection avatar>
                  <QIcon color="negative" :name="Icon.DELETE" />
                </QItemSection>
                <QItemSection>Delete</QItemSection>
              </QItem>
            </QList>
          </QMenu>
        </QBtn>
      </div>

      <div class="q-mb-md">
        <!-- Time Ago Display -->
        <QBadge rounded color="secondary" class="q-py-none">
          <QIcon :name="Icon.PREVIOUS" />
          <span class="text-caption q-ml-xs">
            {{
              useTimeAgo(previousRecord?.[DatabaseField.CREATED_TIMESTAMP] || '').value ||
              'No previous records'
            }}
          </span>
        </QBadge>

        <!-- Previous Record Created Date -->
        <div v-if="previousRecord?.[DatabaseField.CREATED_TIMESTAMP]">
          <QIcon :name="Icon.CALENDAR_CHECK" />
          <span class="text-caption q-ml-xs">{{
            getDisplayDate(previousRecord?.[DatabaseField.CREATED_TIMESTAMP])
          }}</span>
        </div>
      </div>

      <!-- Slot -->
      <div>
        <slot />
      </div>
    </QCardSection>
  </QCard>
</template>

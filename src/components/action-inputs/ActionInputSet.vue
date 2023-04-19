<script setup lang="ts">
// import { QBtn, QSpace, QCard, QCardSection, QSeparator } from 'quasar'
// import { useSimpleDialogs } from '@/use/useSimpleDialogs'
// import { useLogger } from '@/use/useLogger'
// import { Icon } from '@/constants/ui/icon-enums'
// import { NotifyColor } from '@/constants/ui/color-enums'
// import { onMounted, ref, watch, type Ref } from 'vue'
// import { AppTable, ExerciseTracks, Field } from '@/constants/core/data-enums'
// import { DB } from '@/services/LocalDatabase'
// import type { Exercise } from '@/models/Exercise'
// import useOperationDialogStore from '@/stores/operation-dialog'
// import WeightRepsItem from '@/components/shared/operation-dialog/inputs/WeightRepsItem.vue'

// const { log } = useLogger()
// const { confirmDialog, dismissDialog } = useSimpleDialogs()
// const operationDialogStore = useOperationDialogStore()
// const exerciseTracks: Ref<ExerciseTracks> = ref(ExerciseTracks.REMINDER_ONLY)
// const setLimit = 20 // Not allowing more then 20 sets ATM

// onMounted(() => {
//   initializeTemporaryItem()
// })

// function initializeTemporaryItem(): void {
//   try {
//     const selectedWeight = operationDialogStore.selectedItem.weight
//     const selectedReps = operationDialogStore.selectedItem.reps

//     // Initialize temporary item fields based on selected item
//     operationDialogStore.temporaryItem.weight =
//       selectedWeight && selectedWeight.length > 0
//         ? [...operationDialogStore.selectedItem.weight]
//         : []
//     operationDialogStore.temporaryItem.reps =
//       selectedReps && selectedReps.length > 0 ? [...operationDialogStore.selectedItem.reps] : []

//     // Set validate item
//     operationDialogStore.validateItem.weight = true
//     operationDialogStore.validateItem.reps = true
//   } catch (error) {
//     log.error('SetInput:initializeTemporaryItem', error)
//   }
// }

// function addSet(): void {
//   if (exerciseTracks.value === ExerciseTracks.WEIGHT_AND_REPS) {
//     operationDialogStore.temporaryItem.weight.push(undefined)
//     operationDialogStore.temporaryItem.reps.push(undefined)
//     operationDialogStore.validateItem.weight = false
//     operationDialogStore.validateItem.reps = false
//   } else {
//     log.info('Exercise does not support sets')
//   }
// }

// function removeSet(): void {
//   if (
//     exerciseTracks.value === ExerciseTracks.WEIGHT_AND_REPS &&
//     operationDialogStore.validateItem.weight &&
//     operationDialogStore.validateItem.reps
//   ) {
//     confirmDialog(
//       'Remove Set',
//       'Are you sure you want to remove the last set?',
//       Icon.DELETE,
//       NotifyColor.ERROR,
//       () => {
//         operationDialogStore.temporaryItem.weight.pop()
//         operationDialogStore.temporaryItem.reps.pop()
//       }
//     )
//   } else {
//     dismissDialog(
//       'Validation Errors',
//       'Cannot remove any sets until validation errors are cleared.',
//       Icon.WARN,
//       NotifyColor.WARN
//     )
//   }
// }

// watch(
//   () => operationDialogStore?.temporaryItem?.parentId as string | undefined,
//   async (parentId) => {
//     try {
//       if (parentId) {
//         const parentExerciseTracks = (
//           (await DB.getFirstByField(AppTable.EXERCISES, Field.ID, parentId)) as Exercise
//         )?.exerciseTracks as ExerciseTracks

//         exerciseTracks.value = parentExerciseTracks
//         initializeTemporaryItem()
//       }
//     } catch (error) {
//       log.critical('Exercise parent watcher', error)
//     }
//   },
//   { immediate: true }
// )
</script>

<template>
  <div></div>
  <!-- <QCard v-if="exerciseTracks === ExerciseTracks.WEIGHT_AND_REPS">
    <QCardSection class="row items-start q-py-sm">
      <div class="text-h6">Sets</div>

      <QSpace /> -->
  <!-- Check length on one of the set properties -->
  <!-- <QBtn
        :disable="operationDialogStore.temporaryItem.weight.length >= setLimit"
        round
        color="positive"
        size="sm"
        :icon="Icon.ADD"
        @click="addSet()"
      />
    </QCardSection>

    <QSeparator />

    <QCardSection class="q-gutter-md row items-start q-py-none">
      <div class="text-caption">#</div>
      <QSeparator vertical />
      <div class="text-caption col">Weight</div>
      <QSeparator vertical />
      <div class="text-caption col">Reps</div>
    </QCardSection>

    <QSeparator />

    <QCardSection>
      <div
        v-for="(x, index) in operationDialogStore.temporaryItem.reps"
        :key="index"
        class="q-gutter-md row items-start q-mb-sm"
      >
        <div class="text-bold q-mt-lg">{{ index + 1 }}</div>

        <WeightRepsItem
          :index="index"
          :weight="operationDialogStore.temporaryItem.weight[index]"
          :reps="operationDialogStore.temporaryItem.reps[index]"
        />
      </div>

      <div align="right">
        <QBtn
          :disable="!operationDialogStore.temporaryItem.reps.length"
          round
          color="negative"
          size="sm"
          :icon="Icon.REMOVE"
          @click="removeSet()"
        />
      </div>
    </QCardSection>
  </QCard>

  <QCard v-else>
    <QCardSection class="row items-start">
      <div>Exercise tracking is set to "{{ ExerciseTracks.REMINDER_ONLY }}"</div>
    </QCardSection>
  </QCard> -->
</template>

<script setup lang="ts">
import { Icon } from '@/types/icons'
import { useMeta } from 'quasar'
import { AppName } from '@/types/misc'
import ResponsivePage from '@/components/ResponsivePage.vue'

useMeta({ title: `${AppName} - Active Workout` })
</script>

<template>
  <ResponsivePage :bannerIcon="Icon.WORKOUT" bannerTitle="TODO - Workout Name">
    <QCard>
      <QCardSection> WORK IN PROGRESS </QCardSection>
    </QCard>
  </ResponsivePage>
</template>

<script setup lang="ts">
import { Icon } from '@/types/icons'
import { RouteName } from '@/router/route-names'
import { useMeta } from 'quasar'
import { AppName, AppDescription } from '@/types/misc'
import ResponsivePage from '@/components/ResponsivePage.vue'

useMeta({ title: `${AppName} - About` })
</script>

<template>
  <ResponsivePage :bannerIcon="Icon.INFO" bannerTitle="About">
    <QCard>
      <QCardSection>
        <div class="q-mb-md">{{ AppDescription }}</div>

        <div class="q-mb-md">
          Feel free to checkout my other projects or help support my work with a donation. Thanks
          for visiting!
        </div>

        <div class="row q-col-gutter-md justify-center">
          <div class="col-sm-4 col-xs-12">
            <QBtn
              class="full-width"
              color="primary"
              label="Blog"
              target="_blank"
              href="https://www.example.com"
              :icon="Icon.WEB"
            />
          </div>

          <div class="col-sm-4 col-xs-12">
            <QBtn
              class="full-width"
              color="primary"
              label="GitHub"
              target="_blank"
              href="https://github.com/michael-255"
              :icon="Icon.CODE"
            />
          </div>

          <div class="col-sm-4 col-xs-12">
            <QBtn
              class="full-width"
              color="warning"
              label="Donate"
              :to="{ name: RouteName.DONATE }"
              :icon="Icon.DONATE"
            />
          </div>
        </div>
      </QCardSection>
    </QCard>
  </ResponsivePage>
</template>

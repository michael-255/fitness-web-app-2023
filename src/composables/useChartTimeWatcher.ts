import type { ChartTime } from '@/types/misc'
import { watch } from 'vue'
import useUIStore from '@/stores/ui'
import useLogger from './useLogger'

export default function useChartTimeWatcher(chartUpdateFunc: () => Promise<void>) {
  const uiStore = useUIStore()
  const { log } = useLogger()

  /**
   * Watching uiStore chart time for the property to change.
   * The provided function is called when the property changes.
   */
  watch(
    () => uiStore.chartTime as ChartTime,
    async () => {
      try {
        await chartUpdateFunc()
      } catch (error) {
        log.error('Error with chart time watcher', error)
      }
    },
    { immediate: true }
  )
}

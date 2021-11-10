import { computed, ComputedRef } from "vue";
import { useStore } from "vuex";
import { GlobalDataPropsKey } from '@/store/index'

export function useMapGetters<T extends string>(keys: T[]) {
  const res: Record<string, ComputedRef> = {}
  const { getters } = useStore(GlobalDataPropsKey)
  keys.map(key => {
    if (Reflect.has(getters, key)) {
      res[key] = computed(() => getters[key])
    }
  })

  return res as any as Record<T, ComputedRef>
}
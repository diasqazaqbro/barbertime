import { useSearchParams } from 'react-router-dom'
import { CATEGORIES, type Category } from '@/entities/service'

/** Active category lives in the URL (?category=beard) so filtered lists are shareable. */
export function useCategoryFilter() {
  const [params, setParams] = useSearchParams()
  const category = CATEGORIES.find((c) => c.toLowerCase() === params.get('category')) ?? null

  const setCategory = (next: Category | null) =>
    setParams(next ? { category: next.toLowerCase() } : {}, { replace: true, preventScrollReset: true })

  return [category, setCategory] as const
}

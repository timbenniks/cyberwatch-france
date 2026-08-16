import { querySources } from '~~/server/utils/queries'

/** GET /api/sources — every source, with the incidents that cite it. */
export default defineEventHandler(() => querySources())

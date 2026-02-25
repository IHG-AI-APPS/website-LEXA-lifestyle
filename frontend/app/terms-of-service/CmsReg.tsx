'use client'

import { useCms } from '@/hooks/useCms'

export default function CmsReg() {
  useCms('page_terms_of_service', null)
  return null
}

import { redirect } from 'next/navigation'
import MarineYachtRedirectCms from './MarineYachtRedirectCms'

export default function MarineYachtRedirect() {
  // 301 redirect to the correct yacht automation page
  redirect('/solutions/yacht-automation')
}

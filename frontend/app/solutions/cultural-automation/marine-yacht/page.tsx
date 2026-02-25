import { redirect } from 'next/navigation'

export default function MarineYachtRedirect() {
  // 301 redirect to the correct yacht automation page
  redirect('/solutions/yacht-automation')
}

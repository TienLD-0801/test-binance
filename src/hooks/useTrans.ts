import { useRouter } from 'next/router'
import en from '@/lang/en.json'
import ja from '@/lang/ja.json'

const useTrans = () => {
  const { locale } = useRouter()
  const trans = locale === 'en' ? en : ja
  return trans
}

export default useTrans

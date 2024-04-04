import useTrans from '@/hooks/useTrans'

const Home = () => {
  const t = useTrans()
  return <div> asd{t.welcome.home.title}</div>
}

export default Home

import useTrans from '@/hooks/useTrans'

const About = () => {
  const t = useTrans()
  return <div>{t.welcome.about.title}</div>
}

export default About

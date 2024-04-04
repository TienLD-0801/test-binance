import { ConfigProvider } from 'antd'
import { Provider } from 'react-redux'
import { wrapper } from '@/stores'
import theme from '@/utils/themeConfig'
import { AppProps } from 'next/app'
import usePersistor from '@/lib/persistConfig'
import '@/css/index.scss'

const App = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest)
  usePersistor(store)

  return (
    <Provider store={store}>
      <ConfigProvider theme={theme} />
      <Component {...props.pageProps} />
    </Provider>
  )
}

export default App

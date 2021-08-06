import Head from 'next/head'
import HomePage from './home'


export default function Home() {
  return (
    <div>
      <Head>
        <title>Chesa Social Media App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://images.unsplash.com/photo-1600480505021-e9cfb05527f1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=746&q=80" />
      </Head>

      <HomePage />
    </div>
  )
}

import * as Solid from 'solid-js'
import { Router, Routes, Route } from '@solidjs/router'
import { Home } from './components/routes/Home'
import { DataProvider } from './components/DataProvider'
import { What } from './components/routes/What'

export const App: Solid.Component = () => (
  <DataProvider>
    <Router>
      <main>
        <Routes>
          <Route path="/" component={Home} />
          <Route path="/hvad" component={What} />
        </Routes>
      </main>
    </Router>
  </DataProvider>
)

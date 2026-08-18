import { lazy, Suspense } from 'react'
import { Decisions } from './components/Decisions'
import { Edges } from './components/Edges'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Journey } from './components/Journey'
import { Nav } from './components/Nav'
import { Release } from './components/Release'
import { Stack } from './components/Stack'
import { Surfaces } from './components/Surfaces'

const Scope = lazy(() => import('./components/Scope').then((module) => ({ default: module.Scope })))
const Canvas = lazy(() => import('./components/Canvas').then((module) => ({ default: module.Canvas })))
const System = lazy(() => import('./components/System').then((module) => ({ default: module.System })))
const Chat = lazy(() => import('./components/Chat').then((module) => ({ default: module.Chat })))
const Weeks = lazy(() => import('./components/Weeks').then((module) => ({ default: module.Weeks })))
const Analytics = lazy(() => import('./components/Analytics').then((module) => ({ default: module.Analytics })))
const Risks = lazy(() => import('./components/Risks').then((module) => ({ default: module.Risks })))

function SectionFallback({ height }: { height: string }) {
  return (
    <div className="page-gutter page-width py-10" aria-hidden="true">
      <div className={`animate-pulse rounded-[16px] bg-elevated ${height}`} />
    </div>
  )
}

export default function App() {
  return (
    <>
      <a
        href="#plan"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[50] focus:rounded-full focus:bg-accent-solid focus:px-4 focus:py-2 focus:text-sm focus:text-on-accent focus:outline-none"
      >
        Skip to plan
      </a>
      <div className="grain" aria-hidden="true" />
      <Nav />
      <main>
        <Hero />
        <Suspense fallback={<SectionFallback height="h-80" />}>
          <Scope />
        </Suspense>
        <Surfaces />
        <Suspense fallback={<SectionFallback height="h-[28rem]" />}>
          <Canvas />
        </Suspense>
        <Suspense fallback={<SectionFallback height="h-[28rem]" />}>
          <System />
        </Suspense>
        <Suspense fallback={<SectionFallback height="h-[28rem]" />}>
          <Chat />
        </Suspense>
        <Suspense fallback={<SectionFallback height="h-[28rem]" />}>
          <Weeks />
        </Suspense>
        <Journey />
        <Stack />
        <Suspense fallback={<SectionFallback height="h-80" />}>
          <Analytics />
        </Suspense>
        <Edges />
        <Release />
        <Suspense fallback={<SectionFallback height="h-80" />}>
          <Risks />
        </Suspense>
        <Decisions />
      </main>
      <Footer />
    </>
  )
}

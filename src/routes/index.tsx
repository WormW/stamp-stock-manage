import { createRootRoute, createRoute } from '@tanstack/react-router'
import App from '../App'
import { StampManager } from '@/components/StampManager'

const rootRoute = createRootRoute({
  component: () => <App />,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">仪表盘</h2>
      </div>
      <StampManager />
    </div>
  ),
})

export const routeTree = rootRoute.addChildren([indexRoute])
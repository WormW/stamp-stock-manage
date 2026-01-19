import { createRootRoute, createRoute, createRouter, Outlet } from '@tanstack/react-router'
import App from '../App'

const rootRoute = createRootRoute({
  component: () => <App />,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome to Stamp Stock Manage</h1>
      <p className="mt-2 text-muted-foreground">Select a menu item to get started.</p>
    </div>
  ),
})

export const routeTree = rootRoute.addChildren([indexRoute])

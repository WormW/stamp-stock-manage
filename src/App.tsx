import { Outlet } from '@tanstack/react-router'

function App() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex h-14 items-center">
          <h1 className="text-lg font-semibold">Stamp Stock Manage</h1>
        </div>
      </header>
      <main className="container py-6">
        <Outlet />
      </main>
    </div>
  )
}

export default App

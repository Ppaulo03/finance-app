import DashboardPage from "./modules/dashboard/DashboardPage";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow p-4 text-xl font-bold">
        Controle Financeiro
      </header>
      <main className="max-w-4xl mx-auto mt-6">
        <DashboardPage />
      </main>
    </div>
  );
}

export default App;

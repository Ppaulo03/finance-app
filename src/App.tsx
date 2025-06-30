import DashboardPage from "./modules/dashboard/DashboardPage";

function App() {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <header className="shadow p-4 text-xl font-bold">
        Controle Financeiro
      </header>
      <main className="max-w-4xl mx-auto mt-6">
        <DashboardPage />
      </main>
    </div>
  );
}

export default App;

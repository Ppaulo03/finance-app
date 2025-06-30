import SectionTitle from "../../components/SectionTitle";

const accounts = [
  { name: "Conta Corrente", balance: 3200 },
  { name: "Poupança", balance: 5000 },
  { name: "Cartão de Crédito", balance: -1500 },
];

export default function AccountBalance() {
  return (
    <div>
      <SectionTitle title="Saldos por Conta" />
      <div className="bg-white p-4 shadow rounded">
        <ul>
          {accounts.map((acc) => (
            <li
              key={acc.name}
              className="flex justify-between py-2 border-b text-sm"
            >
              <span>{acc.name}</span>
              <span
                className={acc.balance < 0 ? "text-red-600" : "text-green-600"}
              >
                R$ {acc.balance.toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

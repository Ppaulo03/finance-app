import Card from "../../components/Card";
import SectionTitle from "../../components/SectionTitle";

const data = {
  income: 12500,
  expenses: 7800,
  balance: 4700,
};

export default function MonthlySummary() {
  return (
    <div>
      <SectionTitle title="Resumo do Mês" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Entradas" value={data.income} type="income" />
        <Card title="Saídas" value={data.expenses} type="expense" />
        <Card title="Saldo" value={data.balance} type="balance" />
      </div>
    </div>
  );
}

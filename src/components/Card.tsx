interface Props {
  title: string;
  value: number;
  type?: "income" | "expense" | "balance";
}

export default function Card({ title, value, type }: Props) {
  const color =
    type === "income"
      ? "text-green-600"
      : type === "expense"
      ? "text-red-600"
      : "text-blue-600";

  return (
    <div className="bg-white p-4 shadow rounded">
      <p className="text-sm text-gray-500">{title}</p>
      <p className={`text-xl font-semibold ${color}`}>
        R$ {value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
      </p>
    </div>
  );
}

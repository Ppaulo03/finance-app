interface Props {
  title: string;
}

export default function SectionTitle({ title }: Props) {
  return <h2 className="text-lg font-bold mb-2">{title}</h2>;
}

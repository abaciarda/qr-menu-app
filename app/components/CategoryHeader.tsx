interface CategoryHeaderProps {
  title: string;
  count: number;
  unit?: string;
}

export default function CategoryHeader({ title, count, unit = "Products" }: CategoryHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="font-display font-bold text-xl text-ink">{title}</h1>
      <p className="text-sm text-ink-muted">
        {count} {unit}
      </p>
    </div>
  );
}

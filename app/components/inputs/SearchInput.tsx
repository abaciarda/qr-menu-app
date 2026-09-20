import { SearchIcon } from "lucide-react";

export default function SearchInput({
  placeholder = "Search...",
}: {
  placeholder?: string;
}) {
  return (
    <div className="relative">
      <SearchIcon
        size={18}
        strokeWidth={2}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-ui-ink-muted pointer-events-none"
      />
      <input
        type="text"
        placeholder={placeholder}
        className="w-full h-12 bg-ui-surface rounded-full pl-11 pr-4 text-sm text-ui-ink placeholder:text-ui-ink-muted outline-none border border-transparent focus:bg-ui-surface-raised focus:border-ui-line focus:shadow-sm transition-colors"
      />
    </div>
  );
}
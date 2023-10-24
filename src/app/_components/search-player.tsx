type SearchBarProps = {
  filterText: string,
  onFilterTextChange: (filterText: string) => void;
}

export function SearchBar({
  filterText,
  onFilterTextChange,
}: SearchBarProps) {
  return (
    <form>
      <input
        className="text-black"
        type="text"
        value={filterText} placeholder="Search..."
        onChange={(e) => onFilterTextChange(e.target.value)} />
    </form>
  );
}

interface SportFilterProps {
  selected: string | null
  onSelect: (sport: string | null) => void
  sports: string[]
}

export const SportFilter = ({
  selected,
  onSelect,
  sports,
}: SportFilterProps) => {
  return (
    <div className="flex flex-wrap gap-1.5">
      <button
        key="all-sports"
        onClick={() => onSelect(null)}
        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
          selected
            ? "bg-card border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
            : "bg-primary text-primary-foreground"
        }`}
      >
        Tous les sports
      </button>
      {sports.map((sport, index) => (
        <button
          key={`sport-${index}-${sport}`}
          onClick={() => onSelect(selected === sport ? null : sport)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            selected === sport
              ? "bg-primary text-primary-foreground"
              : "bg-card border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
          }`}
        >
          {sport}
        </button>
      ))}
    </div>
  )
}

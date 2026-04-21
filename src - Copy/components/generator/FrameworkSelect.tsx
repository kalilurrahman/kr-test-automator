import { frameworkGroups } from "@/data/platforms";
import { useGeneratorStore } from "@/store/generatorStore";

const FrameworkSelect = () => {
  const { framework, setFramework, setLanguage } = useGeneratorStore();

  const handleChange = (value: string) => {
    setFramework(value);
    for (const group of frameworkGroups) {
      const opt = group.options.find((o) => o.value === value);
      if (opt) {
        setLanguage(opt.lang);
        break;
      }
    }
  };

  return (
    <select
      value={framework}
      onChange={(e) => handleChange(e.target.value)}
      className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
    >
      {frameworkGroups.map((group) => (
        <optgroup key={group.label} label={group.label}>
          {group.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  );
};

export default FrameworkSelect;

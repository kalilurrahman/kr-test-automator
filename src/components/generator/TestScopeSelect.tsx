import { testScopeOptions } from "@/data/platforms";
import { useGeneratorStore, type TestScope } from "@/store/generatorStore";

const TestScopeSelect = () => {
  const { testScopes, toggleScope } = useGeneratorStore();

  return (
    <div className="flex flex-wrap gap-2">
      {testScopeOptions.map((scope) => {
        const isSelected = testScopes.includes(scope.id as TestScope);
        return (
          <button
            key={scope.id}
            onClick={() => toggleScope(scope.id as TestScope)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-all ${
              isSelected
                ? "bg-primary/15 border-primary/40 text-primary"
                : "bg-card border-border text-muted-foreground hover:border-primary/20 hover:text-foreground"
            }`}
          >
            {isSelected ? "✓ " : ""}
            {scope.label}
          </button>
        );
      })}
    </div>
  );
};

export default TestScopeSelect;

import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { useGeneratorStore } from "@/store/generatorStore";
import { useDailyUsage } from "@/hooks/useDailyUsage";
import { useAuth } from "@/contexts/AuthContext";
import PlatformGrid from "./PlatformGrid";
import FrameworkSelect from "./FrameworkSelect";
import TestScopeSelect from "./TestScopeSelect";
import { Sparkles, LayoutTemplate, Dice5, Zap } from "lucide-react";
import { Link } from "react-router-dom";

interface InputPanelProps {
  onGenerate: () => void;
  onSurpriseMe: () => void;
}

const InputPanel = ({ onGenerate, onSurpriseMe }: InputPanelProps) => {
  const {
    platform, testCount, setTestCount, businessCase, setBusinessCase, isGenerating,
  } = useGeneratorStore();
  const { user } = useAuth();
  const { used, limit, remaining, isAtLimit } = useDailyUsage();

  const canGenerate = platform && businessCase.trim().length > 10 && !isGenerating && !isAtLimit;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-foreground" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
        Generate Test Script
      </h2>

      {/* 1. Platform */}
      <div>
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
          ① Platform
        </label>
        <PlatformGrid />
      </div>

      {/* 2. Framework */}
      <div>
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
          ② Framework + Language
        </label>
        <FrameworkSelect />
      </div>

      {/* 3. Test Scope */}
      <div>
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
          ③ Test Scope
        </label>
        <TestScopeSelect />
      </div>

      {/* 4. Test Count */}
      <div>
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
          ④ Test Count
        </label>
        <Slider
          value={[testCount]}
          onValueChange={([v]) => setTestCount(v)}
          min={5}
          max={50}
          step={5}
          className="mb-1"
        />
        <span className="text-xs text-muted-foreground">
          Generate <span className="text-primary font-semibold">{testCount}</span> test cases
        </span>
      </div>

      {/* 5. Business Case */}
      <div>
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
          ⑤ Business Case
        </label>
        <Textarea
          value={businessCase}
          onChange={(e) => setBusinessCase(e.target.value)}
          placeholder='Describe what needs to be tested, e.g. "Test the Salesforce lead creation flow from web-to-lead capture through qualification and conversion to opportunity..."'
          className="min-h-[120px] bg-card border-border text-sm resize-y"
        />
      </div>

      {/* Action buttons */}
      <div className="flex gap-2">
        <Link
          to="/templates"
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-border text-xs text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
        >
          <LayoutTemplate className="w-3.5 h-3.5" />
          Load Template
        </Link>
        <button
          onClick={onSurpriseMe}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-border text-xs text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
        >
          <Dice5 className="w-3.5 h-3.5" />
          Surprise Me
        </button>
      </div>

      {/* Generate Button */}
      <button
        onClick={onGenerate}
        disabled={!canGenerate}
        className={`w-full py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
          isGenerating
            ? "btn-shimmer text-background"
            : canGenerate
            ? "btn-gold-gradient hover:shadow-lg"
            : "bg-muted text-muted-foreground cursor-not-allowed"
        }`}
      >
        <Sparkles className="w-4 h-4" />
        {isGenerating ? "Generating..." : "✦ GENERATE SCRIPT"}
      </button>
    </div>
  );
};

export default InputPanel;

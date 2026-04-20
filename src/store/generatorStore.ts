import { create } from "zustand";

export type Platform =
  | "sap" | "salesforce" | "veeva" | "servicenow" | "workday"
  | "oracle" | "m365" | "web" | "api" | "mobile_ios" | "mobile_android"
  | "dynamics365" | "aws" | "gcp" | "azure" | "webapps" | "topproducts"
  | "ios" | "android";

export type TestScope =
  | "ui_functional" | "regression" | "smoke" | "e2e"
  | "api" | "performance" | "security" | "accessibility"
  | "data_driven" | "bdd";

export interface GenerationResult {
  title: string;
  script: string;
  language: string;
  test_cases: { id: string; name: string; type: string; priority: string; description: string }[];
  prerequisites: string[];
  coverage_notes: string;
  known_limitations: string[];
  recommended_next_steps?: string[];
}

interface GeneratorState {
  platform: Platform | null;
  framework: string;
  language: string;
  testScopes: TestScope[];
  testCount: number;
  businessCase: string;
  isGenerating: boolean;
  progress: number;
  progressStep: number;
  result: GenerationResult | null;
  setPlatform: (p: Platform | null) => void;
  setFramework: (f: string) => void;
  setLanguage: (l: string) => void;
  toggleScope: (s: TestScope) => void;
  setTestScopes: (scopes: TestScope[]) => void;
  setTestCount: (n: number) => void;
  setBusinessCase: (t: string) => void;
  setIsGenerating: (b: boolean) => void;
  setProgress: (n: number) => void;
  setProgressStep: (n: number) => void;
  setResult: (r: GenerationResult | null) => void;
  reset: () => void;
}

const initialState = {
  platform: null as Platform | null,
  framework: "playwright_ts",
  language: "typescript",
  testScopes: ["ui_functional", "e2e"] as TestScope[],
  testCount: 10,
  businessCase: "",
  isGenerating: false,
  progress: 0,
  progressStep: 0,
  result: null as GenerationResult | null,
};

export const useGeneratorStore = create<GeneratorState>((set) => ({
  ...initialState,
  setPlatform: (p) => set({ platform: p }),
  setFramework: (f) => set({ framework: f }),
  setLanguage: (l) => set({ language: l }),
  toggleScope: (s) =>
    set((state) => ({
      testScopes: state.testScopes.includes(s)
        ? state.testScopes.filter((x) => x !== s)
        : [...state.testScopes, s],
    })),
  setTestScopes: (scopes) => set({ testScopes: scopes }),
  setTestCount: (n) => set({ testCount: n }),
  setBusinessCase: (t) => set({ businessCase: t }),
  setIsGenerating: (b) => set({ isGenerating: b }),
  setProgress: (n) => set({ progress: n }),
  setProgressStep: (n) => set({ progressStep: n }),
  setResult: (r) => set({ result: r }),
  reset: () => set(initialState),
}));

const GENERATE_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-test-script`;

export interface GenerateParams {
  platform: string;
  framework: string;
  language: string;
  testScopes: string[];
  testCount: number;
  businessCase: string;
}

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

export async function streamGeneration({
  params,
  onProgress,
  onDelta,
  onDone,
  onError,
}: {
  params: GenerateParams;
  onProgress: (step: number) => void;
  onDelta: (text: string) => void;
  onDone: (result: GenerationResult) => void;
  onError: (error: string) => void;
}) {
  try {
    onProgress(0);

    const resp = await fetch(GENERATE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify(params),
    });

    if (!resp.ok) {
      const data = await resp.json().catch(() => ({}));
      throw new Error(data.error || `Generation failed (${resp.status})`);
    }

    if (!resp.body) throw new Error("No response body");

    onProgress(1);

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let fullContent = "";
    let progressStep = 1;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
        let line = buffer.slice(0, newlineIndex);
        buffer = buffer.slice(newlineIndex + 1);

        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") break;

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) {
            fullContent += content;
            onDelta(content);

            // Update progress based on content length
            const newStep = Math.min(5, Math.floor(fullContent.length / 500) + 1);
            if (newStep > progressStep) {
              progressStep = newStep;
              onProgress(progressStep);
            }
          }
        } catch {
          // Partial JSON, put back and wait
          buffer = line + "\n" + buffer;
          break;
        }
      }
    }

    // Parse the complete JSON response
    onProgress(5);

    // Extract JSON from the response (might be wrapped in markdown code block)
    let jsonContent = fullContent;
    const jsonMatch = fullContent.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      jsonContent = jsonMatch[1].trim();
    }

    // Try to find JSON object in the content
    const jsonStart = jsonContent.indexOf("{");
    const jsonEnd = jsonContent.lastIndexOf("}");
    if (jsonStart !== -1 && jsonEnd !== -1) {
      jsonContent = jsonContent.slice(jsonStart, jsonEnd + 1);
    }

    const result = JSON.parse(jsonContent) as GenerationResult;
    onDone(result);
  } catch (error) {
    console.error("Generation error:", error);
    onError(error instanceof Error ? error.message : "Generation failed");
  }
}

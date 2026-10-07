import { act, renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useInstallPrompt } from "./useInstallPrompt";

describe("Validaira installation prompt", () => {
  it("clears a dismissed single-use prompt", async () => {
    const { result } = renderHook(() => useInstallPrompt());
    const prompt = vi.fn().mockResolvedValue(undefined);
    const event = new Event("beforeinstallprompt", { cancelable: true });
    Object.assign(event, { prompt, userChoice: Promise.resolve({ outcome: "dismissed", platform: "web" }) });
    act(() => { window.dispatchEvent(event); });
    expect(result.current.isInstallable).toBe(true);
    await act(async () => { await result.current.install(); });
    expect(prompt).toHaveBeenCalledOnce();
    expect(result.current.isInstallable).toBe(false);
  });

  it("clears the button when the app is installed externally", async () => {
    const { result } = renderHook(() => useInstallPrompt());
    const event = new Event("beforeinstallprompt");
    Object.assign(event, { prompt: vi.fn(), userChoice: Promise.resolve({ outcome: "accepted", platform: "web" }) });
    act(() => { window.dispatchEvent(event); });
    expect(result.current.isInstallable).toBe(true);
    act(() => { window.dispatchEvent(new Event("appinstalled")); });
    await waitFor(() => expect(result.current.isInstallable).toBe(false));
  });
});
import { useEffect, useRef } from "react";
import { Audio } from "expo-av";

// ─────────────────────────────────────────────────────────────────
// 🔊 CAMINHO DO SOM DE CLIQUE — edite apenas aqui
// ─────────────────────────────────────────────────────────────────
const SOUND_CLICK = require("@/assets/sounds/click.wav");
// ─────────────────────────────────────────────────────────────────

/**
 * Hook que pré-carrega um som de clique e retorna uma função `playClick`.
 * Passe `enabled` (ligado/desligado pelo botão de volume).
 */
export function useClickSound(enabled: boolean) {
  const soundRef = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const { sound } = await Audio.Sound.createAsync(SOUND_CLICK, {
          shouldPlay: false,
        });
        if (mounted) soundRef.current = sound;
      } catch {
        // Arquivo ainda não existe — sem problema
      }
    })();

    return () => {
      mounted = false;
      soundRef.current?.unloadAsync();
    };
  }, []);

  async function playClick() {
    if (!enabled) return;
    try {
      await soundRef.current?.replayAsync();
    } catch {}
  }

  return { playClick };
}

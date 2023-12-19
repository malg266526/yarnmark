import { useEffect } from "react";

export type QueueEffect = {
  delay: number;
  effect: () => void;
}

export const useEffectQueue = (queue: QueueEffect[]) => {
  useEffect(() => {
    const timeouts = queue.map(({ delay, effect }) =>
      setTimeout(effect, delay)
    );

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [queue]);
};

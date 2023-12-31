import { useEffect, useState } from "react";

export function useScreenResolution() {
  const [resolution, setResolution] = useState({
    screenWidth: document.documentElement.clientWidth,
    screenHeight: document.documentElement.clientHeight,
  });

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      setResolution({
        screenWidth: document.documentElement.clientWidth,
        screenHeight: document.documentElement.clientHeight,
      });
    });

    resizeObserver.observe(document.documentElement);

    return () => {
      resizeObserver.unobserve(document.documentElement);
    };
  }, []);

  return resolution;
}

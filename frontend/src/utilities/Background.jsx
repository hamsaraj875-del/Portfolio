import { useEffect, useState } from "react";
import Antigravity from "./Antigravity";

const Background = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen();

    window.addEventListener("resize", checkScreen);

    return () => {
      window.removeEventListener("resize", checkScreen);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0">
      <Antigravity
        count={isMobile ? 500 : 900}
        magnetRadius={isMobile ? 4 : 7}
        ringRadius={isMobile ? 2.5 : 4}
        waveSpeed={0.35}
        waveAmplitude={0.4}
        particleSize={isMobile ? 0.25 : 0.5}
        lerpSpeed={0.04}
        color="#4f46e5"
        autoAnimate={false}
        particleVariance={0.5}
        pulseSpeed={2}
        particleShape="sphere"
        fieldStrength={isMobile ? 5 : 8}
      />
    </div>
  );
};

export default Background;
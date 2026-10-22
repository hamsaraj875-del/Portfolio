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
        count={500}
        magnetRadius={5}
        ringRadius={4}
        waveSpeed={0.2}
        waveAmplitude={0.3}
        particleSize={0.35}
        lerpSpeed={0.04}
        color="#151fda"
        autoAnimate={false}
        particleVariance={0.3}
        rotationSpeed={0}
        depthFactor={0.4}
        pulseSpeed={1.2}
        particleShape="sphere"
        fieldStrength={12}
      />
    </div>
  );
};

export default Background;
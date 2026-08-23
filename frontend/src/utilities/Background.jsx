import Antigravity from "./Antigravity";

const Background = () => {
  return (
    <div className="fixed inset-0 z-0">
      <Antigravity
        count={1500}
        magnetRadius={7}
        ringRadius={4}
        waveSpeed={0.7}
        waveAmplitude={0.8}
        particleSize={0.6}
        lerpSpeed={0.06}
        color="#4f46e5"
        autoAnimate={false}
        particleVariance={0.8}
        pulseSpeed={3}
        particleShape="sphere"
        fieldStrength={12}
      />
    </div>
  );
};

export default Background;
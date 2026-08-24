import Antigravity from "./Antigravity";

const Background = () => {
  return (
    <div className="fixed inset-0 z-0">
     <Antigravity
  count={900}
  magnetRadius={7}
  ringRadius={4}
  waveSpeed={0.35}
  waveAmplitude={0.4}
  particleSize={0.5}
  lerpSpeed={0.04}
  color="#4f46e5"
  autoAnimate={false}
  particleVariance={0.5}
  pulseSpeed={2}
  particleShape="sphere"
  fieldStrength={8}
/>
    </div>
  );
};

export default Background;
import { Typewriter } from "react-simple-typewriter";

function AnimatedTitle() {
  return (
    <h2 className="text-2xl lg:text-4xl font-bold text-white">
      <Typewriter
        words={[
          "Full Stack MERN Developer",
          "Android Developer",
          "AI/ML Enthusiast",
        ]}
        loop={0}
        cursor
        cursorStyle="|"
        typeSpeed={80}
        deleteSpeed={40}
        delaySpeed={1500}
      />
    </h2>
  );
}

export default AnimatedTitle;
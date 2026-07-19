import React from "react";
import Navbar from "../components/access/Navbar";
import Intro from "../components/access/Intro";
import Skills from "../components/access/Skills";
import Hobbies from "../components/access/Hobbies";
import Footer from "../components/access/Footer";
import Projects from "../components/access/Projects";
import Connect from "../components/access/Connect";
import Leetcode from "../components/access/Leetcode";
import ProgressBar from "../components/access/progressBar";
import "../App.css";
const App = () => {
  return (
    <div className="text-white">
      <ProgressBar />
      <section id="Navbar">
        <Navbar id="Navbar" />
      </section>
      <section id="Intro">
        <Intro />
      </section>
      <section id="Skills" className="scroll-mt-24">
        <Skills />
      </section>
      <section id="Hobbies" className="scroll-mt-22">
        <Hobbies />
      </section>
      <section id="leetcode">
        <Leetcode />
      </section>
      <section id="Projects" className="scroll-mt-22">
        <Projects />
      </section>
      <section id="Contact">
        <Connect />
      </section>
      <section id="About">
        <Footer />
      </section>
    </div>
  );
};

export default App;

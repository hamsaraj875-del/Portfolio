import React from 'react';
import Navbar from './components/Navbar';
import Intro from "./components/Intro"
import Skills from "./components/Skills"
import Hobbies from "./components/Hobbies"
import Footer from "./components/Footer"
import Projects from "./components/Projects"
import Connect from "./components/Connect"
import Leetcode from "./components/Leetcode"
import "./App.css"

export default function App() {
  return (
    <div className="text-white">
      <section id="Navbar">
        <Navbar id="Navbar"/>
      </section>
      <section id="Intro">
        <Intro/>
      </section>
      <section id="Skills" className="scroll-mt-24">
        <Skills />
      </section>
      <section id="Hobbies" className="scroll-mt-22">
        <Hobbies />
      </section>
      <section id="leetcode">
        <Leetcode/>
      </section>
      <section id="Projects" className="scroll-mt-22">
        <Projects />
      </section>
      <section id="Contact">
        <Connect/>
      </section>
      <section  id="About" >
        <Footer />
      </section>
      
    </div>
  );
}
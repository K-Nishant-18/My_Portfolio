import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import Home from './components/Home';
import knAnimation from './assets/kn-animation.gif'; // Adjust the path to your GIF

const IntroAnimation = ({ children }) => {
  useEffect(() => {
    // GSAP timeline for the intro animation
    const tl = gsap.timeline();

    // Wait for the GIF duration (adjust the delay based on your GIF's length, e.g., 3 seconds)
    tl.to('.intro-container', {
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      delay: 3, // Adjust this based on your GIF duration
      onComplete: () => {
        gsap.set('.intro-container', { display: 'none' });
      },
    })
      // Reveal the main content
      .fromTo(
        '.main-content',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        '-=0.5'
      );

    // Cleanup
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <>
      {/* Intro Animation Container */}
      <div className="intro-container fixed inset-0 z-50 flex items-center justify-center bg-black">
        <img
          src={knAnimation}
          alt="KN Animation"
          className="w-1/2 h-1/2 object-contain"
        />
      </div>
      {/* Main Content */}
      <div className="main-content">{children}</div>
    </>
  );
};

function App() {
  return (
    <div className="App">
      <IntroAnimation>
        <Home />
      </IntroAnimation>
    </div>
  );
}

export default App;
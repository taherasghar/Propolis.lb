import React from "react";
import HeroSection from "./components/HeroSection";
import FAQ from "./components/FAQ";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import getLPTheme from "../../components/getLPTheme";
import Featured from "./components/Featured";

function Home() {
  const LPtheme = createTheme(getLPTheme("light"));

  return (
    <div>
      <HeroSection />
      <Featured />
      <ThemeProvider theme={LPtheme}>
        <FAQ />
      </ThemeProvider>
    </div>
  );
}

export default Home;

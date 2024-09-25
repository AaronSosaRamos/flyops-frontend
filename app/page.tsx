"use client"

import Footer from "@/components/Footer";
import MainScreen from "@/components/MainScreen";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <MainScreen />
      <Footer />
    </div>
  );
}

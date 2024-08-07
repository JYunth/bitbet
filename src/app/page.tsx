//import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import ChartComponent from "@/components/ChartComponent";
import Game from "@/components/Game";

export default function Home() {
  const randomMaxValue = parseFloat((Math.random() * 19 + 1).toFixed(2));
  console.log(randomMaxValue);
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <ChartComponent maxValue={randomMaxValue} /> */}
      <Game />
    </main>
  );
}

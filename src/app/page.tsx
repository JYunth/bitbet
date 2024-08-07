import { Button } from "@/components/ui/button";
import Image from "next/image";
import ChartComponent from "@/components/ChartComponent";

export default function Home() {
  const randomMaxValue = Math.floor(Math.random() * 100) + 1;
  console.log(randomMaxValue);
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ChartComponent maxValue={randomMaxValue} />
    </main>
  );
}

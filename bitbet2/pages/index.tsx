import type { NextPage } from "next";
import { useCallback } from "react";
import { useRouter } from "next/router";

const Wireframe: NextPage = () => {
  const router = useRouter();

  const onWireframeClick = useCallback(() => {
    router.push("/wireframe1");
  }, [router]);

  return (
    <div
      className="w-full relative rounded-26xl [background:linear-gradient(79.61deg,_#ff1102,_#efbf04)] h-[900px] overflow-hidden cursor-pointer text-left text-5xl text-black font-poppins"
      onClick={onWireframeClick}
    >
      <div className="absolute top-[49px] left-[calc(50%_-_656px)] rounded-26xl bg-gainsboro-100 w-[1296px] h-[60px]" />
      <div className="absolute top-[49px] left-[calc(50%_+_787.2px)] shadow-[45.7px_-45.7px_45.73px_rgba(165,_165,_165,_0.1)_inset,_-45.7px_45.7px_45.73px_rgba(255,_255,_255,_0.1)_inset] [backdrop-filter:blur(91.47px)] rounded-26xl bg-gainsboro-300 w-[1312px] h-[60px]" />
      <div className="absolute top-[49px] left-[calc(50%_+_787px)] shadow-[45.7px_-45.7px_45.73px_rgba(165,_165,_165,_0.12)_inset,_-45.7px_45.7px_45.73px_rgba(255,_255,_255,_0.12)_inset] [backdrop-filter:blur(91.47px)] rounded-26xl bg-gainsboro-200 w-[1312px] h-[60px]" />
      <div className="absolute top-[49px] left-[calc(50%_-_656px)] shadow-[45.7px_-45.7px_45.73px_rgba(165,_165,_165,_0.1)_inset,_-45.7px_45.7px_45.73px_rgba(255,_255,_255,_0.1)_inset] [backdrop-filter:blur(91.47px)] rounded-26xl bg-gainsboro-300 w-[1296px] h-[60px]" />
      <div className="absolute top-[61px] left-[602px] inline-block w-[130px] h-[34px] [text-shadow:1px_0_0_#000,_0_1px_0_#000,_-1px_0_0_#000,_0_-1px_0_#000]">
        Contact
      </div>
      <div className="absolute top-[62px] left-[326px] inline-block w-[102px] h-[34px] [text-shadow:1px_0_0_#000,_0_1px_0_#000,_-1px_0_0_#000,_0_-1px_0_#000]">
        History
      </div>
      <div className="absolute top-[61px] left-[108px] inline-block w-20 h-[34px] [text-shadow:1px_0_0_#000,_0_1px_0_#000,_-1px_0_0_#000,_0_-1px_0_#000]">
        Home
      </div>
      <img
        className="absolute top-[62px] left-[1228px] rounded-sm w-[118px] h-[34px]"
        alt=""
        src="/rectangle-2.svg"
      />
      <div className="absolute top-[61px] left-[1244px] text-snow inline-block w-[159px] h-[34px]">
        Sign up
      </div>
      <div className="absolute top-[208px] left-[-218px] text-109xl font-extrabold text-white inline-block w-[564px] h-[204px]">
        Gamble
      </div>
      <div className="absolute top-[333px] left-[-324px] text-109xl font-extrabold">
        BitBet
      </div>
      <div className="absolute top-[512px] left-[-316px] text-mini font-extrabold text-transparent !bg-clip-text [background:linear-gradient(96.13deg,_#fff,_#fff_17.6%,_#fffefe_37.6%,_#8e8d8d_46.91%,_#000_53.5%,_#0b0a0a)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] inline-block w-[693px] h-[92px]">
        Bustabit is an online multiplayer gambling game based on Bitcoin, where
        players place bets on an increasing multiplier. The goal is to cash out
        before the multiplier crashes, offering a mix of excitement and risk. It
        features a social aspect with a chat function and leaderboards,
        enhancing the user experience.
      </div>
      <img
        className="absolute top-[-165px] left-[926px] w-[794px] h-[680px] object-cover"
        alt=""
        src="/-64e8bc80af9f4a218ad191d510322b4fremovebgpreview-2@2x.png"
      />
      <img
        className="absolute top-[737px] left-[1165px] w-[390px] h-[365px] object-cover"
        alt=""
        src="/-64e8bc80af9f4a218ad191d510322b4fremovebgpreview-1@2x.png"
      />
      <div className="absolute top-[940px] left-[187px] w-[140px] h-[52px] text-white">
        <div className="absolute top-[0px] left-[0px] rounded-26xl bg-black w-[140px] h-[52px]" />
        <div className="absolute top-[10px] left-[44px] font-extrabold inline-block w-20 h-[42px]">
          Play
        </div>
      </div>
    </div>
  );
};

export default Wireframe;

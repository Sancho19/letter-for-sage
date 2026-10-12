"use client";

import { useRef, useState } from "react";
import {
  Heart,
  Sparkles,
  Mail,
  X,
  ChevronDown,
  Music,
  VolumeX,
} from "lucide-react";

export default function HomePage() {
  const [curtainsOpen, setCurtainsOpen] = useState(false);
  const [opened, setOpened] = useState(false);

  const letterRef = useRef<HTMLDivElement>(null);

  const MUSIC = "/Daniel Caesar - Superpowers (Official Audio).mp3";

  const [playing, setPlaying] = useState(false);
  const [loadingMusic, setLoadingMusic] = useState(false);
  const [musicError, setMusicError] = useState("");

  const audioRef = useRef<HTMLAudioElement>(null);

  async function playMusic() {
    const audio = audioRef.current;

    if (!audio || loadingMusic) return;

    setLoadingMusic(true);
    setMusicError("");

    audio.volume = 0.6;

    if (audio.error) audio.load();

    try {
      await audio.play();
    } catch (error) {
      setPlaying(false);

      const name = error instanceof Error ? error.name : "";

      setMusicError(
        name === "NotAllowedError"
          ? "Tap Play music to start the song."
          : "The song couldn't load. Your letter is still ready. ♡",
      );
    } finally {
      setLoadingMusic(false);
    }
  }

  function revealPage() {
    setCurtainsOpen(true);
    void playMusic();
  }

  // SCREEN 2: OPEN THE LETTER
  const openLetter = () => {
    setOpened(true);

    window.setTimeout(() => {
      letterRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 150);
  };

  const closeLetter = () => {
    setOpened(false);
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#faf7f5] text-[#352b29]">
      <audio
        ref={audioRef}
        src={MUSIC}
        loop
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => {
          setPlaying(false);
          setLoadingMusic(false);
          setMusicError(
            "The song couldn't load. Your letter is still ready. ♡",
          );
        }}
      />

      {/* =========================================
          BACKGROUND
      ========================================= */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-[#ead8d5]/50 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-[#e5deda]/60 blur-3xl" />
      </div>

      {/* =========================================
          SCREEN 1: BURGUNDY CURTAINS
      ========================================= */}

      <div
        aria-hidden={curtainsOpen}
        className={`fixed inset-0 z-[200] grid place-items-center overflow-hidden ${
          curtainsOpen ? "pointer-events-none" : ""
        }`}
      >
        {/* LEFT CURTAIN */}

        <div
          className={`absolute inset-y-0 left-0 w-[51%] border-r-2 border-[#c39959] border-b-[7px] transition-transform duration-[1500ms] ease-in-out ${
            curtainsOpen ? "-translate-x-full" : "translate-x-0"
          }`}
          style={{
            background:
              "repeating-linear-gradient(90deg, #350c1b 0%, #681e35 9%, #8a324b 17%, #481025 25%)",
            boxShadow: "inset 0 0 90px #200611a0",
          }}
        />

        {/* RIGHT CURTAIN */}

        <div
          className={`absolute inset-y-0 right-0 w-[51%] border-l-2 border-[#c39959] border-b-[7px] transition-transform duration-[1500ms] ease-in-out ${
            curtainsOpen ? "translate-x-full" : "translate-x-0"
          }`}
          style={{
            background:
              "repeating-linear-gradient(90deg, #350c1b 0%, #681e35 9%, #8a324b 17%, #481025 25%)",
            boxShadow: "inset 0 0 90px #200611a0",
          }}
        />

        {/* GOLD-TRIMMED VALANCE */}

        <div
          className={`absolute inset-x-0 top-0 z-20 h-[65px] rounded-b-[50%] border-b-2 border-[#c39959] transition-transform duration-1000 ${
            curtainsOpen ? "-translate-y-full" : "translate-y-0"
          }`}
          style={{
            background: "linear-gradient(#380a1b, #701f39)",
            boxShadow: "0 14px 25px #25061270",
          }}
        />

        {/* INVITATION */}

        {!curtainsOpen && (
          <div className="relative z-10 mx-auto w-full max-w-xl px-6 py-12 text-center text-[#fff0dc]">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#efce95] sm:text-xs">
              A little something for you
            </span>

            <div className="my-5 flex justify-center">
              <Sparkles
                size={42}
                strokeWidth={1.2}
                className="text-[#e9c887]"
              />
            </div>

            <h1 className="font-serif text-4xl leading-tight tracking-tight sm:text-6xl">
              A Special letter<br></br>
              <em className="text-[#edc98f]">For You Sage</em>
            </h1>

            <button
              type="button"
              onClick={revealPage}
              className="mx-auto mt-9 flex min-h-14 items-center justify-center gap-3 rounded-full border border-[#ffe1a9] bg-gradient-to-r from-[#f4dfb5] to-[#d7ad66] px-8 py-4 text-sm font-semibold text-[#49202b] shadow-xl transition duration-300 hover:scale-105 hover:shadow-2xl active:scale-95"
            >
              Tap me to reveal
              <Heart size={17} className="fill-[#9f5f5a]" />
            </button>

            {/* Tiny decorative hearts */}

            <Heart
              size={17}
              className="absolute left-[7%] top-[24%] animate-pulse fill-[#dca5a9] text-[#dca5a9]"
            />

            <Heart
              size={13}
              className="absolute right-[8%] top-[32%] fill-[#e9c887] text-[#e9c887]"
            />

            <Sparkles
              size={16}
              className="absolute bottom-[16%] left-[12%] text-[#e9c887]"
            />

            <Heart
              size={15}
              className="absolute bottom-[20%] right-[12%] fill-[#dca5a9] text-[#dca5a9]"
            />
          </div>
        )}
      </div>

      {/* =========================================
          SCREEN 2: YOUR ORIGINAL SAGE LETTER PAGE
      ========================================= */}

      <section className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-5 pb-20 pt-7 sm:px-8 sm:pt-12">
        <div className="mb-6 flex w-full justify-end">
          {/* <button
            type="button"
            onClick={() => {
              if (playing) {
                audioRef.current?.pause();
              } else {
                void playMusic();
              }
            }}
            disabled={loadingMusic}
            aria-pressed={playing}
            className="flex min-h-11 items-center gap-2 rounded-full border border-[#e4d2ce] bg-white/90 px-4 py-2 text-sm text-[#76524e] shadow-sm transition hover:bg-white active:scale-95 disabled:opacity-60"
          >
            {playing ? (
              <>
                <VolumeX size={16} />
                Pause music
              </>
            ) : (
              <>
                <Music size={16} />
                {loadingMusic ? "Loading music..." : "Play music"}
              </>
            )}
          </button> */}
        </div>

        {musicError && (
          <p role="status" className="mb-4 text-center text-xs text-[#9f5f5a]">
            {musicError}
          </p>
        )}
        {/* INTRO */}

        <div className="text-center">
          <div className="mx-auto flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
            <Sparkles size={14} className="text-[#b88782]" />

            <span className="text-xs font-medium text-[#8b6863]">
              You have something special
            </span>
          </div>

          <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-5xl">
            A letter for you Sage!
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-stone-500 sm:text-base">
            Pshht... someone left you a little something.
            <br className="hidden sm:block" />
          </p>
        </div>

        {/* LETTER AND ENVELOPE AREA */}

        <div
          className={`relative mt-12 w-full max-w-[430px] transition-[height] duration-500 sm:mt-16 sm:h-[470px] ${
            opened ? "h-[520px]" : "h-[430px]"
          }`}
        >
          {/* DECORATIVE HEARTS */}

          <Heart
            size={17}
            className={`absolute left-[8%] top-[15%] fill-[#d5aaa5] text-[#d5aaa5] transition-all duration-700 ${
              opened
                ? "-translate-y-8 scale-125 opacity-100"
                : "animate-pulse opacity-50"
            }`}
          />

          <Heart
            size={12}
            className={`absolute right-[10%] top-[21%] fill-[#c9a49e] text-[#c9a49e] transition-all duration-700 ${
              opened ? "-translate-y-8 scale-125 opacity-100" : "opacity-40"
            }`}
          />

          <Sparkles
            size={15}
            className={`absolute left-[18%] top-[5%] text-[#b88782] transition-all duration-700 ${
              opened ? "-translate-y-8 rotate-12 opacity-100" : "opacity-40"
            }`}
          />

          <Sparkles
            size={12}
            className={`absolute right-[18%] top-[8%] text-[#c9a49e] transition-all duration-700 ${
              opened ? "-translate-y-8 -rotate-12 opacity-100" : "opacity-40"
            }`}
          />

          {/* CUTE TEDDY BEAR */}

          <div
            className={`absolute left-1/2 top-[3%] z-10 -translate-x-1/2 transition-all duration-700 ${
              opened ? "-translate-y-6 -rotate-3" : "translate-y-4"
            }`}
          >
            <img
              src="/teddy-bear.svg"
              alt="Cute brown teddy bear holding a heart"
              className="h-36 w-36 object-contain sm:h-44 sm:w-44"
            />

            <div className="absolute right-0 top-8 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-sm">
              <Heart size={13} className="fill-rose-400 text-rose-400" />
            </div>
          </div>

          {/* THE LETTER */}

          <div
            ref={letterRef}
            id="sage-letter"
            aria-hidden={!opened}
            inert={!opened}
            className={`absolute left-1/2 top-[22%] z-[60] w-[88%] max-w-[360px] -translate-x-1/2 transition-all duration-700 ease-out ${
              opened
                ? "pointer-events-auto -translate-y-[65px] opacity-100 sm:-translate-y-[125px]"
                : "pointer-events-none translate-y-[130px] opacity-0"
            }`}
          >
            <div className="rounded-[1.25rem] bg-[#fffefa] p-6 shadow-[0_25px_60px_rgba(72,49,44,0.2)] sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#b88782]">
                    Open it up
                  </p>

                  <h2 className="mt-3 font-serif text-2xl italic text-[#493a37]">
                    Heyy
                  </h2>
                </div>

                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f5e9e5]">
                  <Heart size={14} className="fill-[#b88782] text-[#b88782]" />
                </div>
              </div>

              <div className="mt-5 space-y-3 text-sm leading-6 text-[#705c57]">
                <p>Good Morning</p>

                <p>
                  I wanted to take the time to tell you that i hope you have a
                  good productive day!
                </p>

                <p>
                  Eres una persona tan interesante y mi favorita que he
                  conocido.
                </p>
              </div>

              <div className="mt-6 border-t border-[#eee4df] pt-4">
                <p className="text-xs text-[#9b817b]">From</p>

                <p className="mt-1 font-serif text-lg italic text-[#604945]">
                  Sánchez
                </p>
              </div>
            </div>
          </div>

          {/* ENVELOPE */}

          <div
            className={`absolute bottom-[5%] left-1/2 h-[190px] w-[330px] max-w-[84vw] -translate-x-1/2 transition-transform duration-700 sm:h-[210px] sm:w-[370px] ${
              opened ? "translate-y-8" : ""
            }`}
          >
            {/* SHADOW */}

            <div className="absolute -bottom-5 left-[5%] h-8 w-[90%] rounded-full bg-[#8f6560]/20 blur-xl" />

            {/* ENVELOPE BACK */}

            <div className="absolute inset-0 overflow-hidden rounded-[1.25rem] bg-[#c58f88] shadow-[0_18px_40px_rgba(78,50,45,0.18)]">
              <div className="absolute bottom-0 left-[-18%] h-[135%] w-[72%] rotate-[29deg] bg-[#b9817a]" />

              <div className="absolute bottom-0 right-[-18%] h-[135%] w-[72%] -rotate-[29deg] bg-[#b9817a]" />
            </div>

            {/* PAPER PEEK */}

            <div
              className={`absolute left-[8%] right-[8%] top-3 h-[140px] rounded-xl bg-[#fffefa] shadow-sm transition-all duration-700 ${
                opened ? "opacity-0" : "opacity-100"
              }`}
            >
              <div className="flex h-full flex-col items-center justify-center gap-2">
                <Mail size={24} className="text-[#c49a94]" />

                <span className="text-[10px] uppercase tracking-[0.15em] text-[#b88782]">
                  For you
                </span>
              </div>
            </div>

            {/* ENVELOPE FRONT */}

            <div className="absolute bottom-0 left-0 right-0 h-[115px] overflow-hidden rounded-b-[1.25rem] bg-[#c58f88] sm:h-[125px]">
              <div className="absolute -left-[20%] top-[-65px] h-[170px] w-[85%] rotate-[26deg] border-b-2 border-[#b9817a]" />

              <div className="absolute -right-[20%] top-[-65px] h-[170px] w-[85%] -rotate-[26deg] border-b-2 border-[#b9817a]" />
            </div>

            {/* ENVELOPE FLAP */}

            <div
              className={`pointer-events-none absolute left-0 top-0 z-40 h-[110px] w-full origin-top transition-all duration-500 ${
                opened
                  ? "-translate-y-5 -rotate-6 opacity-0"
                  : "translate-y-0 opacity-100"
              }`}
            >
              <div className="absolute left-1/2 top-0 h-0 w-0 -translate-x-1/2 border-l-[165px] border-r-[165px] border-t-[108px] border-l-transparent border-r-transparent border-t-[#d19c95] sm:border-l-[185px] sm:border-r-[185px] sm:border-t-[118px]" />
            </div>

            {/* HEART SEAL BUTTON */}

            {!opened && (
              <button
                type="button"
                aria-label="Open Sage's letter"
                aria-controls="sage-letter"
                onClick={openLetter}
                className="absolute left-1/2 top-[75px] z-[50] flex h-14 w-14 -translate-x-1/2 touch-manipulation select-none items-center justify-center rounded-full bg-[#9f5f5a] text-white shadow-[0_7px_18px_rgba(95,55,50,0.25)] transition-transform active:scale-95 sm:top-[82px]"
              >
                <Heart size={22} className="fill-white" />
              </button>
            )}
          </div>
        </div>

        {/* MAIN BUTTON */}

        <div className="relative z-[100] mt-3 flex w-full justify-center">
          {!opened ? (
            <div className="flex flex-col items-center">
              <button
                type="button"
                onClick={openLetter}
                aria-controls="sage-letter"
                className="flex min-h-14 touch-manipulation select-none items-center justify-center rounded-full bg-[#9f5f5a] px-7 py-4 text-sm font-medium text-white shadow-[0_8px_25px_rgba(120,70,65,0.18)] transition-transform active:scale-95"
              >
                <span className="flex items-center gap-2">
                  Open my letter
                  <ChevronDown size={16} />
                </span>
              </button>

              <p className="mt-3 text-[11px] text-stone-400">
                Tap to open your letter
              </p>
            </div>
          ) : (
            <button
              type="button"
              onClick={closeLetter}
              className="flex min-h-12 touch-manipulation select-none items-center justify-center rounded-full border border-stone-200 bg-white px-6 py-3 text-sm font-medium text-[#76524e] shadow-sm transition-transform active:scale-95"
            >
              <span className="flex items-center gap-2">
                <X size={15} />
                Close the letter
              </span>
            </button>
          )}
        </div>

        {/* FOOTER */}

        <div className="mt-14 text-center">
          <div className="mx-auto flex w-fit items-center gap-2">
            <div className="h-px w-8 bg-[#dfcfca]" />

            <Heart size={13} className="fill-[#b88782] text-[#b88782]" />

            <div className="h-px w-8 bg-[#dfcfca]" />
          </div>

          <p className="mt-4 text-xs text-stone-400">
            Some things are better written down.
          </p>
        </div>
      </section>

      {/* REDUCED-MOTION SUPPORT */}

      <style jsx global>{`
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </main>
  );
}

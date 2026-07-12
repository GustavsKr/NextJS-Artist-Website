// app/about/AboutContent.tsx
"use client";

import { useState } from "react";

interface AboutContentProps {
  contentEng?: string | null;
  contentLv?: string | null;
}

export default function AboutContent({ contentEng, contentLv }: AboutContentProps) {
  const [lang, setLang] = useState<"eng" | "lv">("eng");

  const hasEng = !!contentEng;
  const hasLv = !!contentLv;

  const formatParagraphs = (text: string) => {
    return text.split(/\n+/).map((p, i) => (
      <p key={i} className="text-lg leading-relaxed text-white/80 mb-6">
        {p.trim()}
      </p>
    ));
  };

  return (
    <article className="prose prose-invert prose-lg max-w-none text-center">
      {/* Interactive Language Toggle */}
      {hasEng && hasLv && (
        <button
          onClick={() => setLang(lang === "eng" ? "lv" : "eng")}
          className="mb-12 cursor-pointer text-xs uppercase tracking-[0.2em] text-white/50 border-b border-white/20 pb-1 hover:text-white hover:border-white transition-all duration-500 ease-out hover:drop-shadow-[0_0_9px_rgba(255,255,255,0.7)]"
        >
          {lang === "eng" ? "Read in Latvian" : "Read in English"}
        </button>
      )}

      {/* English Block - Preloaded for SEO */}
      {hasEng && (
        <div className={lang === "eng" ? "block" : "hidden"}>
          {formatParagraphs(contentEng)}
        </div>
      )}

      {/* Latvian Block - Preloaded for SEO */}
      {hasLv && (
        <div className={lang === "lv" ? "block" : "hidden"}>
          {formatParagraphs(contentLv)}
        </div>
      )}
    </article>
  );
}
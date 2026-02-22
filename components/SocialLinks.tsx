// components/SocialLinks.tsx
"use client";

import Link from "next/link";
import Image from "next/image";

interface SocialLink {
  src: string;
  alt: string;
  href: string;
}

interface Props {
  size?: number; // optional — lets you change icon size anywhere
  className?: string; // optional — custom styling
}

export default function SocialLinks({ size = 20, className = "" }: Props) {
  const socialLinks: SocialLink[] = [
    { src: "/svg/spotify.svg", alt: "Spotify", href: "https://open.spotify.com/artist/2epOrY6QkzNuFOPeBU13nS" },
    { src: "/svg/applemusic.svg", alt: "Apple Music", href: "https://music.apple.com/us/artist/e%C4%BCzana-%C5%A1aripova/1786692183" },
    { src: "/svg/instagram.svg", alt: "Instagram", href: "https://www.instagram.com/piterpen_69/" },
    { src: "/svg/facebook.svg", alt: "Facebook", href: "https://www.facebook.com/profile.php?id=100048763584084" },
    { src: "/svg/youtube.svg", alt: "YouTube", href: "https://www.youtube.com/@ElzanaSharipova" },
  ];

  return (
    <div className={`flex gap-3 ${className}`}>
      {socialLinks.map((item, i) => (
        <Link
          key={i}
          href={item.href}
          target="_blank"
          className="transition-opacity duration-200 hover:opacity-70"
        >
          <Image
            src={item.src}
            alt={item.alt}
            width={size}
            height={size}
            className="select-none"
          />
        </Link>
      ))}
    </div>
  );
}

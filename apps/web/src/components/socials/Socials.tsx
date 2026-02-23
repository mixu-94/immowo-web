"use client";

import React from "react";
import Image from "next/image";
import { images } from "@/libs/imageConfig";
import { socialLinks } from "@/libs/constants";
import Link from "next/link";

type SocialLink = {
  href: string;
  src: string;
  alt: string;
  label: string;
  red: string;
};

// Define social links
const socialItems: SocialLink[] = [
  {
    href: socialLinks.twitter,
    src: images.socials.twitter.src,
    alt: images.socials.twitter.alt,
    label: "Twitter",
    red: images.socials.twitterRed.src,
  },
  {
    href: socialLinks.discord,
    src: images.socials.discord.src,
    alt: images.socials.discord.alt,
    label: "Discord",
    red: images.socials.discordRed.src,
  },
  {
    href: socialLinks.instagram,
    src: images.socials.instagram.src,
    alt: images.socials.instagram.alt,
    label: "Instagram",
    red: images.socials.twitterRed.src,
  },
];

// Add a new prop to control the visibility of labels
type SocialsProps = {
  hideLabels?: boolean; // Optional prop to hide labels
  iconSize?: number; // Optional prop for icon size
};

const Socials = ({ hideLabels = false, iconSize = 30 }: SocialsProps) => {
  return (
    <div className="relative flex w-full justify-center">
      <div className="flex w-full flex-wrap items-center justify-center gap-5 sm:justify-around md:gap-6 lg:gap-10">
        {socialItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-sm transition-all duration-300 ease-in-out sm:gap-3 sm:text-base md:gap-3 md:text-lg lg:gap-3 lg:text-xl"
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={iconSize} // Use the passed iconSize prop
              height={iconSize} // Use the passed iconSize prop
              className="transition-transform duration-300 ease-in-out group-hover:scale-110"
            />
            {/* Conditionally render the label based on the hideLabels prop */}
            {!hideLabels && (
              <span className="transition-transform duration-300 ease-in-out group-hover:translate-x-2 group-hover:scale-110">
                {item.label}
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Socials;

// "use client";

// import React from "react";
// import Image from "next/image";
// import { images } from "@/libs/imageConfig";
// import { socialLinks } from "@/libs/constants";

// type SocialsProps = {

// };

// const Socials = function({ }: SocialsProps) {

//   return <div className="flex w-full justify-center relative">
//     <div className="flex items-center justify-around gap-5 rounded-lg p-2 w-full">
//       <div className="flex">
//         <a
//           href={socialLinks.twitter}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="flex gap-3 transition-all duration-300 ease-in-out hover:text-[var(--adaki-red)]"
//         >
//           <div className="flex items-center justify-center gap-2">
//           <Image src={images.socials.twitter.src} alt={images.socials.twitter.alt} width={24}  />
//           </div>
//           Twitter
//         </a>
//       </div>
//       <div className="flex">
//         <a
//           href={socialLinks.discord}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="flex gap-3 transition-all duration-300 ease-in-out hover:text-[var(--adaki-red)]"
//         >
//           <div className="flex items-center justify-center gap-2">
//             <Image src={images.socials.discord.src} alt={images.socials.discord.alt} width={24}   />

//           </div>
//           Discord
//         </a>
//       </div>
//       <div className="flex">
//         <a
//           href={socialLinks.instagram}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="flex gap-3 transition-all duration-300 ease-in-out hover:text-[var(--adaki-red)]"
//         >
//           <div className="flex items-center justify-center gap-2">
//             <Image src={images.socials.instagram.src} alt={images.socials.instagram.alt} width={24}   />

//           </div>
//          Instagram
//         </a>
//       </div>
//     </div>
//   </div>;
// }

// export default  Socials;

"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import CustomImage from "../CustomImage";
import axios from "axios";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
  imgTitle,
}: {
  items: {
    image: string;
  }[];
  imgTitle: string;
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const [loadedImages, setLoadedImages] = useState<string[] | null>(null);

  useEffect(() => {
    addAnimation();
  }, []);

  const fetchRandomImage = async (query: string) => {
    try {
      const response = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
          params: {
            query,
            client_id: "YdJKmzfGSanZbNKkW-Ya71gYASAOSsuxWEehPY2geKk",
            per_page: 30,
          },
        }
      );

      const images = response.data.results;

      if (images.length === 0) return "";

      // Select a random image from the results
      const randomIndex = Math.floor(Math.random() * images.length);
      return images[randomIndex].urls.regular; // Return the URL of the random image
    } catch (error) {
      console.error("Error fetching image from Unsplash:", error);
      return "";
    }
  };

  useEffect(() => {
    const loadImages = async () => {
      const images = await Promise.all(
        items.map(async (item) => {
          return await fetchRandomImage(imgTitle);
        })
      );
      setLoadedImages(images);
    };

    loadImages();
  }, []);

  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-max overflow-hidden ",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll ",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {loadedImages?.map((item, idx) => (
          <div
            className="text-white md:max-w-md w-[200px] md:w-[500px] flex justify-center items-center flex-col bg-[#09090B] border-gray-700 rounded-3xl overflow-hidden drop-shadow-lg object-cover"
            key={`${idx}`}
          >
            <img
              src={item}
              alt="Gallery"
              className="w-[500px] h-[300px] object-contain"
            />
          </div>
        ))}
      </ul>
    </div>
  );
};

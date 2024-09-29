"use client";

import { cn } from "@/lib/utils";
import axios from "axios";
import Image from "next/image";
import { FC, useEffect, useState } from "react";

const fetchRandomImage = async (query: string) => {
  try {
    const response = await axios.get("https://api.unsplash.com/photos/random", {
      params: {
        query,
        client_id: "YdJKmzfGSanZbNKkW-Ya71gYASAOSsuxWEehPY2geKk",
        orientation: "landscape",
      },
    });

    // console.log(response.data);
    const images = response.data.urls.regular;

    // if (images.length === 0) return "";

    // Select a random image from the results
    // const randomIndex = Math.floor(Math.random() * images.length);
    return images;
  } catch (error) {
    console.error("Error fetching image from Unsplash:", error);
    throw error;
  }
};

const CustomImage: FC<{
  title: string;
  alt: string | undefined;
  className: string;
}> = ({ title, alt, className }) => {
  const [imgURI, setImgURI] = useState<string | null>(null);

  useEffect(() => {
    const getImage = async () => {
      const unsplashImage = await fetchRandomImage(title);
      setImgURI(unsplashImage);
    };

    getImage();
  }, [title]);

  if (!imgURI) return <>ISSUES</>;

  return (
    <Image
      priority
      className={cn(className, "rounded-2xl overflow-hidden")}
      src={imgURI}
      alt={alt || ""}
      height={500}
      width={500}
    />
  );
};

export default CustomImage;

"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Home = () => {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [descripiton, setDescripiton] = useState("");

  const handleOnClick = () => {
    if (!title || !descripiton) return;
    router.push(`${title}?descripiton=${descripiton}`);
  };

  return (
    <div className="h-[100vh] flex flex-col justify-center items-center w-full">
      <div className="flex flex-col container gap-4">
        <Input
          placeholder="Please enter the title of the application"
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          placeholder="Please enter the descripiton of the application"
          onChange={(e) => setDescripiton(e.target.value)}
        />
        <Button className="w-full" onClick={handleOnClick}>
          Create
        </Button>
      </div>
    </div>
  );
};

export default Home;

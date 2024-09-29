// "use client";
// import axios from "axios";
// import { DynamicComponent } from "@/components/DynamicComponent";
// import { useEffect, useState } from "react";
// import { useParams, useSearchParams } from "next/navigation";

// const Page = () => {
//   const [data, setData] = useState<any>();

//   const params = useParams();
//   const searchParams = useSearchParams();

//   useEffect(() => {
//     if (!params.title || !searchParams.get("descripiton")) return;
//     const getData = async () => {
//       try {
//         const data = await axios.post("http://localhost:8000/site/create", {
//           name: params.title,
//           description: searchParams.get("descripiton"),
//         });

//         setData(data.data.jsonData as any[]);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getData();
//   }, [params]);

//   if (!data) return;

//   return (
//     <div>
//       {data?.map((item: any, idx: number) => (
//         <DynamicComponent item={item} key={`${idx}`} imgTitle={params.title} />
//       ))}
//     </div>
//   );
// };

// export default Page;

import axios from "axios";
import { DynamicComponent } from "@/components/DynamicComponent";

const getData = async (title: string, description: string) => {
  if (!title || !description) return;
  try {
    const data = await axios.post("http://localhost:8000/site/create", {
      name: title,
      description,
    });

    return data.data.jsonData as any[];
  } catch (error) {
    console.log(error);
    return null;
  }
};

const Page = async ({ params, searchParams }: any) => {
  const data = await getData(params?.title, searchParams?.descripiton);
  if (!data) return;

  return (
    <div>
      {data?.map((item: any, idx: number) => (
        <DynamicComponent item={item} key={`${idx}`} imgTitle={params.title} />
      ))}
    </div>
  );
};

export default Page;

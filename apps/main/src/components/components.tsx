import { FC, VideoHTMLAttributes } from "react";
import { SparklesCore } from "./ui/sparkles";
import { cn } from "@/lib/utils";
import { WavyBackground } from "./ui/wavy-background";
import { InfiniteMovingCards } from "./ui/MovingCards";
import CustomImage from "./CustomImage";

interface MediaHeroProps {
  imgURL?: string;
  alt?: string;
  parentStyles?: string;
  videoURL?: string;
  mediaContainerStyles?: string;
  videoProps?: VideoHTMLAttributes<any>;
  overlayStyles?: string;
  title?: string;
  subTitle?: string;
  description?: string;
  imgTitle: string;
}

export const MediaHero: FC<MediaHeroProps> = ({
  videoURL,
  mediaContainerStyles,
  alt,
  imgURL,
  parentStyles,
  videoProps,
  overlayStyles,
  title,
  subTitle,
  description,
  imgTitle,
}) => {
  return (
    <>
      <div className={cn("relative", parentStyles)}>
        <div
          className={cn(
            "relative w-full h-[350px] md:h-[650px] lg:h-[550px] 2xl:h-[1500px]",
            mediaContainerStyles
          )}
        >
          {videoURL && (
            <video autoPlay muted loop src={videoURL} {...videoProps} />
          )}
          {imgURL && (
            <CustomImage
              title={imgTitle}
              alt={alt}
              className="object-cover w-full h-full"
            />
          )}
          <div
            className={cn(
              "absolute inset-0 bg-black opacity-40",
              overlayStyles
            )}
          />
        </div>
        <div className="absolute top-0 left-0 text-white h-full w-full">
          <div className="w-full h-full justify-center items-center flex flex-col space-y-7">
            <div className="max-w-xl md:max-w-xl 2xl:max-w-3xl text-center space-y-1">
              <h5 className="md:text-4xl text-xl 2xl:text-6xl font-light">
                {subTitle}
              </h5>
              <h3 className="md:text-7xl font-semibold text-4xl 2xl:text-8xl">
                {title}
              </h3>
            </div>
            <div className="max-w-xl 2xl:max-w-3xl text-center hidden md:block">
              <p className="tracking-wider 2xl:text-lg">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

interface GradientHeroProps {
  title: string;
  desc: string;
}

export const GradientHero: FC<GradientHeroProps> = ({ title, desc }) => {
  return (
    <div className="relative h-[350px] md:h-[650px] lg:h-[450px] 2xl:h-[1500px] overflow-hidden">
      <WavyBackground className="max-w-4xl mx-auto pb-40 text-white h-[350px] md:h-[650px] lg:h-[450px] 2xl:h-[1500px] flex justify-center items-center flex-col">
        <p className="text-2xl md:text-4xl lg:text-7xl text-white font-bold inter-var text-center">
          {title}
        </p>
        <p className="text-base md:text-lg mt-4 text-white font-normal inter-var text-center">
          {desc}
        </p>
      </WavyBackground>
    </div>
  );
};

interface ImgProps {
  imgSrc: string;
  alt: string;
  className?: string;
  imgTitle: string;
}

export const PositionImage: FC<ImgProps> = ({ imgTitle, alt, className }) => {
  return (
    <div
      className={cn(
        "lg:w-1/2 w-full rounded-2xl overflow-hidden flex justify-center items-center",
        className
      )}
    >
      <CustomImage
        title={imgTitle}
        alt={alt}
        className="object-contain w-[80%] rounded-2xl h-[500px]"
      />
    </div>
  );
};

interface MediaSectionProps {
  imgSrc: string;
  alt: string;
  title: string;
  imgPosition: "left" | "right";
  parentContainerStyles?: string;
  content: string;
  imgTitle: string;
}

export const MediaSection: FC<MediaSectionProps> = ({
  parentContainerStyles,
  imgPosition,
  imgSrc,
  alt,
  title,
  content,
  imgTitle,
}) => {
  return (
    <div className={cn(parentContainerStyles, "py-10")}>
      <div className="text-justify flex lg:flex-row flex-col justify-center items-center">
        {imgPosition == "left" && (
          <PositionImage imgSrc={imgSrc} imgTitle={imgTitle} alt={alt} />
        )}
        <div
          className={`lg:w-1/2 w-full flex flex-col justify-center items-center px-10 min-[500px] space-y-5 ${
            imgPosition == "left" ? "md:pr-20" : "md:pl-20"
          }`}
        >
          <h4 className="text-4xl text-center mt-4 lg:mt-0">{title}</h4>
          <div className="w-full text-center md:text-justify space-y-4 px-6 md:px-0 md:pb-4 prose prose-h1:text-2xl prose-h2:text-2xl prose-h3:text-2xl prose-h4:text-2xl prose-h5:text-2xl prose-h6:text-2xl prose-h1:text-center prose-h2:text-center prose-h3:text-center prose-h4:text-center prose-h5:text-center prose-h6:text-center flex justify-center items-center flex-col">
            <p>{content}</p>
          </div>
        </div>
        {imgPosition == "right" && (
          <PositionImage
            imgSrc={imgSrc}
            imgTitle={imgTitle}
            alt={alt}
            className="pt-10 md:pt-0"
          />
        )}
      </div>
    </div>
  );
};

interface ServiceCardProps {
  title: string;
  desc: string;
}

export const ServiceCard: FC<ServiceCardProps> = ({ title, desc }) => {
  return (
    <>
      <div className="bg-white shadow-md text-start md:max-w-[370px] mx-auto overflow-hidden py-5 rounded-2xl">
        <div className="py-2 px-7 text-center">
          <div className="relative flex justify-center items-center py-3">
            <div className="rounded-full bg-[#2e2e2e]/80 w-[50px] h-[35px]" />
            <div className="rounded-full absolute top-[50%] left-[50%] bg-[#fff] w-[40px] h-[15px] translate-x-[-50%] translate-y-[-50%]" />
          </div>
          <h3 className="font-semibold text-xl md:text-xl py-2">{title}</h3>
          <p className="text-gray-400 tracking-wide py-2">{desc}</p>
        </div>
      </div>
    </>
  );
};

interface ServiceSectionProps {
  title: string;
  desc: string;
  services: ServiceCardProps[];
}

export const ServiceSection: FC<ServiceSectionProps> = ({
  title,
  desc,
  services,
}) => {
  return (
    <div className="w-full mx-auto py-8 md:px-20 px-16 max-w-[1440px] bg-[#f5faff] text-center">
      <h1 className="text-3xl md:text-4xl font-bold py-4">{title}</h1>
      <div className="w-[10%] h-[2px] mx-auto my-2 bg-black" />
      <p className="text-gray-400 py-4 md:max-w-[800px] mx-auto leading-9 tracking-wide">
        {desc}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 py-4">
        {services?.map(({ desc, title }, idx) => (
          <ServiceCard title={title} desc={desc} key={`${idx}`} />
        ))}
      </div>
    </div>
  );
};

interface SliderServiceCardProps {
  title: string;
  description: string;
}

export const SliderServiceCard: FC<SliderServiceCardProps> = ({
  title,
  description,
}) => {
  return (
    <div className="flex flex-shrink-0 relative mt-7 snap-center drop-shadow-md mb-4 ml-2">
      <div className="bg-white p-10 rounded-3xl flex flex-col items-center md:max-w-lg max-w-xs">
        <div className="relative">
          <div className="rounded-full bg-gray-600 w-[60px] h-[40px]" />
          <div className="rounded-full absolute top-[50%] left-[50%] bg-white w-[45px] h-[25px] translate-x-[-50%] translate-y-[-50%]" />
        </div>
        <div>
          <h4 className="text-3xl text-center font-semibold pt-4 pb-4 text-black">
            {title}
          </h4>
          <p className="md:text-justify tracking-wider text-black">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

interface SliderServiceSectionProps {
  title: string;
  services: SliderServiceCardProps[];
}

export const SliderServiceSection: FC<SliderServiceSectionProps> = ({
  title,
  services,
}) => {
  return (
    <div className="relative flex overflow-hidden text-center flex-col max-w-max z-0 mx-auto px-3 bg-gray-200 py-10">
      <h3 className="text-black text-4xl">{title}</h3>
      <div className="flex overflow-x-scroll snap-mandatory z-20 w-full snap-x overflow-y-hidden space-x-5">
        {services?.map(({ title, description }, idx) => (
          <SliderServiceCard
            key={`${idx}`}
            title={title}
            description={description}
          />
        ))}
      </div>
    </div>
  );
};

interface SliderServiceTwoCardProps {
  src: string;
  alt: string;
  serviceName: string;
  serviceDescription: string;
  imgTitle: string;
}

export const SliderServiceCardTwo: FC<SliderServiceTwoCardProps> = ({
  src,
  alt,
  serviceName,
  serviceDescription,
  imgTitle,
}) => {
  return (
    <div className="rounded-2xl overflow-hidden lg:w-[300px] w-[230px] sm:w-[270px] md:w-[200px] bg-[#131111] border-b-[1px] border-gray-700 relative">
      <div className="h-[200px] overflow-hidden relative">
        {src && (
          <CustomImage
            title={imgTitle}
            alt={alt}
            className="object-cover w-[230px] lg:w-[300px] sm:w-[270px] md:w-[200px] h-full"
          />
        )}
      </div>
      <div className="p-3 border-gray-700 border-[1px] border-t-0 rounded-2xl rounded-t-none space-y-3 flex flex-col h-[200px] justify-center items-center text-center">
        <h2>{serviceName}</h2>
        <p className="text-sm tracking-tighter text-gray-400">
          {serviceDescription.length > 100
            ? serviceDescription.slice(0, 100) + "..."
            : serviceDescription}
        </p>
      </div>
      <SparklesCore
        background="transparent"
        minSize={0.4}
        maxSize={0.6}
        particleDensity={50}
        className="w-full h-full absolute top-0 left-0 pointer-events-none"
        particleColor="#f5f5f5"
        id={`sparkles-${serviceName}`}
      />
    </div>
  );
};

interface SliderServiceSectionTwoProps {
  title: string;
  services: SliderServiceTwoCardProps[];
  imgTitle: string;
}

export const SliderServiceSectionTwo: FC<SliderServiceSectionTwoProps> = ({
  title,
  services,
  imgTitle,
}) => {
  return (
    <div
      className={`flex justify-center items-start px-10 py-8 bg-[#1f1e1e] text-white flex-col relative space-y-5 overflow-x-scroll overflow-y-hidden w-full`}
    >
      <div className="w-full sticky left-0 top-0 text-center z-30">
        <h2 className="md:text-4xl text-3xl scroll-m-0 overflow-y-hidden">
          {title}
        </h2>
      </div>
      <div className="flex space-x-4 overflow-x-scroll">
        {services?.map((service, index) => (
          <SliderServiceCardTwo
            src={service.src}
            alt={service.alt}
            serviceName={service.serviceName}
            serviceDescription={service.serviceDescription}
            imgTitle={imgTitle}
            key={`${index}`}
          />
        ))}
      </div>
    </div>
  );
};

interface ProductShowcaseProps {
  title: string;
  images: { image: string }[];
  imgTitle: string;
}

export const ProductShowcase: FC<ProductShowcaseProps> = ({
  images,
  title,
  imgTitle,
}) => {
  return (
    <div className="w-full flex flex-col justify-center items-center space-y-4 md:p-10 p-3 overflow-hidden">
      <h4 className="text-4xl text-center text-black">{title}</h4>
      <InfiniteMovingCards
        items={images}
        speed="slow"
        pauseOnHover={false}
        imgTitle={imgTitle}
      />
    </div>
  );
};

interface HeroOneProps {
  appName: string;
  desc: string;
  buttonOneText: string;
  buttonTwoText: string;
  imgTitle: string;
}

export const HeroOne: FC<HeroOneProps> = ({
  appName,
  desc,
  buttonOneText,
  buttonTwoText,
  imgTitle,
}) => {
  return (
    <section className="bg-gray-100 text-gray-800">
      <div className="container mx-auto flex flex-col items-center py-16 px-6 text-center md:text-left md:flex-row">
        <div className="flex-1 mb-10 md:mb-0">
          <h1 className="text-4xl font-bold mb-6">
            Welcome to <span className="text-indigo-600">{appName}</span>
          </h1>
          <p className="text-lg text-gray-600 mb-6">{desc}</p>
          <div className="space-x-4">
            <a
              href="#get-started"
              className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-500"
            >
              {buttonOneText}
            </a>
            <a
              href="#learn-more"
              className="px-6 py-3 bg-gray-300 text-gray-800 font-semibold rounded hover:bg-gray-400"
            >
              {buttonTwoText}
            </a>
          </div>
        </div>
        <div className="flex-1">
          <CustomImage
            title={imgTitle}
            alt="Hero Image"
            className="w-full max-w-md mx-auto md:ml-auto"
          />
        </div>
      </div>
    </section>
  );
};

interface HeroTwoProps {
  appName: string;
  desc: string;
  buttonOneText: string;
  buttonTwoText: string;
}

export const HeroTwo: FC<HeroTwoProps> = ({
  appName,
  desc,
  buttonOneText,
  buttonTwoText,
}) => {
  return (
    <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20 px-4 md:py-32">
      <div className="container mx-auto text-center">
        {/* Headline */}
        <h1 className="text-4xl font-bold mb-4 md:text-5xl lg:text-6xl">
          Empower Your <span className="text-yellow-300">{appName}</span>
        </h1>
        {/* Subheading */}
        <p className="text-lg mb-8 max-w-md mx-auto md:text-xl md:max-w-xl">
          {desc}
        </p>
        {/* Call to Action Buttons */}
        <div className="space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row justify-center">
          <a
            href="#get-started"
            className="bg-yellow-300 text-indigo-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition duration-300"
          >
            {buttonOneText}
          </a>
          <a
            href="#learn-more"
            className="bg-transparent border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-900 transition duration-300"
          >
            {buttonTwoText}
          </a>
        </div>
      </div>
    </section>
  );
};

interface NavProps {
  appName: string;
  links: string[];
}

export const Nav: FC<NavProps> = ({ appName, links }) => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <a>{appName}</a>
        </div>
        <div className="hidden md:flex space-x-4">
          {links.map((link, idx) => (
            <a className="text-gray-300 hover:text-white" key={`${idx}`}>
              {link}
            </a>
          ))}
        </div>
        <div className="md:hidden">
          <button className="text-white focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      <div className="md:hidden">
        <div className="flex flex-col space-y-2 mt-2">
          {links.map((link, idx) => (
            <a className="block text-gray-300 hover:text-white" key={`${idx}`}>
              {link}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

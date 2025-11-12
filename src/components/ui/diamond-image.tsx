import Image from "next/image";
import { cn } from "@/lib/utils";

interface DiamondImageProps {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg";
  withBorder?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "w-16 h-16 md:w-20 md:h-20",
  md: "w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40",
  lg: "w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48",
};

export function DiamondImage({ 
  src, 
  alt, 
  size = "md", 
  withBorder = false, 
  className 
}: DiamondImageProps) {
  return (
    <div 
      className={cn(
        "relative transform rotate-45 overflow-hidden",
        sizeClasses[size],
        withBorder && "border-4 border-white shadow-lg",
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transform -rotate-45 scale-150"
        sizes="(max-width: 768px) 200px, 300px"
      />
    </div>
  );
}

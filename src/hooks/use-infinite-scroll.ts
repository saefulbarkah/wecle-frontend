import { useRef } from "react";
import { useIntersection } from "@mantine/hooks";

type options = {
  onVisibleViewport: () => void;
};

export const useInfiniteScroll = ({ onVisibleViewport }: options) => {
  const refTarget = useRef<HTMLElement>(null);
  const { entry, ref } = useIntersection({
    root: refTarget.current,
    threshold: 1,
  });

  if (entry?.isIntersecting) console.log("hit");

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const target = refTarget.current;
  //     if (target) {
  //       const scrollCurrent = window.scrollY;
  //       const targetBottom = target.offsetTop + target.offsetHeight;
  //       const isHitting = scrollCurrent + window.innerHeight >= targetBottom;
  //       if (isHitting) {
  //         onHitScrolling();
  //       }
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => window.removeEventListener("scroll", handleScroll);
  // });

  return { ref, entry };
};

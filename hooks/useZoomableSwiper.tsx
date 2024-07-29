"use client";

import { useEffect, useRef, MutableRefObject } from "react";
import SwiperCore from "swiper";
import { Zoom } from "swiper/modules";

SwiperCore.use([Zoom]);

const useZoomableSwiper = (zoomButtonId: string) => {
  const swiperRef = useRef<SwiperCore | null>(null);

  useEffect(() => {
    const zoomButton = document.getElementById(zoomButtonId);
    const handleZoom = () => {
      if (swiperRef.current) {
        const swiper = swiperRef.current;
        if (swiper.zoom.scale === 1) {
          swiper.zoom.in();
        } else {
          swiper.zoom.out();
        }
      }
    };

    if (zoomButton) {
      zoomButton.addEventListener("click", handleZoom);
    }

    return () => {
      if (zoomButton) {
        zoomButton.removeEventListener("click", handleZoom);
      }
    };
  }, [zoomButtonId]);

  return swiperRef;
};

export default useZoomableSwiper;

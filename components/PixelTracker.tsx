'use client';

import { useEffect } from 'react';
import ReactPixel from 'react-facebook-pixel';

const PixelTracker = () => {
  useEffect(() => {
    const pixelId = '2403678706691530';
    ReactPixel.init(pixelId);
    ReactPixel.pageView();
  }, []);

  return null;
};

export default PixelTracker;

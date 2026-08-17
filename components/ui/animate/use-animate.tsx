'use client';

import type { AnimationGeneratorType, Variants } from 'motion';

export const useAnimate = ({
                             duration,
                             delay,
                             type
                           }: {
  duration: number | undefined;
  delay: number | undefined;
  type?: AnimationGeneratorType;
}) => {
  const fadeInUp: Variants = {
    hidden: {
      opacity: 0,
      y: 40
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        delay,
        type: 'spring'
      }
    }
  };

  const fadeInDown: Variants = {
    hidden: {
      opacity: 0,
      y: -60
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: 'easeOut',
        delay
      }
    }
  };

  const fadeInLeft: Variants = {
    hidden: {
      opacity: 0,
      x: -16
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration,
        delay,
        type: 'spring'
      }
    }
  };

  const fadeInRight: Variants = {
    hidden: {
      opacity: 0,
      x: 16
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration,
        delay,
        type: 'spring'
      }
    }
  };

  const scaleUp: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.94
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration,
        ease: type === 'spring' ? undefined : 'easeOut',
        delay,
        type: 'spring',
        stiffness: 400,
        damping: 20
      }
    }
  };

  const disabledAnimations: Variants = {
    hidden: {},
    visible: {}
  };

  const variants = {
    up: fadeInUp,
    down: fadeInDown,
    left: fadeInLeft,
    right: fadeInRight,
    scaleUp: scaleUp,
    disabledAnimations
  };

  return {
    variants
  };
};
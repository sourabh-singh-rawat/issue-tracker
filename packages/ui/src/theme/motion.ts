export type PineMotionScheme = "expressive" | "standard";

export type PineMotionDurations = {
  short1: number;
  short2: number;
  short3: number;
  short4: number;
  medium1: number;
  medium2: number;
  medium3: number;
  medium4: number;
  long1: number;
  long2: number;
  long3: number;
  long4: number;
};

export type PineMotionEasings = {
  emphasizedDecelerate: string;
  emphasizedAccelerate: string;
  standard: string;
};

export type PineMotion = {
  scheme: PineMotionScheme;
  duration: PineMotionDurations;
  easing: PineMotionEasings;
};

export const pineMotion = {
  scheme: "expressive",
  duration: {
    short1: 50,
    short2: 100,
    short3: 150,
    short4: 200,
    medium1: 250,
    medium2: 300,
    medium3: 350,
    medium4: 400,
    long1: 450,
    long2: 500,
    long3: 550,
    long4: 600,
  },
  easing: {
    emphasizedDecelerate: "cubic-bezier(0.05, 0.7, 0.1, 1)",
    emphasizedAccelerate: "cubic-bezier(0.3, 0, 0.8, 0.15)",
    standard: "cubic-bezier(0.2, 0, 0, 1)",
  },
} satisfies PineMotion;

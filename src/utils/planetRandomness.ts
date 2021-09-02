import { Random } from "excalibur";
import { PlanetType } from "../models/Planet";

export const randomName = (): string => {
  const rand = new Random();
  const cons = [
    "b",
    "c",
    "d",
    "f",
    "g",
    "h",
    "j",
    "k",
    "l",
    "m",
    "n",
    "p",
    "q",
    "r",
    "s",
    "t",
    "v",
    "w",
    "x",
    "z",
  ];
  const vows = ["a", "e", "i", "o", "u", "y"];
  const len = rand.integer(4, 10);
  let name = "";
  for (let i = 0; i < len; i++) {
    const isVowel = rand.bool(0.4);
    if (isVowel) {
      name = name + rand.pickOne(vows);
    } else {
      name = name + rand.pickOne(cons);
    }
  }
  return name;
};

export const randomType = () => {
  const rand = new Random();
  const pick = rand.integer(0, 2);
  if (pick == 0) {
    return PlanetType.Big;
  } else {
    return PlanetType.Small;
  }
};

export const randomRadius = (type: PlanetType) => {
  const rand = new Random();
  switch (type) {
    case PlanetType.Big:
      return (rand.integer(70, 100));
    case PlanetType.Medium:
      return (rand.integer(40, 69));
    case PlanetType.Small:
      return (rand.integer(20, 39));
  }
};

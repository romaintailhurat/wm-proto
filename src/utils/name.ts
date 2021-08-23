import { Random } from "excalibur";

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
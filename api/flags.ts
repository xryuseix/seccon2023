const DEV_MODE = false;

type Flags = {
  chall2: string;
  chall3: string;
  chall4: string;
};

const devFlags = {
  chall2: "ctf4b{chall2_flag}",
  chall3: "ctf4b{chall3_flag}",
  chall4: "ctf4b{chall4_flag}",
};

export function getFlag(chall: keyof Flags, isDev: boolean = DEV_MODE): string {
  return devFlags[chall];
}

export const password = 35;

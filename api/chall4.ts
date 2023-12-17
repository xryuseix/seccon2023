// ここはimportなので気にしなくて大丈夫です
import { z } from "https://deno.land/x/zod@v3.16.1/mod.ts";
import { ChallRes } from "./types.ts";
import { getFlag } from "./flags.ts";

const Chall4ReqBodySchema = z.object({
  password: z.string(),
});
export type Chall4ReqBody = z.infer<typeof Chall4ReqBodySchema>;

export function chall4(req: Chall4ReqBody): ChallRes {
  console.log(req);
  return { flag: getFlag('chall4'), message: "fantastic!" };
}

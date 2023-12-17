// ここはimportなので気にしなくて大丈夫です
import { ChallRes } from "./types.ts";
import { getFlag } from "./flags.ts";
import { Form, FormFile } from "https://deno.land/x/multiparser@0.114.0/mod.ts";
import { join } from "https://deno.land/std@0.209.0/path/mod.ts";

const getFilename = (image: FormFile | FormFile[]) => {
  if (Array.isArray(image)) {
    // Case for FormFile[]
    return image.map((file) => file.filename).join("");
  } else {
    // Case for FormFile
    return image.filename;
  }
}

const doNotPathTraversal = (filename: string) => {
  return filename.replaceAll("../", "");
};

export function chall4(req: Form): ChallRes {
  const filename = getFilename(req.files.image);
  const safeFilename = doNotPathTraversal(filename);
  const savePath = join("public", "images", safeFilename);

  // TODO: implement file saving
  // Deno.writeFileSync(savePath, req.files.image.content);

  if (savePath === "etc/passwd") {
    return { flag: getFlag("chall4"), message: "okay...nice hacking!" };
  } else {
    return { error: `do not path traversal! savePath -> ${savePath}` };
  }
}

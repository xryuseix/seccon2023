import { chall2 } from "./chall2.ts";
import { chall3 } from "./chall3.ts";
import { chall4 } from "./chall4.ts";
import { ChallRes, ReqBody } from "./types.ts";
import { Form, multiParser } from "https://deno.land/x/multiparser@0.114.0/mod.ts";

// ユーザのPOSTリクエストに関するクエリパラメータに応じて、適切な関数を呼び出しています
function postRouter(challType: string, req: ReqBody | Form | undefined) {
  if (typeof req === "undefined") {
    return new Response("request body is undefined!");
  }
  switch (challType) {
    case "2":
      return chall2(req as ReqBody);
    case "3":
      return chall3(req as ReqBody);
    case "4":
      return chall4(req as Form);
    default:
      return new Response(`${challType} challenge is not found!`);
  }
}

// サーバの起動やリクエストの処理をしています
// この部分はあまり気にしなくて大丈夫です
// クエリパラメータとしてchall=1を指定すると、chall1関数が呼び出されます
// また、chall2, chall3はPOSTリクエストでJSON形式のリクエストボディを送信する必要があります
// 例えば、chall2の場合は以下のようにcurlコマンドを実行します
// curl -X POST localhost:8000\?chall=2 -H "Content-Type: application/json" -d '{"product":"apple", "count": 5}'
export default async (req: Request) => {
  const url = new URL(req.url);
  const query = Object.fromEntries(url.searchParams.entries());

  const method = req.method.toUpperCase();
  if (method === "POST") {
    if (typeof query.chall === "undefined") {
      return new Response("path param is required!");
    }
    let result: ChallRes | Response = { error: "error" } as ChallRes;
    try {
      if (query.chall === "4") {
        const contentType = req.headers.get("content-type");
        if (contentType && contentType.includes("multipart/form-data")) {
          const body = await multiParser(req);
          result = postRouter(query.chall, body);
        }
      } else {
        const body = JSON.parse(await new Response(req.body).text());
        result = postRouter(query.chall, body);
      }
    } catch (e) {
      return new Response(e.message);
    }
    if (result instanceof Response) {
      return result;
    } else {
      return new Response(JSON.stringify(result));
    }
  }
  if (method === "GET") {
    return new Response();
  } else {
    return new Response(`method ${method} is not allowed!`);
  }
};

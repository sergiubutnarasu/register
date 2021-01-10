import fetch from "isomorphic-unfetch";
import { stringifyReplacer } from "~/modules/common";

const useFetch = () => {
  const post = async (
    url: string,
    body: any,
    headers: { [key: string]: string } = {}
  ) =>
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(body, stringifyReplacer("YYYY-MM-DD")),
    });

  return {
    post,
  };
};

export default useFetch;

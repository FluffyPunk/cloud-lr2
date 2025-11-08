import { expect, test } from "bun:test";
import homepage from "./index.html";

function getRandomInt(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

test("d6 rolls between 1 and 6", () => {
  for (let i = 0; i < 100; i++) {
    const roll = getRandomInt(1, 7);
    expect(roll).toBeGreaterThanOrEqual(1);
    expect(roll).toBeLessThanOrEqual(6);
  }
});

Bun.serve({
  // `routes` requires Bun v1.2.3+
  routes: {
    "/": homepage,

    "/api/status": new Response("OK"),

    // Хто я? (трекер, варіант №4)
    "/api/whoami": (req: Request) => {
      return new Response(`Your IP is ${req.headers.get("X-Forwarded-For")?.split(",")[0]}\n`);
    },

    // Кубик (рандомайзер, варіант №2)
    "/api/d6": () => {
      const dice = getRandomInt(1, 7);
      return new Response(`The dice rolled a number ${dice}\n`);
    },

    // Календар (варіант №1)
    "/api/today": () => {
      const today = new Date();

      return new Response(`Today is ${today.toDateString()} \n`);
    },

    // Годинник (варіант №3)
    "/api/now": () => {
      const today = new Date();

      return new Response(`The time now is ${today.toTimeString()} \n`);
    },

    // Відлік (варіант №5)
    "/api/weekend": () => {
      const today = new Date();
      const weekday = today.getDay();
      const days = (6 - weekday) % 7;
      return new Response(`There are ${days === 0 ? 7 : days} days left to Saturday \n`);
    },

    // Wildcard route for all routes that start with "/api/" and aren't otherwise matched
    "/api/*": Response.json({ message: "Not found" }, { status: 404 }),
  },

  // (optional) fallback for unmatched routes:
  // Required if Bun's version < 1.2.3
  fetch() {
    return new Response("Not Found", { status: 404 });
  },
});

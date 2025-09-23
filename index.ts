import type { Server } from "bun";

function getRandomInt(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

Bun.serve({
  // `routes` requires Bun v1.2.3+
  routes: {


    "/api/status": new Response("OK"),

    // Хто я? (трекер, варіант №4)
    "/api/whoami": (req: Request) => {
    
      return new Response(`Your IP is ${req.headers.get("X-Forwarded-For")}\n`);
    },

    // Кубик (рандомайзер, варіант №2)
    "/api/d6": () => {
        let dice = getRandomInt(1, 7)
        return new Response(`The dice rolled a number ${dice}\n`)
    },

    // Календар (варіант №1)
    "/api/today": () => {
        let today = new Date()
        
        return new Response(`Today is ${today.toDateString()} \n`)
    },

    // Годинник (варіант №3)
    "/api/now": () => {
        let today = new Date()
        
        return new Response(`The time now is ${today.toTimeString()} \n`)
    },

    // Відлік (варіант №5)
    "/api/weekend": () => {
        const today = new Date();
        const weekday = today.getDay();
        let days = (6 - weekday) % 7;
        return new Response(`There are ${days === 0 ? 7 : days} days left to Saturday \n`)
    },

    // Wildcard route for all routes that start with "/api/" and aren't otherwise matched
    "/api/*": Response.json({ message: "Not found" }, { status: 404 }),
  },

  // (optional) fallback for unmatched routes:
  // Required if Bun's version < 1.2.3
  fetch(req) {
    return new Response("Not Found", { status: 404 });
  },
});

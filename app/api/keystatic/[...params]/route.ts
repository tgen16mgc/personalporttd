import config from "../../../../keystatic.config";

type Handler = (req: Request) => Response | Promise<Response>;
let _handlers: { GET: Handler; POST: Handler } | null = null;

async function getHandlers() {
  if (!_handlers) {
    const { makeRouteHandler } = await import(
      "@keystatic/next/route-handler"
    );
    _handlers = makeRouteHandler({ config });
  }
  return _handlers;
}

export async function GET(req: Request) {
  try {
    const handlers = await getHandlers();
    return handlers.GET(req);
  } catch {
    return new Response("Keystatic API not configured", { status: 503 });
  }
}

export async function POST(req: Request) {
  try {
    const handlers = await getHandlers();
    return handlers.POST(req);
  } catch {
    return new Response("Keystatic API not configured", { status: 503 });
  }
}

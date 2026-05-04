import { isKeystaticAdminEnabled } from "@/lib/security.mjs";

type Handler = (req: Request) => Response | Promise<Response>;
let _handlers: { GET: Handler; POST: Handler } | null = null;

async function getHandlers() {
  if (!_handlers) {
    const [{ default: config }, { makeRouteHandler }] = await Promise.all([
      import("../../../../keystatic.config"),
      import("@keystatic/next/route-handler"),
    ]);
    _handlers = makeRouteHandler({ config });
  }
  return _handlers;
}

function disabledResponse() {
  return new Response("Not Found", { status: 404 });
}

export async function GET(req: Request) {
  if (!isKeystaticAdminEnabled(process.env)) {
    return disabledResponse();
  }

  try {
    const handlers = await getHandlers();
    return handlers.GET(req);
  } catch {
    return new Response("Keystatic API not configured", { status: 503 });
  }
}

export async function POST(req: Request) {
  if (!isKeystaticAdminEnabled(process.env)) {
    return disabledResponse();
  }

  try {
    const handlers = await getHandlers();
    return handlers.POST(req);
  } catch {
    return new Response("Keystatic API not configured", { status: 503 });
  }
}

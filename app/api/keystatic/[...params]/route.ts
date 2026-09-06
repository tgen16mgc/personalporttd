import { isKeystaticAdminEnabled } from "@/lib/security.mjs";
import { cacheKeystaticResponse } from "@/lib/keystatic-response.mjs";

type Handler = (req: Request) => Response | Promise<Response>;
let handlersPromise: Promise<{ GET: Handler; POST: Handler }> | null = null;

async function getHandlers() {
  if (!handlersPromise) {
    handlersPromise = Promise.all([
      import("../../../../keystatic.config"),
      import("@keystatic/next/route-handler"),
    ]).then(([{ default: config }, { makeRouteHandler }]) => makeRouteHandler({ config }))
      .catch((error) => {
        handlersPromise = null;
        throw error;
      });
  }
  return handlersPromise;
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
    const response = await handlers.GET(req);
    return process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG
      ? response
      : cacheKeystaticResponse(req, response);
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
    return await handlers.POST(req);
  } catch {
    return new Response("Keystatic API not configured", { status: 503 });
  }
}

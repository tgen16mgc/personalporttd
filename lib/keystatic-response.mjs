export function cacheKeystaticResponse(request, response) {
  const pathname = new URL(request.url).pathname;
  const isContentAddressedBlob = request.method === "GET"
    && /^\/api\/keystatic\/blob\/[a-f0-9]{40}\/.+/.test(pathname)
    && response.status === 200;

  response.headers.set(
    "Cache-Control",
    isContentAddressedBlob ? "private, max-age=31536000, immutable" : "no-store",
  );
  return response;
}

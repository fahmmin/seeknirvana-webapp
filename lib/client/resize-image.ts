/** Downscale image in-browser for smaller uploads (JPEG). */
export async function resizeImageToJpeg(file: File, maxEdge: number): Promise<Blob> {
  const img = await createImageBitmap(file);
  const scale = Math.min(1, maxEdge / Math.max(img.width, img.height));
  const w = Math.max(1, Math.round(img.width * scale));
  const h = Math.max(1, Math.round(img.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    img.close();
    throw new Error("canvas");
  }
  ctx.drawImage(img, 0, 0, w, h);
  img.close();
  return new Promise((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("encode"))), "image/jpeg", 0.88);
  });
}

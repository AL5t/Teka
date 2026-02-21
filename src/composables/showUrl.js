const blobUrlCache = new WeakMap();

export default function showUrl(image) {
  if (!(image instanceof Blob) || image.size <= 0) {
    return null;
  }

  if (!blobUrlCache.has(image)) {
    blobUrlCache.set(image, URL.createObjectURL(image));
  }

  return blobUrlCache.get(image);
}

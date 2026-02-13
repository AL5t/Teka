export default function showUrl(image) {
  if (image && image.size > 0 && image instanceof Blob) {
    const url = URL.createObjectURL(image);
    onUnmounted(() => URL.revokeObjectURL(url));
    return url;
  } else {
    console.error('Blob пуст или некорректный');
  }
}
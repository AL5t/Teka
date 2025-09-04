export default function showUrl(image) {
  if (image && image.size > 0 && image instanceof Blob) {
    return URL.createObjectURL(image);
  } else {
    console.error('Blob пуст или некорректный');
  }
}
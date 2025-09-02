export default function showUrl(image) {
  if (image?.name) {
    return URL.createObjectURL(image);
  }
}
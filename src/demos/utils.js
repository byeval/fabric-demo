export function adjustFontSize(content, width) {
  const baseFontSize = 12;
  const text = new fabric.Text(content, {
    fontSize: baseFontSize,
  });

  let max = 500;
  let fontSize = text.fontSize;

  while (text.width < width && max > 0) {
    fontSize++;
    text.set({ fontSize });
    max--;
  }

  return fontSize;
}

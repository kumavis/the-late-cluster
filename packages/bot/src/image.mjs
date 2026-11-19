// Image type and pixel dimensions from the file's own bytes: PNG and JPEG only, no dependencies.
// The type comes from the magic bytes, never from the file name.

const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];

/** 'image/png', 'image/jpeg', or null. */
export function sniffImageType(bytes) {
  if (bytes.length >= 8 && PNG_SIGNATURE.every((b, i) => bytes[i] === b)) return 'image/png';
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return 'image/jpeg';
  return null;
}

/** { width, height } read from the header, or null if the header cannot be read. */
export function imageDimensions(bytes, mimeType = sniffImageType(bytes)) {
  if (mimeType === 'image/png') return pngDimensions(bytes);
  if (mimeType === 'image/jpeg') return jpegDimensions(bytes);
  return null;
}

// PNG: the signature, then the IHDR chunk first: length (4), "IHDR" (4), width (4), height (4).
function pngDimensions(b) {
  if (b.length < 24) return null;
  if (b.toString('latin1', 12, 16) !== 'IHDR') return null;
  const width = b.readUInt32BE(16);
  const height = b.readUInt32BE(20);
  return width > 0 && height > 0 ? { width, height } : null;
}

// JPEG: walk the marker segments to the first start-of-frame (SOF0..SOF15, except DHT C4,
// JPG C8 and DAC CC), whose payload is precision (1), height (2), width (2).
function jpegDimensions(b) {
  let i = 2;
  while (i + 4 <= b.length) {
    if (b[i] !== 0xff) return null;
    let marker = b[i + 1];
    while (marker === 0xff && i + 2 < b.length) { i++; marker = b[i + 1]; } // fill bytes
    if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) { i += 2; continue; }
    if (marker === 0xd9 || marker === 0xda) return null; // end of image or start of scan before any frame
    if (i + 4 > b.length) return null;
    const len = b.readUInt16BE(i + 2);
    if (len < 2) return null;
    const isSof = marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker);
    if (isSof) {
      if (i + 9 > b.length) return null;
      const height = b.readUInt16BE(i + 5);
      const width = b.readUInt16BE(i + 7);
      return width > 0 && height > 0 ? { width, height } : null;
    }
    i += 2 + len;
  }
  return null;
}

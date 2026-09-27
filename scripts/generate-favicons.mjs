import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function generateFavicons() {
  const rootDir = process.cwd();
  const sourcePng = path.join(rootDir, 'public', 'favicon.png');

  if (!fs.existsSync(sourcePng)) {
    throw new Error('Source favicon.png not found at ' + sourcePng);
  }

  // Load into memory buffer so input file can be safely overwritten
  const sourceBuffer = fs.readFileSync(sourcePng);
  console.log('Generating favicons from source in-memory buffer (size: ' + sourceBuffer.length + ' bytes)');

  // 1. Generate individual PNG sizes
  const sizes = [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'favicon-48x48.png', size: 48 },
    { name: 'favicon-96x96.png', size: 96 },
    { name: 'favicon-144x144.png', size: 144 },
    { name: 'favicon-192x192.png', size: 192 },
    { name: 'apple-icon.png', size: 180 },
    { name: 'favicon-512x512.png', size: 512 },
  ];

  for (const s of sizes) {
    const outPathPublic = path.join(rootDir, 'public', s.name);
    await sharp(sourceBuffer)
      .resize(s.size, s.size, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png({ quality: 95, compressionLevel: 9 })
      .toFile(outPathPublic);
    console.log(`Generated public/${s.name} (${s.size}x${s.size})`);
  }

  // Optimize public/favicon.png (512x512)
  await sharp(sourceBuffer)
    .resize(512, 512, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .png({ quality: 95, compressionLevel: 9 })
    .toFile(path.join(rootDir, 'public', 'favicon.png'));
  console.log('Optimized public/favicon.png (512x512)');

  // Copy to src/app for Next.js metadata conventions
  fs.copyFileSync(
    path.join(rootDir, 'public', 'favicon.png'),
    path.join(rootDir, 'src', 'app', 'icon.png')
  );
  console.log('Updated src/app/icon.png');

  fs.copyFileSync(
    path.join(rootDir, 'public', 'apple-icon.png'),
    path.join(rootDir, 'src', 'app', 'apple-icon.png')
  );
  console.log('Updated src/app/apple-icon.png');

  // 2. Generate multi-resolution ICO file (48x48, 32x32, 16x16)
  // Essential for Google Search requirement (48px square) and browser compatibility
  const b48 = await sharp(sourceBuffer)
    .resize(48, 48, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const b32 = await sharp(sourceBuffer)
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const b16 = await sharp(sourceBuffer)
    .resize(16, 16, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const icoImages = [
    { width: 48, height: 48, buffer: b48 },
    { width: 32, height: 32, buffer: b32 },
    { width: 16, height: 16, buffer: b16 },
  ];

  // ICO header: 6 bytes
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // Image type: 1 = ICO
  header.writeUInt16LE(icoImages.length, 4); // Number of images

  let currentOffset = 6 + icoImages.length * 16;
  const directoryEntries = [];

  for (const img of icoImages) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(img.width === 256 ? 0 : img.width, 0); // Width
    entry.writeUInt8(img.height === 256 ? 0 : img.height, 1); // Height
    entry.writeUInt8(0, 2); // Color palette
    entry.writeUInt8(0, 3); // Reserved
    entry.writeUInt16LE(1, 4); // Color planes
    entry.writeUInt16LE(32, 6); // Bits per pixel
    entry.writeUInt32LE(img.buffer.length, 8); // Size of image data
    entry.writeUInt32LE(currentOffset, 12); // Offset to image data
    directoryEntries.push(entry);
    currentOffset += img.buffer.length;
  }

  const icoBuffer = Buffer.concat([
    header,
    ...directoryEntries,
    ...icoImages.map((img) => img.buffer),
  ]);

  // Write to public/favicon.ico and src/app/favicon.ico
  const publicIco = path.join(rootDir, 'public', 'favicon.ico');
  const appIco = path.join(rootDir, 'src', 'app', 'favicon.ico');

  fs.writeFileSync(publicIco, icoBuffer);
  console.log(`Generated ${publicIco} (${icoBuffer.length} bytes, 48x48 + 32x32 + 16x16)`);

  fs.writeFileSync(appIco, icoBuffer);
  console.log(`Generated ${appIco} (${icoBuffer.length} bytes, 48x48 + 32x32 + 16x16)`);

  console.log('All favicon assets generated successfully!');
}

generateFavicons().catch((err) => {
  console.error('Error generating favicons:', err);
  process.exit(1);
});

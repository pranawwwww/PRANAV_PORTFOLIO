// This file tells TypeScript that we can import files ending in .png.
// It makes it possible to use "import profilePixel from './data/profile-pixel.png';"
declare module '*.png' {
  const value: any;
  export default value;
}

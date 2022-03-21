const modules = {
  randomColors: (function() {
    const getHex = (num) => num.toString(16).padStart(2, '0');
    const getRandomRgb = () => {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      return {r, g, b};
    };
    const rgbToHex = ({r, g, b}) => {
      const rHex = getHex(r), gHex = getHex(g), bHex = getHex(b);
      return '#' + rHex + gHex + bHex;
    };
    const generateRandomColors = (maxColors = 25) => {
      const colors = [];
      for (let i = 0; i <= maxColors - 1; i++) {
        const rgb = getRandomRgb();
        const hex = rgbToHex(rgb);
        colors.push({
          ...rgb,
          hex,
        });
      };
      return colors;
    };
    const get = (num = 25) => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(generateRandomColors(num)), 1000);
      });
    };
    return { get };
  })(),
}

function mockImport(moduleName) {
  const requestedModule = modules[moduleName];
  if (!requestedModule) {
    throw new Error(`Mock module "${moduleName}" was not found in Playground editor`);
  }
  return requestedModule;
}

export default mockImport;
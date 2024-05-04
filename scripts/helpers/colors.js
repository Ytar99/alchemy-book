function getComplementaryColor(color) {
  const [r, g, b] = hexToRgb(color);
  const [h, s, l] = rgbToHsl(r, g, b);
  const complementaryHue = (h + 180) % 360;
  return hslToHex(complementaryHue, s, l);
}

function getAnalogousColor(color, offset) {
  const [r, g, b] = hexToRgb(color);
  const [h, s, l] = rgbToHsl(r, g, b);
  const analogousHue = (h + 30 * offset) % 360;
  return hslToHex(analogousHue, s, l);
}

function getNeutralColor(color, offset) {
  const [r, g, b] = hexToRgb(color);
  const [h, s, l] = rgbToHsl(r, g, b);
  const neutralLightness = Math.min(l + 0.2 * offset, 1);
  const neutralSaturation = Math.max(s - 0.1 * offset, 0);
  const neutralColor = hslToHex(h, neutralSaturation, neutralLightness + offset * 8);

  return neutralColor;
}

function hexToRgb(hex) {
  const match = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!match) {
    throw new Error("Invalid hex color format");
  }
  const r = parseInt(match[1], 16);
  const g = parseInt(match[2], 16);
  const b = parseInt(match[3], 16);
  return [r, g, b];
}

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = (max + min) / 2;
  let s = (max - min) / (max + min);
  let l = h;
  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return [h * 360, s * 100, l * 100];
}

function hslToHex(h, s, l) {
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h * 6) % 2) - 1));
    const m = l - c / 2;
    let r1, g1, b1;
    if (h < 1 / 6) {
      [r1, g1, b1] = [c, x, 0];
    } else if (h < 2 / 6) {
      [r1, g1, b1] = [x, c, 0];
    } else if (h < 3 / 6) {
      [r1, g1, b1] = [0, c, x];
    } else if (h < 4 / 6) {
      [r1, g1, b1] = [0, x, c];
    } else if (h < 5 / 6) {
      [r1, g1, b1] = [x, 0, c];
    } else {
      [r1, g1, b1] = [c, 0, x];
    }
    r = Math.round((r1 + m) * 255);
    g = Math.round((g1 + m) * 255);
    b = Math.round((b1 + m) * 255);
  }
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

export function getComplementaryColors(color) {
  const colors = {
    primary: color,
    secondary: getComplementaryColor(color),
    accent1: getAnalogousColor(color, 1),
    accent2: getAnalogousColor(color, 2),
    accent3: getAnalogousColor(color, 3),
    neutral1: getNeutralColor(color, 1),
    neutral2: getNeutralColor(color, 2),
    neutral3: getNeutralColor(color, 3),
  };

  return colors;
}

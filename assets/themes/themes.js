export const themes = {
  standard: {
    name: "Классическая",
    path: "/assets/themes/standard/",
    backgroundImgPath: "assets/themes/standard/bg.png",
    colors: {
      black: "#000000",
      white: "#ffffff",
      background: "#ffffff",
      text: "#8b8b8b",
      accent1: "#FF652F",
      accent2: "#FFE400",
      accent3: "#14A76C",
    },
  },
  dark: {
    name: "Тёмная",
    path: "/assets/themes/dark/",
    backgroundImgPath: "assets/themes/dark/bg.png",
    colors: {
      black: "#000000",
      white: "#ffffff",
      background: "#272727",
      text: "#747474",
      accent1: "#FF652F",
      accent2: "#FFE400",
      accent3: "#14A76C",
    },
  },
};

export function initTheme(e) {
  const savedTheme = localStorage.getItem("color-theme") || "standard";

  const themeName = e?.target?.value || savedTheme;

  const theme = themes[themeName];

  localStorage.setItem("color-theme", themeName);

  document.body.style.background = `url(${theme.backgroundImgPath}) ${theme.colors.background} no-repeat center center`;
}

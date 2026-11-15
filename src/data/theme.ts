/** Clave de localStorage con el modo elegido por el visitante ("light" | "dark"). */
export const THEME_KEY = "kgm-theme";

/** Script que fija el modo guardado antes de pintar la página (evita el destello claro). */
export const themeInitScript = `try{var t=localStorage.getItem("${THEME_KEY}");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

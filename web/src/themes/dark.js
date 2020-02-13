import { createMuiTheme } from "@material-ui/core/styles";
import { deepPurple, green, orange, red } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    error: red,
    primary: deepPurple,
    secondary: orange,
    success: green
  },
  hero: {
    Ana: "#5f73a5",
    Ashe: "#55555a",
    Baptiste: "#4ba5c8",
    Bastion: "#697d69",
    Brigitte: "#b45f5a",
    Doomfist: "#6e413c",
    DVa: "#e67dbe",
    Genji: "#87f032",
    Hanzo: "#aaa578",
    Junkrat: "#e1af41",
    Lucio: "#73c341",
    McCree: "#a0464b",
    Mei: "#5a96e6",
    Mercy: "#e6e6af",
    Moira: "#692d41",
    Orisa: "#377d32",
    Pharah: "#2d64b9",
    Reaper: "#692d41",
    Reinhardt: "#829196",
    Roadhog: "#a57841",
    Sigma: "#829196",
    Soldier_76: "#5a6484",
    Sombra: "#5f41aa",
    Symmetra: "#7dafc3",
    Torbjorn: "#af5f5a",
    Tracer: "#cd8232",
    Widowmaker: "#8c5096",
    Winston: "#8c91af",
    Wrecking_Ball: "#d27d32",
    Zarya: "#e164aa",
    Zenyatta: "#e6e16e"
  }
});

export default theme;

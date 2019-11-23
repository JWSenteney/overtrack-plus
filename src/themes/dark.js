import { createMuiTheme } from "@material-ui/core/styles";
import { deepPurple, orange } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: { type: "dark", primary: deepPurple, secondary: orange }
});

export default theme;

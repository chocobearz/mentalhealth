import { createMuiTheme } from '@material-ui/core/styles';
import {colors} from './colors';

export const myTheme = createMuiTheme({
  palette: {
    primary: {
      main: colors.mediumPurple,
    },
    secondary: {
      main: colors.lightPink,
    },
  },
});
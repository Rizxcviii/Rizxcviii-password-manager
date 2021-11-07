export const theme = Theme => ({
  fontSizes: [0, 10, 12, 14, 16, 20, 24, 34, 48, 60, 96],
  space: [0, 4, 8, 16, 24, 32, 64, 128, 256, 512],
  colors: {
    primary: "teal",
    text: "dark",
    background: "light",
    light: "#FEFFFF",
    dark: "#000000",
    lightBlue: "#DEF2F1",
    teal: "#3AAFA9",
    error: "#B74343",
    grey: "#cccccc"
  },
  text: {
    default: {
      fontFamily: "Centra",
      fontSize: 3,
      fontWeight: 300
    },
    paragraph: {
      fontFamily: "Centra",
      fontSize: 3,
      fontWeight: 300
    },
    heading: {
      fontFamily: "Centra",
      fontSize: 6,
      fontWeight: "bold"
    }
  },
  buttons: {
    primary: {
      color: "light",
      fontFamily: "Centra",
      fontWeight: 400,
      "&:hover": {
        cursor: "pointer"
      },
      background: "teal",
      boxShadow:
        "rgb(0 0 0 / 20%) 0px 2px 1px -1px, rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px;",
      disabled: {
        opacity: 0.5,
        fontFamily: "Centra",
        fontWeight: 400
      }
    },
    nav: {
      color: "dark",
      background: "lightblue",
      "&:hover": {
        cursor: "pointer"
      },
      fontFamily: "Centra"
    },
    outline: {
      primary: {
        color: "primary",
        fontFamily: "Centra",
        fontWeight: 400,
        "&:hover": {
          cursor: "pointer"
        },
        background: "white",
        boxShadow:
          "rgb(0 0 0 / 20%) 0px 2px 1px -1px, rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px;",
        border: "2px solid #3AAFA9"
      }
    },
    icon: {
      "&:hover": {
        cursor: "pointer"
      }
    }
  },
  alerts: {
    primary: {
      background: "primary",
      color: "light",
      fontFamily: "Centra"
    },
    success: {
      background: "primary",
      color: "light",
      fontFamily: "Centra"
    },
    error: {
      bg: "error",
      color: "light",
      fontFamily: "Centra"
    }
  }
})

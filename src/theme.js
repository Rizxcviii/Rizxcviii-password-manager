export const theme = Theme => ({
  fontSizes: [0, 10, 12, 14, 16, 20, 24, 34, 48, 60, 96],
  space: [0, 4, 8, 16, 24, 32, 64, 128, 256, 512],
  colors: {
    text: "#teal",
    background: "lightBlue.0",
    light: "#FEFFFF",
    dark: "#000000",
    lightBlue: [
      "#DEF2F1",
      "#e1f3f2",
      "#e4f2f3",
      "#e7f5f5",
      "#ebf7f6",
      "#eef8f8",
      "#f1f9f9"
    ],
    teal: "#3AAFA9"
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
    }
  },
  buttons: {
    primary: {
      color: "text",
      background: "lightblue",
      "&:hover": {
        cursor: "pointer"
      }
    }
  }
})

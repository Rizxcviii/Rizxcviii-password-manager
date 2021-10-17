import React from "react"
import { Provider as StoreProvider } from "react-redux"
import { hydrate } from "react-dom"
import { ThemeProvider, createGlobalStyle } from "styled-components"
import { ClientRouter } from "@engaging-tech/routing"
import { Themes, Utils } from "@engaging-tech/components"
import { useSSR } from "react-i18next"
import { PersistGate } from "redux-persist/integration/react"

import "./locales/i18n"

import App from "./App"
import initilializeRedux from "./store"

const { store, persistor } = initilializeRedux()

/* eslint-disable import/no-dynamic-require */
const woffIcons = require(`${process.env.RAZZLE_PUBLIC_DIR}/fonts/EngagingTechIcons.woff`)
const ttfIcons = require(`${process.env.RAZZLE_PUBLIC_DIR}/fonts/EngagingTechIcons.ttf`)
/* eslint-enable import/no-dynamic-require */

const tiemposWoff = require(`${process.env.RAZZLE_PUBLIC_DIR}/fonts/tiempos-text-web-bold.woff`)
const tiemposWoff2 = require(`${process.env.RAZZLE_PUBLIC_DIR}/fonts/tiempos-text-web-bold.woff2`)
const centraWoff = require(`${process.env.RAZZLE_PUBLIC_DIR}/fonts/CentraNo2-Book.woff`)
const centraWoff2 = require(`${process.env.RAZZLE_PUBLIC_DIR}/fonts/CentraNo2-Book.woff2`)
const centraBoldWoff = require(`${process.env.RAZZLE_PUBLIC_DIR}/fonts/CentraNo2-Bold.woff`)
const centraBoldWoff2 = require(`${process.env.RAZZLE_PUBLIC_DIR}/fonts/CentraNo2-Bold.woff2`)
const centraLightWoff = require(`${process.env.RAZZLE_PUBLIC_DIR}/fonts/CentraNo2-Light.woff`)
const centraLightWoff2 = require(`${process.env.RAZZLE_PUBLIC_DIR}/fonts/CentraNo2-Light.woff2`)

const GlobalStyles = createGlobalStyle`

  @font-face {
   font-family: "Centra";
   src: url(${centraWoff}) format("woff"),
        url(${centraWoff2}) format("woff2");
        
   font-weight: 400;
   font-style: normal;
  }
  @font-face {
   font-family: "Centra";
   src: url(${centraBoldWoff}) format("woff"),
        url(${centraBoldWoff2}) format("woff2");
        
   font-weight: 700;
   font-style: normal;
  }
  @font-face {
   font-family: "Centra";
   src: url(${centraLightWoff}) format("woff"),
        url(${centraLightWoff2}) format("woff2");
        
   font-weight: 300;
   font-style: normal;
  }

  @font-face {
   font-family: "Tiempos";
   src: url(${tiemposWoff}) format("woff"),
        url(${tiemposWoff2}) format("woff2");
        
   font-weight: 400;
   font-style: normal;
  }
  @font-face {
    font-family: "EngagingTechIcons";
    font-style: normal;
    font-weight: 400;
    src: 
      url(${woffIcons}) format("woff"),
      url(${ttfIcons}) format("truetype");
  }

  * {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    margin-right: ${Utils.measureScrollbarWidth()}px !important;
  }

  a {
    color: inherit;
    text-decoration: inherit;
  }

  html {
    width: 100vw;
    background-color: rgb(255, 255, 255);
  }
  
  /* #fc_frame {
    left: calc(100vw - 100px);
    top: calc(100vh - 100px);
  } */
`
const BaseApp = () => {
  useSSR(window.initialI18nStore, window.initialLanguage)
  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ClientRouter>
          <ThemeProvider theme={Themes.workL}>
            <GlobalStyles />
            <App />
          </ThemeProvider>
        </ClientRouter>
      </PersistGate>
    </StoreProvider>
  )
}
hydrate(<BaseApp />, document.getElementById("root"))

if (module.hot) {
  module.hot.accept()
}

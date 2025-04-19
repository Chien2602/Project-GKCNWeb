"use client"

import ThemeProvider from "../theme-provider"
import NoteUI from "./note-ui"

function NoteUITheme() {
  return (
    <ThemeProvider>
      <NoteUI />
    </ThemeProvider>
  )
}

export default NoteUITheme
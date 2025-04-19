"use client"

import ThemeProvider from "../ThemeProvider"
import NoteUI from "./NoteUI"

function NoteUITheme() {
  return (
    <ThemeProvider>
      <NoteUI />
    </ThemeProvider>
  )
}

export default NoteUITheme
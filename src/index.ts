import { boyerMoore } from "./boyer-moore"
import fs from "fs"
import path from "path"

// Lê um arquvio de texto
const file = path.join(__dirname, "./input.txt")
const input = fs.readFileSync(file, {
    encoding: "utf-8", flag: "r"
})



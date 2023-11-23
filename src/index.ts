import { boyerMoore } from "./boyer-moore"
import fs from "fs"
import path from "path"

// path.join(__dirname, "./input.txt")
const file = path.join(__dirname, "./input.txt")

const input = fs.readFileSync(file, {
    encoding: "utf-8", flag: "r"
})
console.log(input)
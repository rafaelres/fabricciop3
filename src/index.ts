import { boyerMoore } from "./boyer-moore"
import fs, { read } from "fs"
import path from "path"

// Lê um arquivo de texto
const wordResult = {}
const readWords: string[] = []
const file = path.join(__dirname, "./input.txt")
const input = fs.readFileSync(file, {
    encoding: "utf-8", flag: "r"
})
const words = input.match(/\p{L}+|[.,!?;]/gu)



words?.forEach((word) => {
    if (readWords.includes(word)) return
    readWords.push(word)
    const searchResult = boyerMoore(word, input)
    wordResult[word] = searchResult.length
})


console.log(wordResult)



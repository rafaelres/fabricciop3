/*
P.3.8. Desenvolva um programa que leia um arquivo de texto e armazene cada palavra em um
array. A seguir, utilizando o algoritmo de Boyer-Moore, determina, para cada palavra existente
no arquivo, o número de ocorrências dessa palavra ao longo do texto. Não ignore os
caracteres de pontuação.
Exemplo de conteúdo do arquivo de texto:
Eu gosto muito de Matemática. Eu Amo Matemática.
Saída: {Eu:2, gosto: 1, muito:1, de: 1, Matemática: 2, ‘.’:2}

P.3.9. Repita o Problema 3.8 mas armazenando os dados do arquivo de texto em uma única
variável do tipo string. 
*/

import { boyerMoore } from "./boyer-moore"
import fs from "fs"
import path from "path"

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



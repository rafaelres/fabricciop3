/*
  P.3.8.
  Desenvolva um programa que leia um arquivo de texto e armazene cada palavra em um array.
  A seguir, utilizando o algoritmo de Boyer-Moore, determina, para cada palavra existente no arquivo, o número de ocorrências dessa palavra ao longo do texto.
  Não ignore os caracteres de pontuação.

  Exemplo:
    Entrada: Eu gosto muito de Matemática. Eu Amo Matemática.
    Saída: { Eu: 2, gosto: 1, muito:1, de: 1, `Matemática`: 2, `.`:2}

  P.3.9.
  Repita o Problema 3.8 mas armazenando os dados do arquivo de texto em uma única variável do tipo string.
*/

import { boyerMoore } from "./boyer-moore"
import fs from "fs"
import path from "path"

// Objeto que armazena o resultado final
const wordResult: Record<string, number> = {}

// Lista de palavras já lidas, para não executar o algoritmo de Boyer-Moore mais de uma vez para a mesma palavra
const readWords: string[] = []

// Encontra o caminho absoluto do arquivo de texto
const filePath: string = path.join(__dirname, "./input.txt")

// Lê o conteúdo do arquivo e armazena em uma variável do tipo string
const text: string = fs.readFileSync(filePath, { encoding: "utf-8" })

// Separa todas as palavras presentes no texto, incluindo as pontuações
const words = text.match(/\p{L}+|[.,!?;]/gu)

words?.forEach((word) => {
  // Se a palavra já foi lida, interrompe a execução
  if (readWords.includes(word)) {
    return
  }

  // Se a palavra já foi lida, adiciona ela ao array de palavras lidas
  readWords.push(word)

  // Executa o algoritmo de Boyer-Moore para encontrar os indicies de ocorrência da palavra dentro do texto
  const searchResult = boyerMoore(word, text)

  // Adiciona a palavra e o número de ocorrências no objeto de resultado
  wordResult[word] = searchResult.length
})

console.log(wordResult)

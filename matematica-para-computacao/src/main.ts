/**
 * Em sistemas modernos de processamento de linguagem natural, é comum que o texto de entrada seja pré-processado e, com base em algumas estatísticas de ocorrência de palavras, ele seja convertido em outro eliminando-se elementos com pouco ou nenhum significado.
 *
 * Faça um sistema que, dado um texto de entrada (txt), gere um gráfico onde o eixo das abscissas corresponda a uma palavra e o eixo das ordenadas corresponda ao número de vezes que essa palavra aparece no texto.
 *
 * Em termos de probabilidade, esse gráfico associa a uma dada palavra sua probabilidade de ocorrência no texto (função distribuição de probabilidade) e serve para que sejam selecionadas as chamadas stop words (palavras muito frequentes e com baixo significado).
 *
 * Ilustre a execução desse sistema para um texto de entrada arbitrário (.txt) fornecido pelo usuário.
 *
 * Não esqueça de converter todos os caracteres para minúsculo e efetuar a remoção de caracteres tais como pontos, etc.
 */

import Chart from "chart.js/auto"

const chartEl = document.getElementById("chart") as HTMLCanvasElement
const inputEl = document.getElementById("input") as HTMLInputElement

const chart = new Chart(chartEl, {
  type: "bar",
  data: {
    labels: [] as string[],
    datasets: [
      {
        label: "Distribuição de Frequência de Palavras",
        data: [] as number[]
      }
    ]
  }
})

const preProcess = (text: string) => {
  return text.toLowerCase()
}

const countWords = (words: string[]): Record<string, number> => {
  const wordsMap = new Map<string, number>()

  words.forEach((word) => {
    const count = wordsMap.get(word) || 0

    wordsMap.set(word, count + 1)
  })

  return Object.fromEntries(wordsMap)
}

inputEl.onchange = async (event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.item(0)

  input.value = ""

  if (!file) return

  const text = await file.text()
  const words = text.match(/\p{L}+/gu)

  if (!words) return

  const processed = words.map((word) => preProcess(word))

  const wordCount = countWords(processed)

  const data = Object.entries(wordCount)
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count)

  chart.data.labels = data.map((row) => row.word)
  chart.data.datasets[0].data = data.map((row) => row.count)

  chart.update()
}

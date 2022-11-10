<template>
  <div class="flex flex-col p-5">
    <label for="message" class="block mb-2 text-2xl font-medium text-gray-900 text-center"
      >Georgian SMS Translation</label
    >
    <textarea
      v-model="message"
      placeholder="SMS translitereted text"
      rows="10"
      class="block p-2.5 w-full text-xl text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
    ></textarea>
    <div class="flex gap-2 justify-center">
      <button
        class="mt-2 py-2.5 px-4 text-md font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800"
        @click="paste"
      >
        Paste from clipboard
      </button>
      <button
        class="mt-2 py-2.5 px-4 text-md font-medium text-center text-white bg-orange-500 rounded-lg hover:bg-orange-600 disabled:bg-gray-400"
        @click="translate"
      >
        Translate
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// https://en.wikipedia.org/wiki/Romanization_of_Georgian
const GE_NATIONAL_SYSTEM_2002 = {
  a: 'ა',
  b: 'ბ',
  g: 'გ',
  d: 'დ',
  e: 'ე',
  v: 'ვ',
  z: 'ზ',
  t: 'თ',
  i: 'ი',
  "k'": 'კ',
  l: 'ლ',
  m: 'მ',
  n: 'ნ',
  o: 'ო',
  "p'": 'პ',
  zh: 'ჟ',
  r: 'რ',
  s: 'ს',
  "t'": 'ტ',
  u: 'უ',
  p: 'ფ',
  k: 'ქ',
  gh: 'ღ',
  "q'": 'ყ',
  sh: 'შ',
  ch: 'ჩ',
  ts: 'ც',
  dz: 'ძ',
  "ts'": 'წ',
  "ch'": 'ჭ',
  kh: 'ხ',
  j: 'ჯ',
  h: 'ჰ',
}

const GE_UNOFFICIAL_SYSTEM = {
  c: 'ც',
  x: 'ხ',
  y: 'ყ',
  f: 'ფ',
  w: 'წ',
}

const message = ref('')
let tranliterationMap = null

const createTransliterationMapSortedByPriory = () => {
  tranliterationMap = new Map([
    ...Object.entries(GE_NATIONAL_SYSTEM_2002).sort((a, b) => {
      return b[0].length - a[0].length
    }),
    ...Object.entries(GE_UNOFFICIAL_SYSTEM),
  ])
}

createTransliterationMapSortedByPriory()

const convertTransliteratedSMS = (value) => {
  let str = value.toLowerCase()
  for (const [key, value] of tranliterationMap) {
    str = str.replaceAll(key, value)
  }

  return str
}

const translate = async () => {
  const str = convertTransliteratedSMS(message.value)
  location.href = `https://translate.google.com/?hl=en&sl=ka&tl=en&text=${str}&op=translate`
}

const paste = async () => {
  message.value = await navigator.clipboard.readText()
}
</script>

<template>
  <div class="flex flex-col p-5">
    <div class="mb-2 text-2xl font-medium text-gray-900 text-center">SMS Translation</div>
    <div class="flex justify-center">
      <div class="flex text-md font-medium text-gray-900 items-center">From</div>
      <button
        class="m-2 p-2 text-md font-medium text-center text-black rounded-lg border-2 border-black"
        :class="{ 'bg-orange-400': currentLang === LANG.GE }"
        @click="setLang(LANG.GE)"
      >
        Georgian 🇬🇪
      </button>
      <button
        class="m-2 p-2 text-md font-medium text-center text-black rounded-lg border-2 border-black"
        :class="{ 'bg-orange-400': currentLang === LANG.AM }"
        @click="setLang(LANG.AM)"
      >
        Armenian 🇦🇲
      </button>
      <button
        class="m-2 p-2 text-md font-medium text-center text-black rounded-lg border-2 border-black"
        :class="{ 'bg-orange-400': currentLang === LANG.KZ }"
        @click="setLang(LANG.KZ)"
      >
        Kazakh 🇰🇿
      </button>
    </div>
    <textarea
      v-model="message"
      placeholder="SMS transliterated text"
      rows="10"
      class="block p-2.5 w-full text-xl text-gray-900 bg-gray-50 rounded-lg border-2 border-gray-300"
    ></textarea>
    <div class="flex gap-2 justify-center">
      <button
        class="mt-2 p-2 text-md font-medium text-center text-black bg-pink-400 rounded-lg hover:bg-pink-500 border-2 border-black"
        @click="message = ''"
      >
        Clear
      </button>
      <button
        class="mt-2 p-2 text-md font-medium text-center text-black bg-orange-400 rounded-lg hover:bg-orange-500 disabled:bg-gray-400 border-2 border-black"
        @click="translate"
      >
        Translate
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const LANG = {
  GE: 'ka',
  AM: 'hy',
  KZ: 'kk',
}

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

// https://en.wikipedia.org/wiki/Romanization_of_Armenian
const AM_ASCII_SYSTEM = {
  a: 'ա',
  b: 'բ',
  g: 'գ',
  d: 'դ',
  e: 'ե',
  z: 'զ',
  "e'": 'է',
  "y'": 'ը',
  "t'": 'թ',
  zh: 'ժ',
  i: 'ի',
  l: 'լ',
  x: 'խ',
  "c'": 'ծ',
  k: 'կ',
  h: 'հ',
  dz: 'ձ',
  gh: 'ղ',
  tw: 'ճ',
  m: 'մ',
  y: 'յ',
  n: 'ն',
  sh: 'շ',
  vo: 'ո',
  ch: 'չ',
  p: 'պ',
  j: 'ջ',
  rr: 'ռ',
  s: 'ս',
  v: 'վ',
  t: 'տ',
  r: 'ր',
  c: 'ց',
  w: 'ւ',
  "p'": 'փ',
  "k'": 'ք',
  o: 'օ',
  f: 'ֆ',
  u: 'ու',
  ev: 'և',
}

// https://en.wikipedia.org/wiki/Kazakh_alphabets
const KZ_NATIONAL_SYSTEM = {
  a: 'a',
  "a'": 'ә',
  b: 'б',
  v: 'в',
  g: 'г',
  "g'": 'ғ',
  d: 'д',
  e: 'е',
  yo: 'ё',
  j: 'ж',
  z: 'з',
  "i'": 'и',
  y: 'й',
  k: 'к',
  q: 'қ',
  l: 'л',
  m: 'м',
  n: 'н',
  "n'": 'ң',
  o: 'о',
  "o'": 'ө',
  p: 'п',
  r: 'р',
  s: 'с',
  t: 'т',
  "y'": 'у',
  w: 'у',
  u: 'ұ',
  f: 'ф',
  x: 'х',
  h: 'һ',
  c: 'ц',
  "c'": 'ч',
  "s'": 'ш',
  shch: 'щ',
  i: 'і',
  yu: 'ю',
  ya: 'я',
}

const message = ref('')
let currentLang = ref(LANG.GE)

let transliterationMapGe = new Map([
  ...Object.entries(GE_NATIONAL_SYSTEM_2002).sort((a, b) => {
    return b[0].length - a[0].length
  }),
  ...Object.entries(GE_UNOFFICIAL_SYSTEM),
])

let transliterationMapAm = new Map([
  ...Object.entries(AM_ASCII_SYSTEM).sort((a, b) => {
    return b[0].length - a[0].length
  }),
])

let transliterationMapKz = new Map([
  ...Object.entries(KZ_NATIONAL_SYSTEM).sort((a, b) => {
    return b[0].length - a[0].length
  }),
])

const setLang = (lang) => {
  currentLang.value = lang
}

const convertTransliteratedSMS = (value, lang) => {
  let transliterationMap = null
  switch (lang) {
    case LANG.GE:
      transliterationMap = transliterationMapGe
      break
    case LANG.AM:
      transliterationMap = transliterationMapAm
      break
    case LANG.KZ:
      transliterationMap = transliterationMapKz
      break
  }
  let str = value.toLowerCase()
  for (const [key, value] of transliterationMap) {
    str = str.replaceAll(key, value)
  }

  return str
}

const translate = async () => {
  const str = convertTransliteratedSMS(message.value, currentLang.value)
  location.href = `https://translate.google.com/?sl=${currentLang.value}&tl=en&text=${str}&op=translate`
}
</script>

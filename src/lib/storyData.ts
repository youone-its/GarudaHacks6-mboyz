export interface StoryChapter {
  id: number;
  title: string;
  caption: string;
  audioSrc: string;
  animationSrc: string;
}

export const storyChapters: StoryChapter[] = [
  {
    id: 1,
    title: "Perkenalan",
    caption: "Hai, nama ku Yazid. Aku adalah pemuda dari masyarakat Indonesia.",
    audioSrc: "/audio/audio1.m4a",
    animationSrc: "/animations/scene1.png"
  },
  {
    id: 2,
    title: "Mengikuti Trend",
    caption: "Seperti banyak anak muda lainnya, aku suka mengikuti trend zaman sekarang — dari media sosial, fashion, sampai challenge viral.",
    audioSrc: "/audio/audio2.m4a",
    animationSrc: "/animations/scene2.png"
  },
  {
    id: 3,
    title: "Kesadaran",
    caption: "Tapi lama-lama, aku sadar — aku tahu banyak tentang budaya luar, tapi hampir nggak tahu apa-apa tentang budaya Indonesia sendiri.",
    audioSrc: "/audio/audio3.m4a",
    animationSrc: "/animations/scene3.png"
  },
  {
    id: 4,
    title: "Pertanyaan",
    caption: "Aku jadi bertanya, \"Kenapa aku tahu nama-nama kota di luar negeri, tapi nggak tahu nama tarian daerah dari tanah kelahiranku?\"",
    audioSrc: "/audio/audio4.m4a",
    animationSrc: "/animations/scene4.png"
  },
  {
    id: 5,
    title: "Perasaan Kosong",
    caption: "Aku merasa kosong. Seolah ada bagian dari diriku yang hilang... Hingga akhirnya,",
    audioSrc: "/audio/audio5.m4a",
    animationSrc: "/animations/scene5.png"
  },
  {
    id: 6,
    title: "Menemukan NusaLoka",
    caption: "aku menemukan aplikasi NusaLoka.",
    audioSrc: "/audio/audio6.m4a",
    animationSrc: "/animations/scene6.png"
  },
  {
    id: 7,
    title: "Transformasi",
    caption: "Dalam sebulan memakai aplikasi ini, aku jadi lebih paham dan bangga dengan budaya Indonesia — dari wayang, musik tradisional, sampai kuliner khas daerah.",
    audioSrc: "/audio/audio7.m4a",
    animationSrc: "/animations/scene7.png"
  },
  {
    id: 8,
    title: "Ajakan",
    caption: "Kamu pun bisa seperti aku. Yuk, kenali budaya kita sendiri dengan cara yang asyik dan menyenangkan — bareng NusaLoka! 🇮🇩✨",
    audioSrc: "/audio/audio8.m4a",
    animationSrc: "/animations/scene8.png"
  }
];
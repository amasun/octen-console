const navData = [
  {
    category: "WORKSPACE",
    items: [
      { id: "overview", label: "Overview", isActive: true, svg: `<svg fill="none" viewBox="0 0 18 18" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M16 16H2M6.66667 12.6667V5.33333C6.66667 4.96515 6.36819 4.66667 6 4.66667H3.33333C2.96514 4.66667 2.66667 4.96515 2.66667 5.33333V12.6667C2.66667 13.0349 2.96514 13.3333 3.33333 13.3333H6C6.36819 13.3333 6.66667 13.0349 6.66667 12.6667ZM15.3333 12.6667V8.66667C15.3333 8.29848 15.0349 8 14.6667 8H12C11.6318 8 11.3333 8.29848 11.3333 8.66667V12.6667C11.3333 13.0349 11.6318 13.3333 12 13.3333H14.6667C15.0349 13.3333 15.3333 13.0349 15.3333 12.6667ZM11 12.6667V2C11 1.63181 10.7015 1.33333 10.3333 1.33333H7.66667C7.29848 1.33333 7 1.63181 7 2V12.6667C7 13.0349 7.29848 13.3333 7.66667 13.3333H10.3333C10.7015 13.3333 11 13.0349 11 12.6667Z" stroke="currentColor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/></svg>` },
      { id: "api-keys", label: "API Keys", svg: `<svg fill="none" viewBox="0 0 18 18" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M12.6667 5.33333C12.6667 6.80609 11.4728 8 10 8C8.52724 8 7.33333 6.80609 7.33333 5.33333C7.33333 3.86057 8.52724 2.66667 10 2.66667C11.4728 2.66667 12.6667 5.33333 12.6667 5.33333ZM12.6667 5.33333H15.3333M10 8V16M7.33333 11.3333H12.6667M8.66667 14H11.3333" stroke="currentColor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/></svg>` },
      { id: "billing", label: "Billing", svg: `<svg fill="none" viewBox="0 0 18 18" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M12.6667 3.33333H5.33333C4.22876 3.33333 3.33333 4.22876 3.33333 5.33333V12.6667C3.33333 13.7712 4.22876 14.6667 5.33333 14.6667H12.6667C13.7712 14.6667 14.6667 13.7712 14.6667 12.6667V5.33333C14.6667 4.22876 13.7712 3.33333 12.6667 3.33333Z" stroke="currentColor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/><path d="M3.33333 7.33333H14.6667M6.66667 11.3333H8" stroke="currentColor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/></svg>` }
    ]
  },
  {
    category: "APPLICATION",
    items: [
      { id: "answer", label: "Answer", svg: `<svg fill="none" viewBox="0 0 18 18" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M15.75 8.99991C15.75 12.7278 12.7279 15.7499 9 15.7499C8.36199 15.7499 7.7447 15.6614 7.15949 15.4952L3.6338 16.357C3.12328 16.4817 2.65178 16.0102 2.77651 15.4997L3.63821 11.974C3.47215 11.3888 3.38354 10.7715 3.38354 10.1334C3.38354 6.40552 6.40561 3.38342 10.1335 3.38342M13.4394 6.75001C13.8291 7.2348 14.0625 7.84496 14.0625 8.50495C14.0625 10.0246 12.8305 11.2566 11.3109 11.2566C10.749 11.2566 10.2263 11.0886 9.78912 10.803L7.75545 11.3343C7.57599 11.3812 7.4101 11.2153 7.45706 11.0359L7.98845 9.00216C7.70284 8.56502 7.53482 8.04238 7.53482 7.48041C7.53482 5.96078 8.76686 4.72876 10.2865 4.72876C10.9465 4.72876 11.5566 4.96214 12.0414 5.35186" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>` },
      { id: "deep-research", label: "Deep Research", svg: `<svg fill="none" viewBox="0 0 18 18" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M5.24996 9.00004L8.24996 12L12.75 7.50004M15.75 9.00004C15.75 12.728 12.7279 15.75 8.99996 15.75C5.27204 15.75 2.24996 12.728 2.24996 9.00004C2.24996 5.27212 5.27204 2.25004 8.99996 2.25004C12.7279 2.25004 15.75 5.27212 15.75 9.00004Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>` }
    ]
  },
  {
    category: "API",
    items: [
      { id: "model", label: "Model Gateway", svg: `<svg fill="none" viewBox="0 0 18 18" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M15.75 8.99991V5.99242C15.7495 5.73073 15.68 5.47379 15.5482 5.24765C15.4166 5.02152 15.2274 4.83419 15 4.70467L9.74997 1.69868C9.52146 1.56846 9.26298 1.5 9 1.5C8.73697 1.5 8.47852 1.56846 8.25 1.69868L3 4.70467C2.53575 4.97092 2.25 5.46217 2.25 5.99317V12.0066C2.25 12.5384 2.53575 13.0289 3 13.2944L8.25 16.3004C8.715 16.5659 9.28503 16.5659 9.74997 16.3004M9 16.4999V8.99991M9 8.99991L15.5475 5.21993M9 8.99991L2.4525 5.21993" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.89 11.2396C15.2515 11.0572 16.503 12.0132 16.6856 13.3747C16.7683 13.9915 16.6168 14.5855 16.3004 15.068L17.114 16.1235C17.3252 16.3973 17.2743 16.7904 17.0006 17.0017C16.7266 17.2127 16.3336 17.162 16.1224 16.8881L15.3694 15.9111C15.1205 16.0407 14.8451 16.1309 14.5507 16.1703C13.1891 16.3525 11.9381 15.3968 11.7557 14.0353C11.5734 12.6739 12.5286 11.4222 13.89 11.2396ZM14.0569 12.4811C13.3811 12.5717 12.906 13.1932 12.9965 13.869C13.087 14.5449 13.7084 15.0192 14.3843 14.9289C15.0603 14.8383 15.5347 14.2169 15.4442 13.5409C15.3535 12.8653 14.7326 12.3908 14.0569 12.4811Z" fill="currentColor"/></svg>` },
      { id: "web-search", label: "Broad Search", svg: `<svg fill="none" viewBox="0 0 18 18" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M8.25 14.25C11.5637 14.25 14.25 11.5637 14.25 8.25C14.25 4.93629 11.5637 2.25 8.25 2.25C4.93629 2.25 2.25 4.93629 2.25 8.25C2.25 11.5637 4.93629 14.25 8.25 14.25Z" stroke="currentColor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/><path d="M15.75 15.75L12.4875 12.4875" stroke="currentColor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/></svg>` },
      { id: "news-search", label: "Web Search", svg: `<svg fill="none" viewBox="0 0 18 18" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M12.75 5.25H2.25C1.83579 5.25 1.5 5.58579 1.5 6V14.25C1.5 14.6642 1.83579 15 2.25 15H12.75C13.1642 15 13.5 14.6642 13.5 14.25V6C13.5 5.58579 13.1642 5.25 12.75 5.25Z" stroke="currentColor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/><path d="M16.5 12.75V3.75C16.5 3.33579 16.1642 3 15.75 3H5.25" stroke="currentColor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/></svg>` },
      { id: "image-search", label: "Image Search", svg: `<svg fill="none" viewBox="0 0 18 18" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M14.25 2.25H3.75C2.92157 2.25 2.25 2.92157 2.25 3.75V14.25C2.25 15.0784 2.92157 15.75 3.75 15.75H14.25C15.0784 15.75 15.75 15.0784 15.75 14.25V3.75C15.75 2.92157 15.0784 2.25 14.25 2.25Z" stroke="currentColor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.375 7.125C6.78921 7.125 7.125 6.78921 7.125 6.375C7.125 5.96079 6.78921 5.625 6.375 5.625C5.96079 5.625 5.625 5.96079 5.625 6.375C5.625 6.78921 5.96079 7.125 6.375 7.125Z" stroke="currentColor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/><path d="M15.75 11.25L11.25 6.75L2.25 15.75" stroke="currentColor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/></svg>` },
      { id: "video-search", label: "Video Search", svg: `<svg fill="none" viewBox="0 0 18 18" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M11.25 3.75H2.25C1.83579 3.75 1.5 4.08579 1.5 4.5V13.5C1.5 13.9142 1.83579 14.25 2.25 14.25H11.25C11.6642 14.25 12 13.9142 12 13.5V4.5C12 4.08579 11.6642 3.75 11.25 3.75Z" stroke="currentColor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/><path d="M16.5 6L12 8.25V9.75L16.5 12V6Z" stroke="currentColor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/></svg>` },
      { id: "extract", label: "Extract", svg: `<svg fill="none" viewBox="0 0 18 18" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M15.75 8.99991C15.75 12.7278 12.7279 15.7499 9 15.7499C8.36199 15.7499 7.7447 15.6614 7.15949 15.4952L3.6338 16.357C3.12328 16.4817 2.65178 16.0102 2.77651 15.4997L3.63821 11.974C3.47215 11.3888 3.38354 10.7715 3.38354 10.1334C3.38354 6.40552 6.40561 3.38342 10.1335 3.38342C10.749 3.38342 11.345 3.46519 11.9126 3.61864" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M16.125 1.875L9 9M16.125 1.875V5.25M16.125 1.875H12.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>` }
    ]
  }
];

const overviewCardsData = {
  api: [
    {
      id: "web-search",
      title: "Broad Search",
      desc: "Get relevant snippets, metadata, and markdown text extracted from hundreds of web pages in milliseconds.",
      features: [
        { icon: `<svg class="w-3.5 h-3.5 mt-0.5 shrink-0 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>`, text: "Fastest web search available. Typical response under 500ms." }
      ]
    },
    {
      id: "news-search",
      title: "Web Search",
      desc: "Fast, accurate search APIs for building conversational agents, monitoring systems, and research tools.",
      features: [
        { icon: `<svg class="w-3.5 h-3.5 mt-0.5 shrink-0 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>`, text: "Get clean markdown content directly from URLs." }
      ]
    },
    {
      id: "image-search",
      title: "Image Search",
      desc: "Search for high-quality images across the web with strict safe-search filters and direct media URLs.",
      features: [
        { icon: `<svg class="w-3.5 h-3.5 mt-0.5 shrink-0 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>`, text: "Returns image dimensions, thumbnails, and source URLs." }
      ]
    },
    {
      id: "video-search",
      title: "Video Search",
      desc: "Find relevant video content with metadata including duration, view counts, and creator information.",
      features: [
        { icon: `<svg class="w-3.5 h-3.5 mt-0.5 shrink-0 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>`, text: "Integrated YouTube shorts and standard video indexing." }
      ]
    },
    {
      id: "extract",
      title: "Extract",
      desc: "Convert unstructured web pages into clean JSON data using natural language schemas.",
      features: [
        { icon: `<svg class="w-3.5 h-3.5 mt-0.5 shrink-0 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>`, text: "Works best for AI agents, RAG pipelines, and content monitoring." }
      ]
    },
    {
      id: "model",
      title: "Model Gateway",
      desc: "One API to call any LLM, with unified billing. Ready for production.",
      features: [
        { icon: `<svg class="w-3.5 h-3.5 mt-0.5 shrink-0 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>`, text: "OpenAI-compatible · Switch providers without rewriting code." }
      ]
    }
  ],
  app: [
    {
      id: "answer",
      title: "Answer",
      desc: "Experience Answer. Get structured answers assembled from dozens of queries in milliseconds."
    },
    {
      id: "deep-research",
      title: "Deep Research",
      desc: "Conduct thorough, multi-step research sessions. Synthesize information across hundreds of sources."
    }
  ]
};

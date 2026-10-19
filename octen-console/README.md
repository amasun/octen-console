<p align="center">
  <img src="./assets/readme/hero.svg" width="100%" alt="Octen Broad Search - A management console and interactive playground for configuring, testing, and managing Octen's multimodal search APIs.">
</p>

Octen Broad Search is an interactive console and management interface designed for configuring, testing, and monitoring multimodal search APIs.

## Why it is different

Most API management tools decouple configuration from execution. Broad Search connects them directly: adjusting domain filters, safesearch, or maximum sub-queries in the interface instantly updates the generated request payload. This allows you to evaluate search quality across modalities (web, image, video) in real time without writing boilerplate code.

## How it works

1. **Configuration**: Set queries, max results, time bases, and domain inclusions via the UI.
2. **Code Generation**: The console automatically produces equivalent `Python`, `JavaScript`, and `cURL` snippets.
3. **Execution & Evaluation**: Requests are executed directly from the browser, with the response rendered in an interactive JSON viewer.
4. **Management**: Organization owners can manage API keys, track cross-member usage, and set usage limits per key.

## Local Development

To run the console locally:

```bash
# Clone the repository
git clone https://github.com/octen-ai/octen-broad-search.git
cd octen-broad-search

# The console is a static HTML/JS application built with Tailwind CSS.
# You can use any static server to preview it.
npx serve .
```

Navigate to `http://localhost:3000` to interact with the interface.

## Project Structure

- `index.html` — The main console application, containing the layout, modal structures, and core UI elements.
- `css/styles.css` — Custom styling augmenting Tailwind.
- `js/broad-search-api.js` — Logic for the interactive API playground, payload generation, and JSON rendering.
- `js/syntax-highlight.js` — Syntax highlighting for generated code snippets.
- `js/core/sidebar.js` — Plan A modular sidebar integration using `OctenSidebar` component.
- `js/pages/overview/template.js` — Overview dashboard featuring the 6 capability panels (Search Ultra Fast, Search Fast, Search Premier, Models, Tools, Application) matching `https://octen.ai/platform/overview`.
- `octen-sidebar/` — Standalone sidebar design engineering suite for previewing and customizing the navigation structure (aligned to Figma Node 13717:172917).
  - Workspace: `Octen Family` organization switcher
  - Primary Nav: Overview, Search (Fast & Premier dual cards), MODELS, TOOLS, APPLICATION, MANAGEMENT
  - User footer: Cyrussun (`cyrussun@octen.ai`) account profile & theme switcher

## License

Internal proprietary software. All rights reserved.

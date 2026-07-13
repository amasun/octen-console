const fs = require('fs');

const content = fs.readFileSync('octen-console-prototype.html', 'utf8');

// 1. Get header + sidebar + start of main
const mainStartIdx = content.indexOf('<main');
const mainTagEndIdx = content.indexOf('>', mainStartIdx) + 1;
const part1 = content.substring(0, mainTagEndIdx);

// 2. Find page-broad-search and page-broad-search-api
function extractPage(id) {
    const startIdx = content.indexOf('<div id="' + id + '"');
    if (startIdx === -1) return '';
    let endIdx = startIdx;
    let depth = 0;
    while (endIdx < content.length) {
        const nextDiv = content.indexOf('<div', endIdx + 1);
        const nextClose = content.indexOf('</div', endIdx + 1);
        if (nextClose === -1) break;
        if (nextDiv !== -1 && nextDiv < nextClose) {
            depth++;
            endIdx = nextDiv;
        } else {
            depth--;
            endIdx = nextClose;
            if (depth === -1) {
                endIdx = content.indexOf('>', endIdx) + 1;
                break;
            }
        }
    }
    return content.substring(startIdx, endIdx);
}

const pageApi = extractPage('page-broad-search-api');
let pageApp = extractPage('page-broad-search');

// Make one of them active
pageApp = pageApp.replace('class="page"', 'class="page active"');

// 3. Get scripts at the end
const mainCloseIdx = content.lastIndexOf('</main>');
const part3 = content.substring(mainCloseIdx);

const newContent = part1 + '\n\n' + pageApi + '\n\n' + pageApp + '\n\n' + part3;

fs.writeFileSync('octen-broad-search.html', newContent);
console.log('Extracted to octen-broad-search.html');

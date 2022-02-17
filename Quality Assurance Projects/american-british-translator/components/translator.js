const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
    toBritishEnglish(text) {
        const dict = { ...americanOnly, ...americanToBritishSpelling };
        const titles = americanToBritishTitles;
        const timeRegex = /([1-9]|1[012]):[0-5][0-9]/g;
        const translated = this.translate(text, dict, titles, timeRegex, "toBritish");

        if (!translated) {
            return text;
        }
        return translated;
    }

    toAmericanEnglish(text) {
        const dict = { ...britishOnly, ...reverseDict(americanToBritishSpelling) };
        const titles = reverseDict(americanToBritishTitles);
        const timeRegex = /([1-9]|1[012]).[0-5][0-9]/g;
        const translated = this.translate(text, dict, titles, timeRegex, "toAmerican");

        if (!translated) {
            return text;
        }
        return translated;
    }

    translate(text, dict, titles, timeRegex, locale) {
        const lowerText = text.toLowerCase();
        const matchMap = {};

        // Search for titles and add them to matchMap
        Object.entries(titles).map(([k, v]) => {
            if (lowerText.includes(k)) {
                matchMap[k] = v.charAt(0).toUpperCase() + v.slice(1);
            }
        });

        // Filter words with spaces from current dictionary
        const wordsWithSpace = Object.fromEntries(
            Object.entries(dict).filter(([k, v]) => k.includes(" "))
        );

        // Search for spaced word matches and add them to matchMap
        Object.entries(wordsWithSpace).map(([k, v]) => {
            if (lowerText.includes(k)) {
                matchMap[k] = v;
            }
        });

        // Search for individual word matches and add them to matchMap
        lowerText.match(/(\w+([-'])(\w+)?['-]?(\w+))|\w+/g).forEach((word) => {
            if (dict[word]) matchMap[word] = dict[word];
        });

        // Search for time matches and add them to matchMap
        const matchedTimes = lowerText.match(timeRegex);

        if (matchedTimes) {
            matchedTimes.map((e) => {
                if (locale === "toBritish") {
                    return (matchMap[e] = e.replace(":", "."));
                }
                return (matchMap[e] = e.replace(".", ":"));
            });
        }

        // No matches
        if (Object.keys(matchMap).length === 0) return null;

        const translation = this.replaceAll(text, matchMap);
        const translationWithHighlight = this.replaceAllWithHighlight(text, matchMap);
        return [translation, translationWithHighlight];
    }

    replaceAll(text, matchMap) {
        const re = new RegExp(Object.keys(matchMap).join("|"), "gi");
        return text.replace(re, (matched) => matchMap[matched.toLowerCase()]);
    }

    replaceAllWithHighlight(text, matchMap) {
        const re = new RegExp(Object.keys(matchMap).join("|"), "gi");
        return text.replace(re, (matched) => {
            return `<span class="highlight">${matchMap[matched.toLowerCase()]}</span>`;
        });
    }
}

const reverseDict = (obj) => {
    return Object.assign(
      {},
      ...Object.entries(obj).map(([k, v]) => ({ [v]: k }))
    );
  };

module.exports = Translator;
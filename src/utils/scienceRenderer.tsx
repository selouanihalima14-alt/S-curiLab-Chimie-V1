import React from 'react';

/**
 * Beautifully renders math expressions, chemical formulas, superscripts, subscripts,
 * and standard mathematical notations in French science teaching.
 * It translates LaTeX delimiters ($...$) as well as common chemical expressions
 * to React elements utilizing real <sub> and <sup> tags for perfect pixel precision.
 */
export function renderScienceText(text: string): React.ReactNode {
  if (!text) return '';

  // Split by '$' to locate math zones (odd indices are math zones)
  const parts = text.split('$');

  return (
    <>
      {parts.map((part, index) => {
        const isMath = index % 2 === 1;

        if (!isMath) {
          // Normal text zone
          // Clean up standard chemical formulas even outside LaTeX, e.g., H2O, CO2, H+, etc.
          // and format simple arrow signs
          const cleanPart = part
            .replace(/⟶/g, ' ⟶ ')
            .replace(/->/g, ' ⟶ ')
            .replace(/⇄/g, ' ⇄ ')
            .replace(/<=>/g, ' ⇄ ');

          return <span key={index}>{cleanPart}</span>;
        }

        // Inside a Math zone (originally enclosed in '$')
        let mathStr = part;

        // Strip LaTeX \text{...} commands
        mathStr = mathStr.replace(/\\text\{([^}]+)\}/g, '$1');

        // Translate LaTeX symbols
        mathStr = mathStr.replace(/\\rightarrow/g, ' ⟶ ');
        mathStr = mathStr.replace(/\\longrightarrow/g, ' ⟶ ');
        mathStr = mathStr.replace(/\\rightleftharpoons/g, ' ⇄ ');
        mathStr = mathStr.replace(/\\leftrightarrow/g, ' ⇄ ');
        mathStr = mathStr.replace(/\\to/g, ' ⟶ ');
        mathStr = mathStr.replace(/\\cdot/g, ' · ');
        mathStr = mathStr.replace(/\\times/g, ' × ');
        mathStr = mathStr.replace(/\\pm/g, ' ± ');
        mathStr = mathStr.replace(/\\circ/g, '°');
        mathStr = mathStr.replace(/\\log_\{10\}/g, 'log₁₀');
        mathStr = mathStr.replace(/\\log/g, 'log');
        mathStr = mathStr.replace(/\\ln/g, 'ln');
        mathStr = mathStr.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '$1 / $2');

        // Parse superscripts and subscripts manually to generate real <sub> and <sup> tags
        const elements: React.ReactNode[] = [];
        let i = 0;
        let keyCounter = 0;

        while (i < mathStr.length) {
          const char = mathStr[i];

          if (char === '_') {
            i++; // skip '_'
            let subText = '';
            if (mathStr[i] === '{') {
              i++; // skip '{'
              while (i < mathStr.length && mathStr[i] !== '}') {
                subText += mathStr[i];
                i++;
              }
              if (mathStr[i] === '}') i++;
            } else {
              subText = mathStr[i] || '';
              i++;
            }
            elements.push(
              <sub
                key={`sub-${index}-${keyCounter++}`}
                className="select-none inline-block text-[0.75em] leading-none translate-y-[0.15em]"
              >
                {subText}
              </sub>
            );
          } else if (char === '^') {
            i++; // skip '^'
            let supText = '';
            if (mathStr[i] === '{') {
              i++; // skip '{'
              while (i < mathStr.length && mathStr[i] !== '}') {
                supText += mathStr[i];
                i++;
              }
              if (mathStr[i] === '}') i++;
            } else {
              supText = mathStr[i] || '';
              i++;
            }
            elements.push(
              <sup
                key={`sup-${index}-${keyCounter++}`}
                className="select-none inline-block text-[0.75em] leading-none -translate-y-[0.15em]"
              >
                {supText}
              </sup>
            );
          } else {
            let regText = '';
            while (i < mathStr.length && mathStr[i] !== '_' && mathStr[i] !== '^') {
              regText += mathStr[i];
              i++;
            }
            elements.push(<span key={`txt-${index}-${keyCounter++}`}>{regText}</span>);
          }
        }

        return (
          <span key={index} className="font-semibold text-indigo-700 font-sans mx-0.5">
            {elements}
          </span>
        );
      })}
    </>
  );
}

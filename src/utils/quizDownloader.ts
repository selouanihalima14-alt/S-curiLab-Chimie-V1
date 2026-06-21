import { QuizQuestion } from '../constants';

interface DownloadOptions {
  includeAnswers: boolean;
  tpTitle: string;
}

export function downloadQuizAsHTML(questions: QuizQuestion[], options: DownloadOptions) {
  const { includeAnswers, tpTitle } = options;

  const questionsHTML = questions.map((q, qIndex) => {
    const optionsHTML = q.options.map((opt, oIndex) => {
      let optionPrefix = "▢";
      if (q.type === 'vrai_faux') {
        optionPrefix = "◯";
      }

      let badgeAnswer = "";
      if (includeAnswers) {
        if (oIndex === q.correctAnswer) {
          badgeAnswer = `<span class="correct-badge">✓ Correct</span>`;
        }
      }

      return `
        <div class="option-item ${includeAnswers && oIndex === q.correctAnswer ? 'correct-option' : ''}">
          <span class="option-marker">${optionPrefix}</span>
          <span class="option-text">${escapeHTML(opt)}</span>
          ${badgeAnswer}
        </div>
      `;
    }).join('');

    let pictogramHTML = "";
    if (q.pictogramUrl) {
      pictogramHTML = `
        <div class="pictogram-container">
          <img src="${q.pictogramUrl}" alt="${q.pictogramName || 'Pictogramme'}" />
          ${q.pictogramName ? `<p class="picto-name">${escapeHTML(q.pictogramName)}</p>` : ''}
        </div>
      `;
    }

    let explanationHTML = "";
    if (includeAnswers && q.explanation) {
      explanationHTML = `
        <div class="explanation-box">
          <strong class="explanation-title">💡 Explication :</strong>
          <span class="explanation-text">${escapeHTML(q.explanation)}</span>
        </div>
      `;
    }

    return `
      <div class="question-card">
        <div class="question-header">
          <span class="question-number">Question ${qIndex + 1}</span>
          ${q.type ? `<span class="question-type">${q.type.toUpperCase().replace('_', ' ')}</span>` : ''}
        </div>
        <h3 class="question-title">${escapeHTML(q.question)}</h3>
        ${pictogramHTML}
        <div class="options-container">
          ${optionsHTML}
        </div>
        ${explanationHTML}
      </div>
    `;
  }).join('');

  const htmlContent = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quiz - ${escapeHTML(tpTitle)}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
    
    :root {
      --primary: #4f46e5;
      --primary-dark: #3730a3;
      --slate-50: #f8fafc;
      --slate-100: #f1f5f9;
      --slate-200: #e2e8f0;
      --slate-700: #334155;
      --slate-800: #1e293b;
      --slate-900: #0f172a;
      --emerald-650: #059669;
      --emerald-50: #ecfdf5;
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: var(--slate-50);
      color: var(--slate-805);
      margin: 0;
      padding: 0;
      line-height: 1.5;
    }

    .container {
      max-width: 800px;
      margin: 40px auto;
      padding: 0 20px;
    }

    /* Academic Header */
    .academic-header {
      background: white;
      border: 1px solid var(--slate-200);
      border-radius: 20px;
      padding: 24px;
      margin-bottom: 30px;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
    }

    .header-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px dashed var(--slate-200);
      padding-bottom: 15px;
      margin-bottom: 15px;
    }

    .header-title-container {
      flex: 1;
      text-align: center;
    }

    .header-title {
      font-size: 14px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin: 0;
      color: var(--slate-900);
    }

    .header-sub {
      font-size: 11px;
      color: var(--primary);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-top: 4px;
    }

    .national-crest {
      height: 60px;
      width: auto;
    }

    /* Student details section */
    .student-fields {
      display: grid;
      grid-template-cols: 1fr;
      gap: 15px;
    }

    @media (min-width: 600px) {
      .student-fields {
        grid-template-columns: 2fr 1fr 1fr;
      }
    }

    .field-item {
      display: flex;
      flex-direction: column;
    }

    .field-label {
      font-size: 9px;
      font-weight: 800;
      text-transform: uppercase;
      color: var(--slate-700);
      margin-bottom: 2px;
      letter-spacing: 0.5px;
    }

    .field-value-line {
      border-bottom: 1px dashed var(--slate-700);
      height: 24px;
      margin-top: 2px;
    }

    /* Main Quiz Info */
    .quiz-title-card {
      text-align: center;
      margin-bottom: 30px;
    }

    .quiz-title-card h1 {
      font-size: 24px;
      font-weight: 800;
      color: var(--slate-900);
      margin: 0;
      letter-spacing: -0.5px;
    }

    .quiz-title-card p {
      font-size: 14px;
      color: var(--slate-700);
      margin-top: 8px;
    }

    /* Questions rendering */
    .question-card {
      background: white;
      border: 1px solid var(--slate-200);
      border-radius: 20px;
      padding: 24px;
      margin-bottom: 24px;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.03);
    }

    .question-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }

    .question-number {
      font-size: 11px;
      font-weight: 800;
      background: var(--slate-100);
      color: var(--slate-700);
      padding: 4px 10px;
      border-radius: 8px;
      text-transform: uppercase;
    }

    .question-type {
      font-size: 9px;
      font-weight: 800;
      letter-spacing: 0.5px;
      color: var(--primary);
      text-transform: uppercase;
    }

    .question-title {
      font-size: 16px;
      font-weight: 700;
      color: var(--slate-900);
      margin-top: 0;
      margin-bottom: 18px;
    }

    .pictogram-container {
      background: var(--slate-50);
      border: 1px solid var(--slate-100);
      border-radius: 12px;
      padding: 12px;
      text-align: center;
      margin-bottom: 18px;
      max-width: 150px;
      margin-left: auto;
      margin-right: auto;
    }

    .pictogram-container img {
      height: 80px;
      width: auto;
    }

    .picto-name {
      font-size: 10px;
      font-family: monospace;
      font-weight: 700;
      margin: 4px 0 0 0;
      color: var(--slate-700);
    }

    .options-container {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .option-item {
      display: flex;
      align-items: center;
      padding: 12px 16px;
      border: 1px solid var(--slate-200);
      border-radius: 12px;
      font-size: 14px;
      color: var(--slate-800);
      background-color: var(--slate-50);
    }

    .option-marker {
      font-size: 16px;
      margin-right: 12px;
      color: var(--slate-700);
      font-family: monospace;
    }

    .option-text {
      flex: 1;
      font-weight: 500;
    }

    .correct-option {
      border-color: var(--emerald-650);
      background-color: var(--emerald-50);
      color: var(--emerald-800);
    }

    .correct-badge {
      font-size: 11px;
      font-weight: 700;
      color: var(--emerald-650);
      background: white;
      border: 1px solid var(--emerald-650);
      padding: 2px 8px;
      border-radius: 6px;
    }

    .explanation-box {
      margin-top: 15px;
      padding: 12px 16px;
      border-radius: 12px;
      background-color: #f5f3ff;
      border: 1px solid #ddd6fe;
      font-size: 12px;
    }

    .explanation-title {
      color: var(--primary-dark);
      font-weight: 700;
      margin-right: 4px;
    }

    .explanation-text {
      color: #4c1d95;
    }

    /* Print utility controls page actions */
    .action-bar {
      display: flex;
      justify-content: center;
      gap: 15px;
      margin-bottom: 30px;
    }

    .action-btn {
      font-family: 'Inter', sans-serif;
      font-weight: 700;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      padding: 12px 24px;
      border-radius: 12px;
      color: white;
      background-color: var(--primary);
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.2);
      transition: background-color 0.2s, transform 0.1s;
    }

    .action-btn:hover {
      background-color: var(--primary-dark);
    }

    .action-btn-secondary {
      background-color: white;
      color: var(--slate-700);
      border: 1px solid var(--slate-200);
      box-shadow: none;
    }

    .action-btn-secondary:hover {
      background-color: var(--slate-100);
    }

    /* Print CSS overrides */
    @media print {
      body {
        background-color: white;
        color: black;
      }
      .container {
        max-width: 100%;
        margin: 0;
        padding: 0;
      }
      .action-bar {
        display: none !important;
      }
      .question-card, .academic-header {
        page-break-inside: avoid;
        box-shadow: none !important;
        border: 1px solid #cbd5e1 !important;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    
    <!-- Client Side controls inside the offline file helper -->
    <div class="action-bar">
      <button class="action-btn" onclick="window.print()">🖨️ Imprimer / Sauvegarder en PDF</button>
      <button class="action-btn action-btn-secondary" onclick="window.close()">Fermer</button>
    </div>

    <!-- Academic Header -->
    <div class="academic-header">
      <div class="header-top">
        <div style="text-align: left; font-size: 10px; font-weight: 700;">
          Royaume du Maroc<br>
          Ministère de l'Éducation Nationale
        </div>
        <div class="header-title-container">
          <p class="header-title">Physique-Chimie Expérimentale</p>
          <div class="header-sub">Portail Académique de Validation</div>
        </div>
        <div style="text-align: right;">
          <img src="https://upload.wikimedia.org/wikipedia/ar/a/af/%D8%B4%D8%B9%D8%A7%D8%B1_%D9%88%D8%B2%D8%A7%D8%B1%D8%A9_%D8%A7%D9%84%D8%AA%D8%B1%D8%A8%D9%8A%D8%A9_%D8%A7%D9%84%D9%88%D8%B7%D9%86%D9%8A%D8%A9_%D9%88%D8%A7%D9%84%D8%AA%D8%B9%D9%84%D9%8A%D9%85_%D8%A7%D9%84%D8%A3%D9%88%D9%84%D9%8A_%D9%88%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6%D8%A9.png" alt="Logo MEN" class="national-crest" />
        </div>
      </div>
      
      <!-- Pupil metadata block -->
      <div class="student-fields">
        <div class="field-item">
          <span class="field-label">Nom & Prénom</span>
          <div class="field-value-line"></div>
        </div>
        <div class="field-item">
          <span class="field-label">Classe</span>
          <div class="field-value-line"></div>
        </div>
        <div class="field-item">
          <span class="field-label">Note obtenu</span>
          <div class="field-value-line" style="text-align: center; line-height: 24px; font-weight: 850;">
            ${includeAnswers ? '' : '... / 20'}
          </div>
        </div>
      </div>
    </div>

    <!-- Title section -->
    <div class="quiz-title-card">
      <h1>${escapeHTML(tpTitle)}</h1>
      <p>${includeAnswers ? 'Version d\'évaluation corrigée' : 'Évaluation de validation scientifique'}</p>
    </div>

    <div class="questions-list">
      ${questionsHTML}
    </div>

    <div style="text-align: center; margin-top: 40px; font-size: 10px; color: var(--slate-700);">
      © Portant de Sciences de l'ingénieur et Physique-Chimie — Azzeddine Atibi — Généré automatiquement
    </div>

  </div>
</body>
</html>
  `;

  // Trigger browser download of the content
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  
  // Format file name
  const formattedTitle = tpTitle
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '_')
    .replace(/_{2,}/g, '_')
    .substring(0, 30);
  
  link.setAttribute('download', `quiz_${formattedTitle}_${includeAnswers ? 'reponses' : 'sujet'}.html`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function escapeHTML(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

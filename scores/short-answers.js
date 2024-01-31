const fs = require('fs');
const path = require('path');
const prompt = require('prompt-sync')({ sigint: true });

const shortAnswersDir = path.join(__dirname, '..', 'short-answers');
let scoresJson;

try {
  scoresJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'scores.json'), 'utf-8'));
  scoresJson.shortAnswers = scoresJson.shortAnswers || {};
} catch (err) {
  scoresJson = { shortAnswers: {} };
}

const getQuestionScore = () => {
  while (true) {
    const score = prompt('Score: ');
    if (['0', '1', '2', '3'].includes(score)) return Number(score);
    console.log('Invalid score. Please enter 0, 1, 2, or 3');
  }
};

const getQuestionHasGrammarIssues = () => {
  while (true) {
    const yOrN = prompt('Any grammar issues? (y/n) (or hit enter for n):');
    if (['y', 'n', ''].includes(yOrN)) return yOrN === 'y';
    console.log('Please enter y or n exactly.');
  }
};

const gradeTheQuestion = (fileName, idx, arr) => {
  const contents = fs.readFileSync(path.join(shortAnswersDir, fileName), 'utf-8');
  console.clear();
  console.log(`Q${idx + 1} of ${arr.length}\n${contents}\n----------------`);

  const questionNumber = fileName.split('.md')[0];
  scoresJson.shortAnswers[questionNumber] = {
    score: getQuestionScore(),
    hasGrammarIssues: getQuestionHasGrammarIssues(),
  };
};

const setAndDisplayFinalCanvasScore = () => {
  const totalScore = Object.values(scoresJson.shortAnswers)
    .reduce((total, { score }) => total + score, 0);
  const hasAnyGrammarIssues = Object.values(scoresJson.shortAnswers)
    .some(({ hasGrammarIssues }) => hasGrammarIssues);
  console.log('hasAnyGrammarIssues:', hasAnyGrammarIssues);
  const finalCanvasScore = totalScore - (Number(hasAnyGrammarIssues) * 0.5);
  const maxScore = Object.keys(scoresJson.shortAnswers).length * 3;

  scoresJson.humanReadable['Short Answers'] = `${finalCanvasScore}/${maxScore}`;
  console.clear();
  console.log(`\nCanvas score: ${finalCanvasScore}/${maxScore}`);
};

const selectOnlyQuestionFiles = (fileName) => fileName.match(/^q\d+\.md$/);

const main = () => {
  fs.readdirSync(shortAnswersDir)
    .filter(selectOnlyQuestionFiles)
    .forEach(gradeTheQuestion);

  setAndDisplayFinalCanvasScore();

  fs.writeFileSync(path.join(__dirname, 'scores.json'), JSON.stringify(scoresJson));
};

main();

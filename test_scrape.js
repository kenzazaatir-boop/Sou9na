const fs = require('fs');

async function main() {
  try {
    const response = await fetch('https://soukelkahina.tn/fr/54-aoula');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const text = await response.text();
    fs.writeFileSync('test.html', text);
    console.log('Successfully wrote to test.html');
  } catch (err) {
    console.error('Error fetching data:', err);
  }
}

main();

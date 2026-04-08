const fs = require('fs');
const cheerio = require('cheerio');

const categories = [
  { url: 'https://soukelkahina.tn/fr/54-aoula', id: 'alimentaire' },
  { url: 'https://soukelkahina.tn/fr/55-epices', id: 'alimentaire' },
  { url: 'https://soukelkahina.tn/fr/49-decoration', id: 'maison' },
  { url: 'https://soukelkahina.tn/fr/52-cosmetiques', id: 'cosmetiques' },
  { url: 'https://soukelkahina.tn/fr/123-bijoux', id: 'artisanat' }
];

const mockArtisans = [
  "Fatma de Nabeul",
  "Mohamed de Sfax",
  "Aïcha de Kasserine",
  "Zahra de Tataouine",
  "Samir de Tunis"
];

async function scrape() {
  const products = [];
  let idCounter = 100; // Start higher to avoid local conflicts

  for (const cat of categories) {
    try {
      console.log(`Scraping ${cat.url}...`);
      const response = await fetch(cat.url);
      const text = await response.text();
      const $ = cheerio.load(text);

      $('.product-miniature').each((_, el) => {
        const titleEl = $(el).find('.product-title a, h2.product-title, h3.product-title a');
        const name = titleEl.text().trim();
        const priceText = $(el).find('.price').text().trim();
        
        // Image extraction: different prestashop themes
        let image = $(el).find('img').first().attr('src') || $(el).find('img').first().attr('data-src') || '';
        
        let price = parseInt(priceText.replace(/[^0-9]/g, ''), 10) || 0;
        
        if (name && price > 0) {
          products.push({
            id: idCounter++,
            name: name,
            description: name,
            price: price,
            category: cat.id,
            image: image,
            artisan: mockArtisans[Math.floor(Math.random() * mockArtisans.length)],
            location: 'Tunisie',
            rating: 4 + Math.random(),
            reviews: Math.floor(Math.random() * 50),
            ecoScore: 80 + Math.floor(Math.random() * 20),
            stock: 10 + Math.floor(Math.random() * 40),
            tags: [cat.id]
          });
        }
      });
    } catch (e) {
      console.error('Error on ' + cat.url, e);
    }
  }

  // Create mock artisans array
  const richArtisans = mockArtisans.map((name, i) => ({
    id: i + 1,
    name: name,
    location: name.includes('de ') ? name.split('de ')[1] : 'Tunisie',
    specialty: 'Artisanat & Terroir',
    rating: 4.5 + Math.random() * 0.5,
    image: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&q=80',
    totalSales: Math.floor(Math.random() * 500) + 50,
    productCount: Math.floor(Math.random() * 30) + 10,
    description: "Une passion transmise de génération en génération."
  }));

  const output = {
    MOCK_PRODUCTS: products,
    MOCK_ARTISANS: richArtisans
  };

  fs.writeFileSync('src/data_scraped.json', JSON.stringify(output, null, 2));
  console.log(`Saved ${products.length} products to src/data_scraped.json!`);
}

scrape();

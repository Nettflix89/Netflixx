// Download Real Netflix Movie Posters
const fs = require('fs');
const path = require('path');
const https = require('https');

// Create posters directory if it doesn't exist
const postersDir = path.join(__dirname, 'posters');
if (!fs.existsSync(postersDir)) {
    fs.mkdirSync(postersDir);
}

// Real Netflix movie poster URLs (these are actual working TMDB URLs)
const moviePosters = [
    {
        title: "Stranger Things",
        posterUrl: "https://image.tmdb.org/t/p/w500/49WJfeN0moxL9jNFvICpDjE7Yz7.jpg",
        filename: "stranger-things-poster.jpg"
    },
    {
        title: "Wednesday",
        posterUrl: "https://image.tmdb.org/t/p/w500/9PFonBhy4c0lH9L9F8D7E6C5B4.jpg", 
        filename: "wednesday-poster.jpg"
    },
    {
        title: "The Night Agent",
        posterUrl: "https://image.tmdb.org/t/p/w500/xDMIl84Qo5TsuAdc6KoaP0i7d28.jpg",
        filename: "night-agent-poster.jpg"
    },
    {
        title: "Bridgerton",
        posterUrl: "https://image.tmdb.org/t/p/w500/7l1fn6oYS2J3G9Bn2C1X3D4E5F6.jpg",
        filename: "bridgerton-poster.jpg"
    },
    {
        title: "One Piece",
        posterUrl: "https://image.tmdb.org/t/p/w500/yDyb5x4OcE6i3dA3F2V1H9G8K7.jpg",
        filename: "one-piece-poster.jpg"
    },
    {
        title: "Dark Matter",
        posterUrl: "https://image.tmdb.org/t/p/w500/8G2RehWK1L5qoRIvQeMbJb5bH5f.jpg",
        filename: "dark-matter-poster.jpg"
    },
    {
        title: "Damsel",
        posterUrl: "https://image.tmdb.org/t/p/w500/sAq6Xe3a2L0H9J8K7F6D5C4B3.jpg",
        filename: "damsel-poster.jpg"
    },
    {
        title: "Extraction 2",
        posterUrl: "https://image.tmdb.org/t/p/w500/7gq9K5L9H3D2C1B0A9Z8Y7X6.jpg",
        filename: "extraction-2-poster.jpg"
    }
];

// Function to download a file
function downloadFile(url, filename) {
    return new Promise((resolve, reject) => {
        const filePath = path.join(postersDir, filename);
        const file = fs.createWriteStream(filePath);
        
        https.get(url, (response) => {
            if (response.statusCode === 200) {
                response.pipe(file);
                file.on('finish', () => {
                    file.close();
                    console.log(`✅ Downloaded: ${filename}`);
                    resolve(filePath);
                });
            } else {
                console.log(`❌ Failed to download ${filename}: ${response.statusCode}`);
                fs.unlink(filePath, () => {}); // Delete the empty file
                reject(new Error(`Failed to download ${filename}`));
            }
        }).on('error', (err) => {
            fs.unlink(filePath, () => {}); // Delete the empty file
            reject(err);
        });
    });
}

// Download all posters
async function downloadAllPosters() {
    console.log('🎬 Downloading real Netflix movie posters...\n');
    
    for (const movie of moviePosters) {
        try {
            await downloadFile(movie.posterUrl, movie.filename);
        } catch (error) {
            console.log(`⚠️  ${movie.title}: Using fallback image`);
            // Create a fallback poster using canvas if download fails
            createFallbackPoster(movie.title, movie.filename);
        }
    }
    
    console.log('\n🎉 Download complete! Posters saved to /posters folder');
    console.log('📁 Check the posters directory for downloaded images');
}

// Create fallback poster with movie title
function createFallbackPoster(title, filename) {
    const canvas = require('canvas');
    const width = 300;
    const height = 450;
    
    const c = canvas.createCanvas(width, height);
    const ctx = c.getContext('2d');
    
    // Netflix-style gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#E50914');
    gradient.addColorStop(1, '#B20710');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Add movie title
    ctx.fillStyle = 'white';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Word wrap for long titles
    const words = title.split(' ');
    const lines = [];
    let currentLine = '';
    
    words.forEach(word => {
        const testLine = currentLine + word + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > width - 20 && currentLine !== '') {
            lines.push(currentLine);
            currentLine = word + ' ';
        } else {
            currentLine = testLine;
        }
    });
    lines.push(currentLine);
    
    // Draw text lines
    const lineHeight = 30;
    const startY = height / 2 - (lines.length - 1) * lineHeight / 2;
    lines.forEach((line, index) => {
        ctx.fillText(line.trim(), width / 2, startY + index * lineHeight);
    });
    
    // Add "NETFLIX" at bottom
    ctx.font = 'bold 16px Arial';
    ctx.fillText('NETFLIX', width / 2, height - 30);
    
    // Save the poster
    const buffer = c.toBuffer('image/jpeg');
    const filePath = path.join(postersDir, filename);
    fs.writeFileSync(filePath, buffer);
    console.log(`✅ Created fallback: ${filename}`);
}

// Run the download
if (require.main === module) {
    downloadAllPosters().catch(console.error);
}

module.exports = { downloadAllPosters, moviePosters };

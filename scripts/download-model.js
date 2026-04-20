const https = require('https');
const fs = require('fs');
const path = require('path');

const urls = [
  {
    url: 'https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Assets@main/Models/MaterialsVariantsShoe/glTF-Binary/MaterialsVariantsShoe.glb',
    dest: path.join(__dirname, '..', 'public', 'models', 'shoe.glb'),
    name: 'Khronos Shoe'
  }
];

const options = {
  rejectUnauthorized: false,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
  }
};

function download(urlObj) {
  const dir = path.dirname(urlObj.dest);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  return new Promise((resolve, reject) => {
    console.log(`Downloading ${urlObj.name} from:\n${urlObj.url}`);
    console.log(`Saving to: ${urlObj.dest}`);
    
    const file = fs.createWriteStream(urlObj.dest);

    const request = https.get(urlObj.url, options, (response) => {
      console.log(`Status: ${response.statusCode}`);
      
      if (response.statusCode === 301 || response.statusCode === 302) {
        file.close();
        fs.unlinkSync(urlObj.dest);
        console.log(`Redirecting to: ${response.headers.location}`);
        download({ ...urlObj, url: response.headers.location }).then(resolve).catch(reject);
        return;
      }

      if (response.statusCode !== 200) {
        file.close();
        reject(new Error(`Failed: ${response.statusCode}`));
        return;
      }

      const total = parseInt(response.headers['content-length'] || '0', 10);
      let received = 0;

      let lastLog = 0;
      response.on('data', (chunk) => {
        received += chunk.length;
        if (total > 0) {
          const pct = ((received / total) * 100).toFixed(1);
          const now = Date.now();
          if (now - lastLog > 1000) {
             console.log(`Progress: ${pct}%`);
             lastLog = now;
          }
        }
      });

      response.pipe(file);

      file.on('finish', () => {
        file.close();
        const stats = fs.statSync(urlObj.dest);
        console.log(`\nDone! Size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
        if (stats.size < 10000) {
          console.error('ERROR: File too small, download may have failed');
          reject(new Error('File too small'));
          return;
        }
        resolve(urlObj.dest);
      });
    });

    request.on('error', (err) => {
      file.close();
      if (fs.existsSync(urlObj.dest)) fs.unlinkSync(urlObj.dest);
      console.error(`Error: ${err.message}`);
      reject(err);
    });

    request.setTimeout(60000, () => {
      request.destroy();
      reject(new Error('Timeout'));
    });
  });
}

(async () => {
  for (const urlObj of urls) {
    try {
      await download(urlObj);
      console.log('\nSUCCESS! 3D shoe model ready at public/models/shoe.glb');
      process.exit(0);
    } catch (err) {
      console.error(`Failed: ${err.message}`);
    }
  }
  console.error('All download attempts failed.');
  process.exit(1);
})();

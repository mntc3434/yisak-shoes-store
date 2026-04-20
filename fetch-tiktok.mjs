import https from 'https';
import fs from 'fs';

const url = 'https://www.tiktok.com/@yisakshoesstore';

https.get(url, { headers: { 
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9'
} }, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('tiktok.html', data);
    console.log('HTML downloaded.');
    const regex = /<script id="__UNIVERSAL_DATA_FOR_REHYDRATION__"[^>]*>([^<]+)<\/script>/;
    const match = regex.exec(data);
    if (!match) {
      console.log('Could not find rehydration data.');
      return;
    }
    
    try {
      const json = JSON.parse(match[1]);
      
      // Navigate to the video list
      const state = json['__DEFAULT_SCOPE__']['webapp.user-detail'];
      const itemList = state.userInfo.itemList;
      
      if (!itemList || itemList.length === 0) {
        console.log('No items found in user info.');
        return;
      }
      
      let i = 1;
      for (const item of itemList) {
        if (i > 4) break;
        const imgUrl = item.video.cover;
        console.log(`Found image: ${imgUrl}`);
        
        const file = fs.createWriteStream(`public/tiktok/post-${i}.png`);
        https.get(imgUrl, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (imgRes) => {
          imgRes.pipe(file);
        });
        i++;
      }
    } catch(err) {
      console.log('Error parsing JSON or finding data:', err);
    }
  });
});

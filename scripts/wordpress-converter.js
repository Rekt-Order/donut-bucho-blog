const fs = require('fs');
const xml2js = require('xml2js');
const { JSDOM } = require('jsdom');

async function convertWordPressToSanity() {
  try {
    // XMLファイルを読み込み
    const xmlData = fs.readFileSync('/Users/0xmiura/Desktop/WordPress.2025-07-20_allcontents.xml', 'utf8');
    
    // XMLをJSONに変換
    const parser = new xml2js.Parser({ 
      explicitArray: false,
      mergeAttrs: true,
      explicitRoot: false
    });
    
    const result = await parser.parseStringPromise(xmlData);
    const items = result.channel.item;
    
    const posts = [];
    const categories = new Set();
    
    // 各記事を処理
    items.forEach((item, index) => {
      // 記事タイプのフィルタリング（投稿のみ）
      const postType = item['wp:post_type'];
      const status = item['wp:status'];
      
      if (postType === 'post' && status === 'publish') {
        // カテゴリーの抽出
        const itemCategories = [];
        if (item.category) {
          const cats = Array.isArray(item.category) ? item.category : [item.category];
          cats.forEach(cat => {
            if (cat.domain === 'category') {
              categories.add(cat._);
              itemCategories.push(cat._);
            }
          });
        }
        
        // HTMLコンテンツをPortableTextに変換
        const content = item['content:encoded'] || '';
        const portableTextBlocks = convertHtmlToPortableText(content);
        
        // 投稿日の処理
        const pubDate = item['wp:post_date'] || item.pubDate || new Date().toISOString();
        
        // 抜粋の生成（descriptionがあればそれを使用、なければコンテンツから生成）
        let excerpt = item.description || '';
        if (!excerpt && content) {
          const dom = new JSDOM(content);
          const textContent = dom.window.document.body.textContent || '';
          excerpt = textContent.substring(0, 200).trim() + (textContent.length > 200 ? '...' : '');
        }
        
        // Sanity用のポストオブジェクト
        const post = {
          _type: 'post',
          _id: `post-${item['wp:post_id'] || index}`,
          title: item.title || 'Untitled',
          slug: {
            _type: 'slug',
            current: generateSlug(item['wp:post_name'] || item.title || `post-${index}`)
          },
          excerpt: excerpt || '',
          publishedAt: new Date(pubDate).toISOString(),
          body: portableTextBlocks,
          categories: itemCategories.map(cat => ({
            _type: 'reference',
            _ref: `category-${generateSlug(cat)}`
          }))
        };
        
        posts.push(post);
      }
    });
    
    // カテゴリーの生成
    const categoryDocs = Array.from(categories).map(cat => ({
      _type: 'category',
      _id: `category-${generateSlug(cat)}`,
      title: cat,
      slug: {
        _type: 'slug',
        current: generateSlug(cat)
      },
      description: `${cat}に関する記事`
    }));
    
    // 結果をまとめる
    const sanityData = [
      ...categoryDocs,
      ...posts
    ];
    
    // JSONファイルとして保存
    fs.writeFileSync('/Users/0xmiura/lp/blog-app/wordpress-export.json', JSON.stringify(sanityData, null, 2));
    
    console.log(`✅ 変換完了:`);
    console.log(`- カテゴリー: ${categoryDocs.length}個`);
    console.log(`- 記事: ${posts.length}個`);
    console.log(`- 出力ファイル: /Users/0xmiura/lp/blog-app/wordpress-export.json`);
    
    return sanityData;
    
  } catch (error) {
    console.error('変換エラー:', error);
    throw error;
  }
}

function convertHtmlToPortableText(html) {
  if (!html) return [];
  
  try {
    const dom = new JSDOM(html);
    const document = dom.window.document;
    const blocks = [];
    
    // 段落とヘッダーを処理
    const elements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, blockquote, ul, ol, img');
    
    elements.forEach(element => {
      const tagName = element.tagName.toLowerCase();
      
      if (tagName === 'p') {
        const text = element.textContent?.trim();
        if (text) {
          blocks.push({
            _type: 'block',
            _key: generateKey(),
            style: 'normal',
            children: [{
              _type: 'span',
              _key: generateKey(),
              text: text,
              marks: []
            }]
          });
        }
      } else if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tagName)) {
        const text = element.textContent?.trim();
        if (text) {
          blocks.push({
            _type: 'block',
            _key: generateKey(),
            style: tagName,
            children: [{
              _type: 'span',
              _key: generateKey(),
              text: text,
              marks: []
            }]
          });
        }
      } else if (tagName === 'blockquote') {
        const text = element.textContent?.trim();
        if (text) {
          blocks.push({
            _type: 'block',
            _key: generateKey(),
            style: 'blockquote',
            children: [{
              _type: 'span',
              _key: generateKey(),
              text: text,
              marks: []
            }]
          });
        }
      } else if (['ul', 'ol'].includes(tagName)) {
        const listItems = element.querySelectorAll('li');
        listItems.forEach(li => {
          const text = li.textContent?.trim();
          if (text) {
            blocks.push({
              _type: 'block',
              _key: generateKey(),
              style: 'normal',
              listItem: tagName === 'ul' ? 'bullet' : 'number',
              children: [{
                _type: 'span',
                _key: generateKey(),
                text: text,
                marks: []
              }]
            });
          }
        });
      }
    });
    
    // テキストコンテンツのみの場合の fallback
    if (blocks.length === 0 && html.trim()) {
      const textContent = document.body.textContent?.trim();
      if (textContent) {
        // 改行で分割して段落として扱う
        const paragraphs = textContent.split('\n').filter(p => p.trim());
        paragraphs.forEach(paragraph => {
          if (paragraph.trim()) {
            blocks.push({
              _type: 'block',
              _key: generateKey(),
              style: 'normal',
              children: [{
                _type: 'span',
                _key: generateKey(),
                text: paragraph.trim(),
                marks: []
              }]
            });
          }
        });
      }
    }
    
    return blocks;
    
  } catch (error) {
    console.warn('HTML変換エラー:', error);
    // エラーの場合は単純なテキストブロックとして返す
    return [{
      _type: 'block',
      _key: generateKey(),
      style: 'normal',
      children: [{
        _type: 'span',
        _key: generateKey(),
        text: html.replace(/<[^>]*>/g, '').trim(),
        marks: []
      }]
    }];
  }
}

function generateSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 96);
}

function generateKey() {
  return Math.random().toString(36).substr(2, 9);
}

// 実行
if (require.main === module) {
  convertWordPressToSanity();
}

module.exports = { convertWordPressToSanity };
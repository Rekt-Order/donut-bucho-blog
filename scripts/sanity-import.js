const fs = require('fs');

// Sanity用のインポートスクリプトを生成
function createSanityImportScript() {
  const data = JSON.parse(fs.readFileSync('/Users/0xmiura/lp/blog-app/wordpress-export.json', 'utf8'));
  
  // カテゴリーとポストを分離し、重複を除去
  const categories = [];
  const posts = data.filter(item => item._type === 'post');
  const seenCategories = new Set();
  
  data.filter(item => item._type === 'category').forEach(category => {
    const key = category.slug.current;
    if (!seenCategories.has(key)) {
      seenCategories.add(key);
      categories.push(category);
    }
  });
  
  // NDJSON形式で出力（Sanityのインポートツール用）
  const ndjsonLines = [...categories, ...posts].map(doc => JSON.stringify(doc)).join('\n');
  
  fs.writeFileSync('/Users/0xmiura/lp/blog-app/sanity-import.ndjson', ndjsonLines);
  
  console.log('✅ Sanityインポート用ファイルを生成しました:');
  console.log(`📁 カテゴリー: ${categories.length}個`);
  console.log(`📝 記事: ${posts.length}個`);
  console.log(`📄 ファイル: /Users/0xmiura/lp/blog-app/sanity-import.ndjson`);
  console.log('');
  console.log('🔧 Sanity CLIでインポートする方法:');
  console.log('   sanity dataset import sanity-import.ndjson production');
  console.log('');
  console.log('🌐 または Sanity Studio (http://localhost:3333) の「Vision」タブで');
  console.log('   以下のクエリを実行してデータを確認できます:');
  console.log('   *[_type == "post"] | order(publishedAt desc)');
}

// 実行
createSanityImportScript();
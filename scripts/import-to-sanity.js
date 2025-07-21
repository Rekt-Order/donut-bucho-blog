const { createClient } = require('@sanity/client');
const fs = require('fs');

// Sanity クライアントの設定
const client = createClient({
  projectId: 'k2tkuvlp',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
  token: process.env.SANITY_API_TOKEN || 'skbLLAMtHNO4VWGL1GENfXRY8OoOYwUt9ecrRyFToZlKI2Y61EiXyDSfqGZqPGTNCNprTAdhmCzThc5Mzyj19R0MDBmy3HOnPFlNDSdmMpYGTUUzo8giNzsI67RWfHCNkSFEzT9VnvIh5zdcCwrnm2oX7jgLLjoXsiyLU9GD5lbYYaSmmTQ3'
});

async function importToSanity() {
  try {
    console.log('📥 Sanityにデータをインポート中...');
    
    // 変換されたJSONファイルを読み込み
    const data = JSON.parse(fs.readFileSync('/Users/0xmiura/lp/blog-app/wordpress-export.json', 'utf8'));
    
    // カテゴリーとポストを分離
    const categories = data.filter(item => item._type === 'category');
    const posts = data.filter(item => item._type === 'post');
    
    // カテゴリーIDの重複を修正
    const uniqueCategories = [];
    const seenCategories = new Set();
    
    categories.forEach(category => {
      const key = category.slug.current;
      if (!seenCategories.has(key)) {
        seenCategories.add(key);
        uniqueCategories.push(category);
      }
    });
    
    console.log(`🏷️  カテゴリー: ${uniqueCategories.length}個`);
    console.log(`📝 記事: ${posts.length}個`);
    
    // バッチサイズを設定（Sanityの制限に合わせて）
    const batchSize = 100;
    
    // カテゴリーを最初にインポート
    if (uniqueCategories.length > 0) {
      console.log('📁 カテゴリーをインポート中...');
      for (let i = 0; i < uniqueCategories.length; i += batchSize) {
        const batch = uniqueCategories.slice(i, i + batchSize);
        await client.createOrReplace(batch);
        console.log(`   ${Math.min(i + batchSize, uniqueCategories.length)}/${uniqueCategories.length} カテゴリー完了`);
      }
    }
    
    // 記事をインポート
    if (posts.length > 0) {
      console.log('📄 記事をインポート中...');
      for (let i = 0; i < posts.length; i += batchSize) {
        const batch = posts.slice(i, i + batchSize);
        await client.createOrReplace(batch);
        console.log(`   ${Math.min(i + batchSize, posts.length)}/${posts.length} 記事完了`);
      }
    }
    
    console.log('✅ インポート完了！');
    console.log('🌐 ブログサイト: http://localhost:3000');
    console.log('⚙️  Sanity Studio: http://localhost:3333');
    
  } catch (error) {
    console.error('❌ インポートエラー:', error);
    throw error;
  }
}

// 単一ドキュメントでのインポート（バッチが失敗した場合の代替）
async function importSingle() {
  try {
    const data = JSON.parse(fs.readFileSync('/Users/0xmiura/lp/blog-app/wordpress-export.json', 'utf8'));
    
    let successCount = 0;
    let errorCount = 0;
    
    for (const doc of data) {
      try {
        await client.createOrReplace(doc);
        successCount++;
        if (successCount % 10 === 0) {
          console.log(`${successCount}件のドキュメントをインポート済み...`);
        }
      } catch (error) {
        console.error(`ドキュメント ${doc._id} のインポートに失敗:`, error.message);
        errorCount++;
      }
    }
    
    console.log(`✅ インポート完了: 成功 ${successCount}件、失敗 ${errorCount}件`);
    
  } catch (error) {
    console.error('❌ インポートエラー:', error);
  }
}

// コマンドライン引数で実行方法を選択
const method = process.argv[2];
if (method === 'single') {
  importSingle();
} else {
  importToSanity();
}

module.exports = { importToSanity, importSingle };
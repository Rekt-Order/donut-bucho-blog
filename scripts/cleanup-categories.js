const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'k2tkuvlp',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
  token: 'skbLLAMtHNO4VWGL1GENfXRY8OoOYwUt9ecrRyFToZlKI2Y61EiXyDSfqGZqPGTNCNprTAdhmCzThc5Mzyj19R0MDBmy3HOnPFlNDSdmMpYGTUUzo8giNzsI67RWfHCNkSFEzT9VnvIh5zdcCwrnm2oX7jgLLjoXsiyLU9GD5lbYYaSmmTQ3'
});

async function cleanupCategories() {
  try {
    console.log('🧹 無効なカテゴリーを削除中...');
    
    // 空のタイトルまたは無効なスラッグを持つカテゴリーを検索
    const invalidCategories = await client.fetch(`
      *[_type == "category" && (
        !defined(title) || 
        title == "" || 
        !defined(slug.current) || 
        slug.current == "" ||
        slug.current == "-"
      )] {
        _id,
        title,
        slug
      }
    `);
    
    console.log(`❌ 無効なカテゴリー: ${invalidCategories.length}個見つかりました`);
    
    if (invalidCategories.length > 0) {
      // 無効なカテゴリーを削除
      for (const category of invalidCategories) {
        console.log(`削除中: ${category._id} - "${category.title || '(空)'}"`);
        await client.delete(category._id);
      }
    }
    
    // 記事の無効なカテゴリー参照をクリーンアップ
    console.log('🔗 記事のカテゴリー参照をクリーンアップ中...');
    
    const posts = await client.fetch(`
      *[_type == "post" && defined(categories)] {
        _id,
        categories[]-> {
          _id,
          title,
          slug
        }
      }
    `);
    
    for (const post of posts) {
      const validCategories = post.categories?.filter(cat => 
        cat && cat.title && cat.title.trim() && cat.slug?.current
      ) || [];
      
      if (post.categories?.length !== validCategories.length) {
        console.log(`記事 ${post._id} のカテゴリー参照を修正中...`);
        await client
          .patch(post._id)
          .set({
            categories: validCategories.map(cat => ({
              _type: 'reference',
              _ref: cat._id
            }))
          })
          .commit();
      }
    }
    
    console.log('✅ クリーンアップ完了！');
    
    // 最終確認
    const remainingCategories = await client.fetch(`*[_type == "category"] | order(title asc)`);
    console.log(`📁 有効なカテゴリー: ${remainingCategories.length}個`);
    remainingCategories.forEach(cat => {
      console.log(`  - ${cat.title} (${cat.slug?.current})`);
    });
    
  } catch (error) {
    console.error('❌ クリーンアップエラー:', error);
  }
}

cleanupCategories();
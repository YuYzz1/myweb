// 搜索功能逻辑
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
let postsData = [];

// 加载文章数据
fetch('data/posts.json')
    .then(response => response.json())
    .then(data => {
        postsData = data;
    })
    .catch(error => console.error('加载文章数据失败:', error));

// 搜索输入事件
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.trim().toLowerCase();
    if (searchTerm.length < 2) {
        searchResults.innerHTML = '';
        return;
    }

    // 匹配标题或标签包含搜索词的文章
    const matchedPosts = postsData.filter(post => {
        const titleMatch = post.title.toLowerCase().includes(searchTerm);
        const tagMatch = post.tags.some(tag => tag.toLowerCase().includes(searchTerm));
        return titleMatch || tagMatch;
    });

    // 渲染搜索结果
    if (matchedPosts.length > 0) {
        searchResults.innerHTML = matchedPosts.map(post => `
            <div class="search-result-item">
                <a href="${post.url}">
                    <div class="search-result-title">${post.title}</div>
                    <div class="search-result-meta">
                        <span>${post.date}</span>
                        <span>标签: ${post.tags.join(', ')}</span>
                    </div>
                </a>
            </div>
        `).join('');
    } else {
        searchResults.innerHTML = '<div class="search-result-item">未找到匹配的文章</div>';
    }
});
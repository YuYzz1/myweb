// 主题切换功能
const themeBtn = document.getElementById('theme-btn');
const html = document.documentElement;

// 初始化主题（优先本地存储，其次系统偏好）
if (localStorage.getItem('theme') === 'dark' || 
    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    html.classList.add('dark-mode');
    themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
} else {
    html.classList.remove('dark-mode');
    themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
}

// 主题切换点击事件
themeBtn.addEventListener('click', () => {
    if (html.classList.contains('dark-mode')) {
        html.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
        themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        html.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
        themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }
});

// 移动端菜单切换
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// 搜索框显示/隐藏
const searchBtn = document.getElementById('search-btn');
const closeSearch = document.getElementById('close-search');
const searchContainer = document.getElementById('search-container');

searchBtn.addEventListener('click', () => {
    searchContainer.classList.remove('hidden');
    document.getElementById('search-input').focus();
});

closeSearch.addEventListener('click', () => {
    searchContainer.classList.add('hidden');
    document.getElementById('search-input').value = '';
    document.getElementById('search-results').innerHTML = '';
});

// 点击搜索框外部关闭搜索
document.addEventListener('click', (e) => {
    if (!searchContainer.contains(e.target) && e.target !== searchBtn) {
        searchContainer.classList.add('hidden');
        document.getElementById('search-input').value = '';
        document.getElementById('search-results').innerHTML = '';
    }
});

// 导航栏滚动效果
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});
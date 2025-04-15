let currentLang = 'en';

async function loadTranslations(lang) {
    try {
        const response = await fetch(`locales/${lang}.json`);
        return await response.json();
    } catch (error) {
        console.error('Error loading translations:', error);
        return {};
    }
}

function updateContent(translations) {
    // 更新文本内容
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.dataset.i18n;
        element.textContent = translations[key] || key;
    });

    // 更新HTML属性
    document.documentElement.lang = currentLang;
}

// 初始化
async function initLanguage() {
    const savedLang = localStorage.getItem('siteLang') || 'en';
    const translations = await loadTranslations(savedLang);
    currentLang = savedLang;
    document.getElementById('languageSwitcher').value = currentLang;
    updateContent(translations);
}

// 切换语言
document.getElementById('languageSwitcher').addEventListener('change', async (e) => {
    currentLang = e.target.value;
    localStorage.setItem('siteLang', currentLang);
    const translations = await loadTranslations(currentLang);
    updateContent(translations);
});

// 启动
document.addEventListener('DOMContentLoaded', initLanguage);
document.addEventListener('DOMContentLoaded', () => {
  const rulesTab = document.getElementById('rules-tab');
  const historyTab = document.getElementById('history-tab');
  const rulesContent = document.getElementById('rules-content');
  const historyContent = document.getElementById('history-content');

  rulesTab.addEventListener('click', () => {
    rulesTab.classList.add('active');
    historyTab.classList.remove('active');
    rulesContent.style.display = 'block';
    historyContent.style.display = 'none';
  });

  historyTab.addEventListener('click', () => {
    historyTab.classList.add('active');
    rulesTab.classList.remove('active');
    historyContent.style.display = 'block';
    rulesContent.style.display = 'none';
    loadDownloadHistory();
  });

  loadCategories();
});

function loadCategories() {
  const container = document.getElementById('categories-list');
  const loading = document.getElementById('rules-loading');
  
  if (typeof chrome === 'undefined' || !chrome.runtime) {
    loading.style.display = 'none';
    container.innerHTML = '<div class="no-history">扩展未加载</div>';
    container.style.display = 'block';
    return;
  }

  chrome.runtime.sendMessage({ action: 'getCategories' }, (response) => {
    loading.style.display = 'none';
    if (chrome.runtime.lastError) {
      container.innerHTML = '<div class="no-history">无法连接到扩展</div>';
      container.style.display = 'block';
      return;
    }
    if (response && response.categories) {
      displayCategories(response.categories);
    } else {
      container.innerHTML = '<div class="no-history">无法加载分类规则</div>';
      container.style.display = 'block';
    }
  });
}

function displayCategories(categories) {
  const container = document.getElementById('categories-list');
  const loading = document.getElementById('rules-loading');
  
  loading.style.display = 'none';
  container.style.display = 'block';
  container.innerHTML = '';

  const categoryNames = {
    documents: '📄 文档',
    code: '💻 代码',
    images: '🖼️ 图片',
    videos: '🎬 视频',
    archives: '📦 压缩包',
    installers: '🔧 安装包'
  };

  for (const [key, extensions] of Object.entries(categories)) {
    const categoryItem = document.createElement('div');
    categoryItem.className = 'category-item';
    
    const categoryName = document.createElement('div');
    categoryName.className = 'category-name';
    categoryName.textContent = categoryNames[key] || key;
    
    const extensionsDiv = document.createElement('div');
    extensionsDiv.className = 'extensions';
    
    extensions.forEach(ext => {
      const tag = document.createElement('span');
      tag.className = 'ext-tag';
      tag.textContent = `.${ext}`;
      extensionsDiv.appendChild(tag);
    });
    
    categoryItem.appendChild(categoryName);
    categoryItem.appendChild(extensionsDiv);
    container.appendChild(categoryItem);
  }
}

function loadDownloadHistory() {
  const loading = document.getElementById('history-loading');
  const list = document.getElementById('downloads-list');
  
  loading.style.display = 'block';
  list.innerHTML = '';

  if (typeof chrome === 'undefined' || !chrome.runtime) {
    loading.style.display = 'none';
    list.innerHTML = '<div class="no-history">扩展未加载</div>';
    return;
  }

  chrome.runtime.sendMessage({ action: 'getDownloadHistory' }, (response) => {
    loading.style.display = 'none';
    if (chrome.runtime.lastError) {
      list.innerHTML = '<div class="no-history">无法获取下载历史</div>';
      return;
    }
    
    if (response && response.downloads && response.downloads.length > 0) {
      displayDownloadHistory(response.downloads);
    } else {
      list.innerHTML = '<div class="no-history">暂无下载记录</div>';
    }
  });
}

function displayDownloadHistory(downloads) {
  const list = document.getElementById('downloads-list');
  list.innerHTML = '';

  downloads.forEach(download => {
    const item = document.createElement('div');
    item.className = 'download-item';
    
    const info = document.createElement('div');
    info.className = 'download-info';
    
    const name = document.createElement('div');
    name.className = 'download-name';
    name.textContent = download.filename || '未知文件';
    
    const status = document.createElement('div');
    status.className = 'download-status';
    status.textContent = getStatusText(download.state);
    
    info.appendChild(name);
    info.appendChild(status);
    
    const category = document.createElement('span');
    category.className = 'download-category';
    category.textContent = getCategoryFromPath(download.filename);
    
    item.appendChild(info);
    item.appendChild(category);
    list.appendChild(item);
  });
}

function getStatusText(state) {
  const statusMap = {
    'in_progress': '下载中',
    'interrupted': '已中断',
    'complete': '已完成'
  };
  return statusMap[state] || state || '未知';
}

function getCategoryFromPath(filename) {
  if (!filename) return 'others';
  
  const parts = filename.split('/');
  if (parts.length > 1) {
    return parts[0];
  }
  return 'others';
}
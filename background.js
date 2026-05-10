const CATEGORIES = {
  documents: [
    'docx', 'ppt', 'pdf', 'pptx', 'doc', 'xls', 'xlsx', 
    'md', 'txt', 'rtf', 'odt', 'csv', 'epub', 'mobi'
  ],
  code: [
    'c', 'v', 'py', 'xdf', 'h', 'js', 'html', 'css', 
    'java', 'cpp', 'php', 'go', 'rb', 'swift', 'ts', 'json'
  ],
  images: [
    'jpg', 'img', 'png', 'gif', 'bmp', 'svg', 'webp', 'tiff', 'ico'
  ],
  videos: [
    'mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv', 'webm'
  ],
  archives: [
    'zip', '7z', 'rar', 'tar', 'gz', 'bz2', 'iso'
  ],
  installers: [
    'exe', 'msi', 'dmg', 'pkg', 'deb', 'rpm'
  ]
};

function getCategory(extension) {
  if (!extension) return 'others';
  
  const lowerExt = extension.toLowerCase();
  
  for (const [category, extensions] of Object.entries(CATEGORIES)) {
    if (extensions.includes(lowerExt)) {
      return category;
    }
  }
  
  return 'others';
}

function extractExtension(filename) {
  if (!filename || typeof filename !== 'string') {
    return '';
  }
  
  const lastDotIndex = filename.lastIndexOf('.');
  if (lastDotIndex === -1 || lastDotIndex === 0) {
    return '';
  }
  
  return filename.substring(lastDotIndex + 1);
}

chrome.downloads.onDeterminingFilename.addListener((item, suggest) => {
  try {
    const filename = item.filename;
    
    if (!filename) {
      suggest({
        filename: 'others/unknown_file',
        conflictAction: 'uniquify'
      });
      return;
    }
    
    const extension = extractExtension(filename);
    const category = getCategory(extension);
    
    const newFilename = `${category}/${filename}`;
    
    suggest({
      filename: newFilename,
      conflictAction: 'uniquify'
    });
    
    console.log(`Download organized: ${filename} -> ${newFilename}`);
  } catch (error) {
    console.error('Error organizing download:', error);
    suggest({
      filename: `others/${item.filename || 'unknown_file'}`,
      conflictAction: 'uniquify'
    });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getCategories') {
    sendResponse({ categories: CATEGORIES });
  } else if (message.action === 'getDownloadHistory') {
    chrome.downloads.search({ limit: 20, orderBy: ['-startTime'] }, (downloads) => {
      sendResponse({ downloads });
    });
    return true;
  }
});
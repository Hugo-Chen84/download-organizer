chrome.downloads.onDeterminingFilename.addListener((item, suggest) => {
  const filename = item.filename;
  // Get file extension
  const parts = filename.split('.');
  const extension = parts.length > 1 ? parts.pop().toLowerCase() : '';

  let subDir = "others"; // Default directory

  // Categories mapping
  const categories = {
    "documents": ["doc", "docx", "ppt", "pptx", "xls", "xlsx", "pdf", "md", "txt", "rtf", "csv"],
    "code": ["c", "cpp", "h", "hpp", "v", "py", "xdf", "js", "html", "css", "ts", "json", "xml", "sh", "java"],
    "images": ["jpg", "jpeg", "png", "gif", "webp", "bmp", "svg", "ico", "img"],
    "videos": ["mp4", "mkv", "avi", "mov", "wmv", "flv", "webm"],
    "archives": ["zip", "7z", "rar", "tar", "gz", "bz2", "xz"],
    "installers": ["exe", "msi", "dmg", "apk", "deb", "rpm"],
    "audio": ["mp3", "wav", "ogg", "flac", "aac", "m4a"]
  };

  // Find the matching category
  for (const [category, exts] of Object.entries(categories)) {
    if (exts.includes(extension)) {
      subDir = category;
      break;
    }
  }

  // Suggest the new filename with subdirectory
  suggest({
    filename: `${subDir}/${filename}`,
    conflictAction: 'uniquify'
  });
});

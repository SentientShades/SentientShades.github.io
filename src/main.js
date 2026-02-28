document.addEventListener('DOMContentLoaded', function() {
  console.log('Portfolio loaded successfully');
  
  const visitorCountEl = document.querySelector('.visitor-count');
  if (visitorCountEl) {
    let count = localStorage.getItem('visitorCount');
    if (count) {
      count = parseInt(count) + 1;
    } else {
      count = 1;
    }
    localStorage.setItem('visitorCount', count);
    visitorCountEl.textContent = count.toString().padStart(5, '0');
  }
  
  const navLinks = document.querySelectorAll('.nav-link');
  const panels = document.querySelectorAll('.content-panel');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const target = this.getAttribute('data-target');
      
      navLinks.forEach(l => l.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      
      this.classList.add('active');
      const targetPanel = document.getElementById('panel-' + target);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
  
  if (navLinks.length > 0) {
    navLinks[0].classList.add('active');
  }
  
  const rippleText = document.querySelector('.ripple-text');
  if (rippleText) {
    const text = rippleText.textContent;
    rippleText.innerHTML = '';
    text.split('').forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.setProperty('--char-index', index);
      rippleText.appendChild(span);
    });
  }
  
  const skillItems = document.querySelectorAll('.skill-item');
  const projectFrame = document.getElementById('skill-project-frame');
  const projectIframe = document.getElementById('skill-project-iframe');
  
  const skillProjects = {
    'csharp': 'https://github.com/dotnet/csharp',
    'java': 'https://github.com/google/guava',
    'javascript': 'https://github.com/vuejs/core',
    'python': 'https://github.com/psf/requests',
    'gdscript': 'https://github.com/godotengine/godot',
    'lua': 'https://github.com/lunarmodules/lua-cjson',
    'css': 'https://github.com/tailwindlabs/tailwindcss'
  };
  
  skillItems.forEach(item => {
    item.addEventListener('click', function() {
      skillItems.forEach(i => i.classList.remove('active'));
      
      this.classList.add('active');
      
      const lang = this.getAttribute('data-lang');
      const projectUrl = skillProjects[lang] || 'https://github.com';
      
      if (projectFrame && projectIframe) {
        projectFrame.classList.add('show');
        projectIframe.src = projectUrl;
      }
    });
  });
  
  const galleryGrid = document.querySelector('.gallery-grid');
  if (galleryGrid) {
    fetch('src/assets/gallery-images.json')
      .then(response => response.json())
      .then(imageNames => {
        galleryGrid.innerHTML = '';
        imageNames.forEach((imageName, index) => {
          const item = document.createElement('div');
          item.className = 'gallery-item';
          const img = document.createElement('img');
          img.src = `src/assets/${imageName}`;
          img.alt = `Gallery ${index + 1}`;
          item.appendChild(img);
          galleryGrid.appendChild(item);
        });
      })
      .catch(error => console.error('Error loading gallery images:', error));
  }
  
  const galleryBtn = document.querySelector('.gallery-btn');

  if (galleryBtn && galleryGrid) {
    let isExpanded = false;
    
    galleryBtn.addEventListener('click', function() {
      isExpanded = !isExpanded;
      
      if (isExpanded) {
        galleryGrid.classList.remove('collapsed');
        galleryBtn.textContent = 'Collapse';
      } else {
        galleryGrid.classList.add('collapsed');
        galleryBtn.textContent = 'View All';
      }
    });
    
    galleryGrid.classList.add('collapsed');
  }
  
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');
  
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('gallery-item') || e.target.parentElement.classList.contains('gallery-item')) {
      const img = e.target.tagName === 'IMG' ? e.target : e.target.querySelector('img');
      if (img && lightbox && lightboxImg) {
        lightboxImg.src = img.src;
        lightbox.classList.add('show');
      }
    }
  });
  
  if (lightbox) {
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        lightbox.classList.remove('show');
      }
    });
  }
  
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('show')) {
      lightbox.classList.remove('show');
    }
  });
});

// yo if youre lurking here i used a code beautifier to make it look nice
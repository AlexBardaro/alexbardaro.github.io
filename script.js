'use strict';

// Содержимое страницы берётся из config.js; библиотек и сборки не требуется.
(() => {
  const data = window.PORTFOLIO || {};
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  let toastTimer;

  function toast(message) {
    const el = $('#toast');
    el.textContent = message;
    el.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('visible'), 3500);
  }

  function validLink(value) {
    try { return ['https:', 'http:'].includes(new URL(value).protocol); }
    catch { return false; }
  }

  function setText(selector, value) {
    $$(selector).forEach(el => { el.textContent = value; });
  }

  setText('[data-field="name"]', data.name || 'Ваше имя');
  setText('[data-field="intro"]', data.intro || 'Создаю мобильные приложения для Android и iOS.');
  setText('[data-field="about"]', data.about || 'Разрабатываю приложения с вниманием к деталям.');
  $('#currentYear').textContent = String(new Date().getFullYear());
  document.title = `${data.name || 'Ваше имя'} — мобильный разработчик`;

  // Контакты. Пока они не заполнены, ссылки не ведут на несуществующие страницы.
  const email = (data.email || '').trim();
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const emailButton = $('#emailButton');
  const emailText = $('#emailText');
  emailText.textContent = emailValid ? email : 'укажите email в config.js';
  if (emailValid) {
    emailButton.href = `mailto:${email}`;
  } else {
    emailButton.href = '#contact';
    emailButton.addEventListener('click', ev => {
      ev.preventDefault();
      toast('Укажите свой email в файле config.js.');
    });
  }
  $('#copyEmail').addEventListener('click', async () => {
    if (!emailValid) { toast('Сначала добавьте email в config.js.'); return; }
    try {
      await navigator.clipboard.writeText(email);
      toast('Email скопирован!');
    } catch {
      const field = document.createElement('textarea');
      field.value = email;
      field.style.cssText = 'position:fixed;opacity:0;left:-9999px';
      document.body.appendChild(field);
      field.select();
      const copied = document.execCommand('copy');
      field.remove();
      toast(copied ? 'Email скопирован!' : `Email: ${email}`);
    }
  });

  for (const [id, value, label] of [
    ['githubLink', data.github, 'GitHub'],
    ['telegramLink', data.telegram, 'Telegram']
  ]) {
    const link = $('#' + id);
    if (validLink(value)) {
      link.href = value;
    } else {
      link.removeAttribute('target');
      link.removeAttribute('rel');
      link.addEventListener('click', ev => {
        ev.preventDefault();
        toast(`Укажите ссылку на ${label} в config.js.`);
      });
    }
  }

  // Стек технологий.
  const stackRoot = $('#stackGroups');
  for (const group of (data.skills || [])) {
    const section = document.createElement('article');
    section.className = 'stack-group';
    const title = document.createElement('div');
    title.className = 'stack-group-title';
    const h3 = document.createElement('h3');
    h3.textContent = group.category || '';
    const index = document.createElement('span');
    index.textContent = group.number || '';
    title.append(h3, index);
    const list = document.createElement('div');
    list.className = 'tech-list';
    for (const skill of (group.tools || [])) {
      const pill = document.createElement('span');
      pill.textContent = skill;
      list.appendChild(pill);
    }
    section.append(title, list);
    stackRoot.appendChild(section);
  }

  // Проекты: одна конфигурация = карточка + подробное модальное окно.
  const projects = data.projects || [];
  const grid = $('#projectGrid');
  const dialog = $('#projectDialog');

  function openProject(project) {
    $('#dialogImage').src = project.image || './assets/project-pulse.svg';
    $('#dialogImage').alt = `Изображение проекта ${project.name || ''}`;
    $('#dialogCategory').textContent = `${project.category || ''}${project.demo ? '  /  ДЕМО-КЕЙС' : ''}`;
    $('#dialogTitle').textContent = project.name || '';
    $('#dialogDescription').textContent = project.description || '';
    const tagsRoot = $('#dialogTags');
    tagsRoot.replaceChildren();
    for (const tag of (project.tags || [])) {
      const el = document.createElement('span');
      el.textContent = tag;
      tagsRoot.appendChild(el);
    }
    const featureRoot = $('#dialogFeatures');
    featureRoot.replaceChildren();
    for (const item of (project.features || [])) {
      const li = document.createElement('li');
      li.textContent = item;
      featureRoot.appendChild(li);
    }
    const repo = $('#dialogRepo');
    repo.hidden = !validLink(project.repo);
    if (!repo.hidden) repo.href = project.repo;
    dialog.showModal();
  }

  projects.forEach((project, i) => {
    const card = document.createElement('article');
    card.className = 'project-card reveal';
    const media = document.createElement('button');
    media.type = 'button';
    media.className = 'project-image';
    media.setAttribute('aria-label', `Подробнее о проекте ${project.name}`);
    media.addEventListener('click', () => openProject(project));
    const image = document.createElement('img');
    image.src = project.image || './assets/project-pulse.svg';
    image.alt = `Интерфейс проекта ${project.name || ''}`;
    image.loading = 'eager';
    image.decoding = 'async';
    media.appendChild(image);
    if (project.demo) {
      const demo = document.createElement('span');
      demo.className = 'project-demo-label';
      demo.textContent = 'ДЕМО-КЕЙС';
      media.appendChild(demo);
    }
    const content = document.createElement('div');
    content.className = 'project-content';
    const number = document.createElement('div');
    number.className = 'project-number';
    const num = document.createElement('span');
    num.textContent = `ПРОЕКТ 0${i + 1}`;
    const category = document.createElement('span');
    category.textContent = project.category || '';
    number.append(num, category);
    const h3 = document.createElement('h3');
    h3.textContent = project.name || '';
    const subtitle = document.createElement('p');
    subtitle.className = 'project-subtitle';
    subtitle.textContent = project.subtitle || '';
    const bottom = document.createElement('div');
    bottom.className = 'project-bottom';
    const tags = document.createElement('div');
    tags.className = 'project-tags';
    (project.tags || []).slice(0, 3).forEach(tag => {
      const pill = document.createElement('span');
      pill.textContent = tag;
      tags.appendChild(pill);
    });
    const button = document.createElement('button');
    button.className = 'project-open';
    button.type = 'button';
    button.textContent = '↗';
    button.setAttribute('aria-label', `Подробнее о проекте ${project.name}`);
    button.addEventListener('click', () => openProject(project));
    bottom.append(tags, button);
    content.append(number, h3, subtitle, bottom);
    card.append(media, content);
    grid.appendChild(card);
  });
  if (!projects.some(p => p.demo)) $('#demoNote').hidden = true;
  $('#dialogClose').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    // Закрыть по клику вне области окна.
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });

  // Мобильная навигация.
  const menuButton = $('#menuToggle');
  const mobileNav = $('#mobileNav');
  function toggleMenu(open) {
    mobileNav.hidden = !open;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
  }
  menuButton.addEventListener('click', () => toggleMenu(mobileNav.hidden));
  $$('#mobileNav a').forEach(link => link.addEventListener('click', () => toggleMenu(false)));
  document.addEventListener('keydown', ev => { if (ev.key === 'Escape') toggleMenu(false); });
  window.addEventListener('resize', () => { if (window.innerWidth > 850) toggleMenu(false); });

  // Прокрутка и появление блоков.
  const progress = $('#scrollProgress');
  let scheduled = false;
  window.addEventListener('scroll', () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
      scheduled = false;
    });
  }, { passive: true });

  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || !('IntersectionObserver' in window)) {
    $$('.reveal').forEach(el => el.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px 45px 0px', threshold: .04 });
    $$('.reveal').forEach(el => observer.observe(el));
  }

  if ('IntersectionObserver' in window) {
    const navLinks = $$('.desktop-nav a');
    const sections = $$('main section[id]');
    const navObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
        }
      });
    }, { rootMargin: '-35% 0px -52% 0px' });
    sections.forEach(section => navObserver.observe(section));
  }
})();

/*
 * НАСТРОЙТЕ ПОРТФОЛИО ЗДЕСЬ.
 * Измените имя, тексты, контакты, стек и проекты.
 * Все ссылки должны начинаться с https:// (почта указывается без mailto:).
 * После изменения файла GitHub Pages автоматически обновит сайт.
 */
window.PORTFOLIO = {
  name: 'Ваше имя',
  intro: 'Проектирую и разрабатываю мобильные приложения для Android и iOS — с фокусом на удобство, скорость и детали.',
  about: 'Мне нравится превращать сложные идеи в простые, понятные интерфейсы. Сочетаю инженерный подход, продуктовую логику и внимание к пользовательскому опыту.',

  // Впишите настоящие контакты. Пока не заполнены, сайт покажет подсказку.
  email: '',
  github: '',            // например: https://github.com/yourname
  telegram: '',          // например: https://t.me/yourname

  skills: [
    { category: 'Android', number: '01', tools: ['Kotlin', 'Jetpack Compose', 'Coroutines', 'Android SDK'] },
    { category: 'iOS', number: '02', tools: ['Swift', 'SwiftUI', 'UIKit'] },
    { category: 'Cross-platform', number: '03', tools: ['Flutter', 'Dart'] },
    { category: 'Tools & Services', number: '04', tools: ['Firebase', 'REST API', 'Git', 'Figma'] }
  ],

  /* Демонстрационные проекты. Замените на свои.
     image — путь к изображению в папке assets (PNG, JPG, SVG, WEBP или GIF).
     repo — ссылка на репозиторий или сайт проекта; если пустая, кнопка не показывается.
     demo — true для шаблонного кейса, false для вашей реальной работы.
  */
  projects: [
    {
      name: 'PULSE',
      subtitle: 'Привычки, которые становятся частью жизни',
      category: 'WELLNESS / FLUTTER',
      description: 'Концепт приложения для отслеживания активности и полезных привычек. Чёткая визуальная иерархия, быстрый доступ к прогрессу и приятная микроанимация.',
      image: './assets/project-pulse.svg',
      tags: ['Flutter', 'Firebase', 'UX/UI'],
      features: ['Дашборд с прогрессом пользователя', 'Ежедневные цели и напоминания', 'Адаптивный интерфейс и состояния экранов'],
      repo: '',
      demo: true
    },
    {
      name: 'NORTH',
      subtitle: 'Путешествия начинаются с одного касания',
      category: 'TRAVEL / ANDROID',
      description: 'Концепт тревел-приложения с поиском направлений и продуманным экраном поездки. Крупные изображения, удобные маршруты и навигация без лишних шагов.',
      image: './assets/project-north.svg',
      tags: ['Kotlin', 'Jetpack Compose', 'Maps'],
      features: ['Каталог направлений и поиск', 'Экран деталей маршрута', 'Сохранённые места и избранное'],
      repo: '',
      demo: true
    },
    {
      name: 'MONO',
      subtitle: 'Финансы в порядке. Голова свободна.',
      category: 'FINTECH / iOS',
      description: 'Концепт финансового трекера с ясной аналитикой трат, категоризацией операций и минималистичным интерфейсом.',
      image: './assets/project-mono.svg',
      tags: ['Swift', 'SwiftUI', 'Charts'],
      features: ['Обзор баланса и динамики расходов', 'Категории и история операций', 'Удобные графики и фильтры'],
      repo: '',
      demo: true
    }
  ]
};

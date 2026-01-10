import 'dotenv/config';
import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const tasks: Prisma.TaskCreateInput[] = [
  {
    name: 'Fix login validation',
    key: 'TASK-001',
    description:
      'Полагодити валідацію полів логіну. Наразі частина некоректних значень не відловлюється, що створює проблеми для користувачів. Потрібно забезпечити стабільну роботу форми та передбачити детальні повідомлення про помилки.',
    status: 'backlog',
    labels: ['frontend', 'bug'],
  },
  {
    name: 'Create dashboard layout',
    key: 'TASK-002',
    description:
      'Зверстати основний дешборд. Має бути продумане адаптивне розташування основних блоків та зручна навігація. Дизайн повинен відповідати актуальним UI-гайдлайнам проєкту.',
    status: 'backlog',
    labels: ['frontend', 'feature'],
  },
  {
    name: 'Add payment loader',
    key: 'TASK-003',
    description:
      'Показати лоадер під час створення платежу. Це допоможе користувачам зрозуміти, що система обробляє їхню дію. Також потрібно забезпечити коректне приховування лоадера у випадку помилки.',
    status: 'backlog',
    labels: ['frontend', 'feature'],
  },
  {
    name: 'Mobile navigation fix',
    key: 'TASK-004',
    description:
      'Поправити меню на мобільних пристроях. Зараз частина елементів відображається некоректно, що ускладнює роботу користувача. Потрібно забезпечити плавну взаємодію та повну адаптивність.',
    status: 'in_progress',
    labels: ['frontend'],
  },
  {
    name: 'SEO meta tags',
    key: 'TASK-005',
    description:
      'Додати meta теги для SEO. Це покращить видимість сторінок у пошукових системах та допоможе збільшити органічний трафік. Потрібно передбачити можливість динамічної зміни тегів залежно від контенту.',
    status: 'in_progress',
    labels: ['feature'],
  },
  {
    name: 'Optimize images',
    key: 'TASK-006',
    description:
      'Оптимізувати зображення на лендингу. Вони завантажуються занадто повільно та негативно впливають на продуктивність сторінки. Необхідно зменшити розмір файлів без втрати якості та додати сучасні формати.',
    status: 'in_progress',
    labels: ['backend'],
  },
  {
    name: 'Remove legacy styles',
    key: 'TASK-007',
    description:
      'Видалити старі стилі. Вони більше не використовуються та ускладнюють підтримку проєкту. Також це допоможе зменшити розмір CSS і прискорити завантаження сторінок.',
    status: 'done',
    labels: ['backend'],
  },
  {
    name: 'Accessibility improvements',
    key: 'TASK-008',
    description:
      'Покращити доступність елементів. Деякі компоненти не відповідають стандартам WCAG і не озвучуються скрінрідерами. Необхідно додати ARIA-атрибути та покращити клавіатурну навігацію.',
    status: 'done',
    labels: ['feature'],
  },
  {
    name: 'Form error handling',
    key: 'TASK-009',
    description:
      'Покращити обробку помилок форм. Наразі помилки відображаються не завжди коректно, що плутає користувачів. Потрібно уніфікувати формат повідомлень та забезпечити їх консистентність у різних формах.',
    status: 'done',
    labels: ['frontend', 'bug'],
  },
];

export async function main() {
  for (const task of tasks) {
    await prisma.task.create({ data: task });
  }
}

main();

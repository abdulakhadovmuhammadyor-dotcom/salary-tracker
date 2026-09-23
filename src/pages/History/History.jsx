// src/pages/History/History.jsx
import { useState } from 'react';
import styles from './History.module.css';

// Временная inline-заглушка для TransactionList (будет заменена в шаге D8)
const TransactionList = ({ transactions, onEdit, onDelete }) => {
  if (!transactions || transactions.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '48px 24px', color: 'var(--color-text-secondary)' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📭</div>
        <div style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px', color: 'var(--color-text)' }}>
          Нет операций
        </div>
        <div>Добавьте первую операцию, чтобы начать учёт финансов</div>
      </div>
    );
  }
  return <div>Список операций появится позже</div>;
};

function History() {
  // Состояние фильтров
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Пока данные не подключены — список пустой
  const transactions = [];

  const handleAddClick = () => {
    // Модалка будет подключена позже (в Фазе F)
    console.log('Открыть форму добавления операции');
  };

  return (
    <div className={styles.history}>
      {/* Заголовок страницы */}
      <h1 className={styles.title}>История</h1>

      {/* Панель фильтров */}
      <div className={styles.filters}>
        {/* Фильтр по типу операции */}
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Тип операции</label>
          <select
            className={styles.filterControl}
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">Все</option>
            <option value="income">Доходы</option>
            <option value="expense">Расходы</option>
          </select>
        </div>

        {/* Фильтр по категории */}
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Категория</label>
          <select
            className={styles.filterControl}
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">Все категории</option>
            <option value="salary">Зарплата</option>
            <option value="groceries">Продукты</option>
            <option value="utilities">Коммуналка</option>
            <option value="entertainment">Развлечения</option>
          </select>
        </div>

        {/* Поиск по комментарию */}
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Поиск</label>
          <input
            type="text"
            className={styles.filterControl}
            placeholder="Поиск по комментарию..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Кнопка добавления операции */}
        <button className={styles.addButton} onClick={handleAddClick}>
          + Добавить операцию
        </button>
      </div>

      {/* Контейнер для списка транзакций */}
      <div className={styles.listContainer}>
        <TransactionList
          transactions={transactions}
          onEdit={(id) => console.log('Редактировать:', id)}
          onDelete={(id) => console.log('Удалить:', id)}
        />
      </div>
    </div>
  );
}

export default History;
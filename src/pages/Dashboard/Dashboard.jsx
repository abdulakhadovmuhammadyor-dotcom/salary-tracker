// src/pages/Dashboard/Dashboard.jsx
import styles from './Dashboard.module.css';

// Временная inline-заглушка для BalanceCard (будет заменена в шаге D2)
const BalanceCard = ({ title, amount, color }) => (
  <div
    style={{
      backgroundColor: 'var(--color-surface)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--spacing-lg)',
      boxShadow: 'var(--shadow-sm)',
      borderLeft: `4px solid ${color || 'var(--color-primary)'}`,
    }}
  >
    <div style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)', marginBottom: 'var(--spacing-xs)' }}>
      {title}
    </div>
    <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 700, color: color || 'var(--color-text)' }}>
      {amount ?? 0} ₽
    </div>
  </div>
);

// Временная inline-заглушка для EmptyState (будет заменена в шаге D6)
const EmptyState = ({ title, description, actionLabel, onAction }) => (
  <div
    style={{
      textAlign: 'center',
      padding: 'var(--spacing-2xl) var(--spacing-lg)',
      color: 'var(--color-text-secondary)',
    }}
  >
    <div style={{ fontSize: '48px', marginBottom: 'var(--spacing-md)' }}>📭</div>
    <div style={{ fontSize: 'var(--font-size-lg)', fontWeight: 600, marginBottom: 'var(--spacing-sm)', color: 'var(--color-text)' }}>
      {title}
    </div>
    <div style={{ marginBottom: 'var(--spacing-lg)' }}>{description}</div>
    {actionLabel && (
      <button
        onClick={onAction}
        style={{
          backgroundColor: 'var(--color-primary)',
          color: 'white',
          padding: 'var(--spacing-sm) var(--spacing-lg)',
          borderRadius: 'var(--radius-md)',
          fontWeight: 500,
        }}
      >
        {actionLabel}
      </button>
    )}
  </div>
);

function Dashboard() {
  // Пока данные не подключены — все суммы равны 0
  const incomesTotal = 0;
  const expensesTotal = 0;
  const balance = incomesTotal - expensesTotal;
  const recentTransactions = [];

  const handleAddClick = () => {
    // Модалка будет подключена позже (в Фазе F)
    console.log('Открыть форму добавления операции');
  };

  return (
    <div className={styles.dashboard}>
      {/* Заголовок страницы */}
      <h1 className={styles.title}>Главная</h1>

      {/* Сетка карточек баланса */}
      <div className={styles.cardsGrid}>
        <BalanceCard title="Доходы" amount={incomesTotal} color="var(--color-income)" />
        <BalanceCard title="Расходы" amount={expensesTotal} color="var(--color-expense)" />
        <BalanceCard title="Баланс" amount={balance} color="var(--color-balance)" />
      </div>

      {/* Секция последних операций */}
      <div className={styles.recentSection}>
        <h2 className={styles.sectionTitle}>Последние операции</h2>
        {(recentTransactions?.length || 0) === 0 ? (
          <EmptyState
            title="Нет операций"
            description="Добавьте первую операцию, чтобы начать учёт финансов"
            actionLabel="Добавить операцию"
            onAction={handleAddClick}
          />
        ) : (
          <div>Список операций появится позже</div>
        )}
      </div>

      {/* Плавающая кнопка добавления */}
      <button
        className={styles.addButton}
        onClick={handleAddClick}
        aria-label="Добавить операцию"
      >
        +
      </button>
    </div>
  );
}

export default Dashboard;
// src/components/BalanceCard/BalanceCard.jsx
import styles from './BalanceCard.module.css';

function BalanceCard({ title, amount, type = 'balance' }) {
  // Fallback для amount: если не передано или null/undefined, показываем 0
  const displayAmount = amount ?? 0;
  
  // Форматирование суммы с разделителями тысяч
  const formattedAmount = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(displayAmount);

  // Определяем CSS-класс на основе типа
  const cardClass = `${styles.card} ${styles[type] || styles.balance}`;

  return (
    <div className={cardClass}>
      {/* Подпись карточки */}
      <div className={styles.title}>{title}</div>
      
      {/* Сумма */}
      <div className={styles.amount}>{formattedAmount}</div>
    </div>
  );
}

export default BalanceCard;
// src/pages/Analytics/Analytics.jsx
import styles from './Analytics.module.css';

function Analytics() {
  // Пока данные не подключены — графики пустые
  const pieChartData = [];
  const barChartData = [];

  return (
    <div className={styles.analytics}>
      {/* Заголовок страницы */}
      <h1 className={styles.title}>Аналитика</h1>

      {/* Сетка для графиков */}
      <div className={styles.chartsGrid}>
        {/* Контейнер для круговой диаграммы */}
        <div className={styles.chartContainer}>
          <h2 className={styles.chartTitle}>Расходы по категориям</h2>
          {(!pieChartData || pieChartData.length === 0) ? (
            <div className={styles.chartPlaceholder}>
              <div className={styles.placeholderIcon}>📊</div>
              <div className={styles.placeholderText}>Графики появятся после подключения данных</div>
              <div className={styles.placeholderDescription}>
                Добавьте операции, чтобы увидеть распределение расходов по категориям
              </div>
            </div>
          ) : (
            <div>Круговая диаграмма появится позже</div>
          )}
        </div>

        {/* Контейнер для столбчатого графика */}
        <div className={styles.chartContainer}>
          <h2 className={styles.chartTitle}>Доходы и расходы по месяцам</h2>
          {(!barChartData || barChartData.length === 0) ? (
            <div className={styles.chartPlaceholder}>
              <div className={styles.placeholderIcon}>📈</div>
              <div className={styles.placeholderText}>Графики появятся после подключения данных</div>
              <div className={styles.placeholderDescription}>
                Добавьте операции, чтобы увидеть динамику доходов и расходов
              </div>
            </div>
          ) : (
            <div>Столбчатый график появится позже</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Analytics;
// src/components/Layout/Layout.jsx
import Header from '../Header/Header';
import styles from './Layout.module.css';

function Layout({ children }) {
  return (
    <div className={styles.layout}>
      {/* Шапка с навигацией */}
      <Header />
      
      {/* Основной контент страницы */}
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}

export default Layout;
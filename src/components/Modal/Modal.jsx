// src/components/Modal/Modal.jsx
import { useEffect } from 'react';
import styles from './Modal.module.css';

function Modal({ isOpen, onClose, title, children }) {
  // Закрытие по нажатию Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Если модалка не открыта — не рендерим ничего
  if (!isOpen) return null;

  // Обработчик клика на overlay (закрытие при клике вне модалки)
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose?.();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        {/* Заголовок с кнопкой закрытия */}
        <div className={styles.header}>
          <h2 className={styles.title}>{title || 'Модальное окно'}</h2>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Закрыть"
          >
            ✕
          </button>
        </div>

        {/* Контент модалки */}
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
import { get } from './api.js';

/**
 * Получение общего баланса (доходы, расходы, разница)
 * @param {string} startDate - Начальная дата фильтра (опционально, формат YYYY-MM-DD)
 * @param {string} endDate - Конечная дата фильтра (опционально, формат YYYY-MM-DD)
 * @returns {Promise<Object>} Объект { data: { totalIncome, totalExpense, balance } }
 */
export const getBalance = async (startDate, endDate) => {
  const params = {};
  if (startDate) params.startDate = startDate;
  if (endDate) params.endDate = endDate;
  
  const result = await get('/summary', params);
  return result;
};

/**
 * Получение сумм по категориям для круговой диаграммы
 * @param {string} type - Тип операции ('income' или 'expense')
 * @param {string} startDate - Начальная дата фильтра (опционально)
 * @param {string} endDate - Конечная дата фильтра (опционально)
 * @returns {Promise<Object>} Объект { data: [{ categoryId, categoryLabel, total }], type }
 */
export const getByCategory = async (type = 'expense', startDate, endDate) => {
  const params = { type };
  if (startDate) params.startDate = startDate;
  if (endDate) params.endDate = endDate;
  
  const result = await get('/summary/by-category', params);
  return result;
};

/**
 * Получение помесячной сводки доходов и расходов
 * @param {number} monthsCount - Количество последних месяцев (по умолчанию 6)
 * @returns {Promise<Object>} Объект { data: [{ year, month, income, expense }], monthsCount }
 */
export const getMonthlySummary = async (monthsCount = 6) => {
  const result = await get('/summary/by-month', { months: monthsCount });
  return result;
};
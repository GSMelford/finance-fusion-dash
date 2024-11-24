export interface Transaction {
  id: string;
  type: "витрата" | "дохід";
  description: string;
  amount: number;
  date: string;
  category?: string;
}

export interface CategoryLimit {
  category: string;
  limit: number;
}

export const getLocalTransactions = (): Transaction[] => {
  const stored = localStorage.getItem('transactions');
  return stored ? JSON.parse(stored) : [];
};

export const saveTransaction = (transaction: Omit<Transaction, 'id' | 'date'>) => {
  const transactions = getLocalTransactions();
  const newTransaction = {
    ...transaction,
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
  };
  transactions.unshift(newTransaction);
  localStorage.setItem('transactions', JSON.stringify(transactions));
  return newTransaction;
};

export const getCategoryLimits = (): CategoryLimit[] => {
  const stored = localStorage.getItem('categoryLimits');
  return stored ? JSON.parse(stored) : [];
};

export const saveCategoryLimit = (limit: CategoryLimit) => {
  const limits = getCategoryLimits();
  const existingIndex = limits.findIndex(l => l.category === limit.category);
  
  if (existingIndex >= 0) {
    limits[existingIndex] = limit;
  } else {
    limits.push(limit);
  }
  
  localStorage.setItem('categoryLimits', JSON.stringify(limits));
  return limits;
};
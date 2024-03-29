export type Transaction = {
  id: number;
  account: string;
  bank: string;
  category: string;
  value: number;
  description: string;
  performedAt: string;
  accountId: number;
  categoryId: number;
  containerId?: number;
};

export type Account = {
  bank: string;
  account: string;
  id: number;
};

export type Category = {
  title: string;
  id: number;
};

export type Container = {
  id: number;
  title: string;
};

export type ProgressType = {
  title: string;
  value: number;
};

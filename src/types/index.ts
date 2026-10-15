export interface Password {
  id: string;
  site: string;
  value: string;
  createdAt: string;
  lastUsedAt: string | undefined;
  numberOfTimesCopied: number;
}

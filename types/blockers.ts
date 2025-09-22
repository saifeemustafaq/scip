export interface BlockerItem {
  id: string;
  text: string;
  notes: string;
  completed: boolean;
  createdAt: string;
}

export interface BlockersData {
  items: BlockerItem[];
}

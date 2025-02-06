export interface IListItem {
  id: number;
  isCompleted: boolean;
  name: string;
}

export interface IListItemDetail extends IListItem {
  imageUrl: string | null;
  memo: string | null;
  tenantId: string;
}

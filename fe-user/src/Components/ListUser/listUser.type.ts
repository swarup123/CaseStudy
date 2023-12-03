export type RowDataType = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

export type HeadCell = {
  disablePadding: boolean;
  id: keyof RowDataType;
  label: string;
  numeric: boolean;
};

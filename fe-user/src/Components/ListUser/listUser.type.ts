export type Data = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

export type HeadCell = {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
};

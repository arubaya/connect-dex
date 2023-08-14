export interface EnhancedTableHeadProps {
  order: 'desc' | 'asc';
  orderBy: string;
  onRequestSort: (event, property) => void;
  columnList: DefaultColumnListData[];
}

export interface DefaultColumnListData {
  dataId: string;
  label: string;
  width?: string;
  isNumeric?: boolean;
  minWidth: string;
  disableSort: boolean;
}

export interface CustomTableProps<DataType> {
  dataList: DataType[];
  columnList: DefaultColumnListData[];
  searchLabel?: string;
  searchBy?: string;
  isSearchable?: boolean;
  renderRow: (data: DataType) => JSX.Element;
}

export interface SearchChangeData {
  input: string;
  dataList: any[];
  searchBy: string;
  setList: React.Dispatch<React.SetStateAction<any[]>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}

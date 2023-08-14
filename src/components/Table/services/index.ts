import { SearchChangeData } from '../Table';

function descendingComparator(a: any, b: any, orderBy: string) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export const getComparator = (order: 'desc' | 'asc', orderBy: string) => {
  return order === 'desc'
    ? (a: any, b: any) => descendingComparator(a, b, orderBy)
    : (a: any, b: any) => -descendingComparator(a, b, orderBy);
};

export const handleSearchChange = ({
  input,
  dataList,
  setList,
  setPage,
  setSearchInput,
  searchBy,
}: SearchChangeData) => {
  const filter = input.toUpperCase();
  let searchResultList: any[] = [];
  if (filter === '') {
    setList(dataList);
    searchResultList = [];
  } else {
    dataList.forEach((data) => {
      if (data[searchBy].toUpperCase().indexOf(filter) > -1) {
        searchResultList.push(data);
      }
    });
    setList(searchResultList);
    searchResultList = [];
  }
  setSearchInput(input);
  setPage(0);
};

import { getLeadingDashBoardRequest } from "@/services/LeaderBoardService";
import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";

class LeaderBoardStore {
  constructor() {
    makeAutoObservable(this);
  }

  dashboardData = [];

  pageIndex = 1;
  pageSize = 10;
  keyword = null;
  isLoading = true;
  totalPages = 0;
  totalElements = 0;

  getLeadingDashBoard = async () => {
    try {
      this.isLoading = true;
      const searchObject = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        keyWord: this.keyword,
      };

      const { data } = await getLeadingDashBoardRequest(searchObject);

      this.dashboardData = data?.data;
      this.pageIndex = data?.pageIndex;
      this.pageSize = data?.pageSize;
      this.keyword = data?.keyword;
      this.totalElements = data?.totalElements;
      this.totalPages = data?.totalPages;

      this.isLoading = false;
    } catch (error) {
      toast.error("Something went wrong :(");
    }
  };

  handleChangePage = (event: any, newPage: number) => {
    this.pageIndex = newPage;

    this.getLeadingDashBoard();
  };

  handleSearchingWithKeyword = (values: any) => {
    this.pageIndex = 1;
    this.keyword = values?.keyword;
    console.log("submit values: ", values);

    this.getLeadingDashBoard();
  };

  resetStore = () => {
    this.dashboardData = [];
    this.pageIndex = 1;
    this.pageSize = 10;
    this.keyword = null;
    this.isLoading = true;
    this.totalElements = 0;
  };
}

export default LeaderBoardStore;

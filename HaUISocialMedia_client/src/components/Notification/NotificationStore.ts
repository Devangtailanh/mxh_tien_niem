import { pagingNotification } from "@/services/NotificationService";
import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";

class NotificationStore {
  constructor() {
    makeAutoObservable(this);
  }

  getNotification = async (searchObject: any) => {
    try {
      const { data } = await pagingNotification(searchObject);
      return data;
    } catch (error) {
      toast.error("Something went wrong :(");
    }
  };
}

export default NotificationStore;

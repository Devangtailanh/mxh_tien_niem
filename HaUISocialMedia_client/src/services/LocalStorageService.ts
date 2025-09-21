// import Cookies from 'universal-cookie';

class LocalStorageService {
  ls = window.localStorage;

  removeItem = (key: any) => {
    this.ls.removeItem(key);
  }

  setItem(key: any, value: any) {
    // const cookies = new Cookies();

    value = JSON.stringify(value);
    this.ls.setItem(key, value);
    //cookies.set(key, value, { path: '/' });
    return true;
  }

  getItem(key: any) {
    //  const cookies = new Cookies();
    let value: any = this.ls.getItem(key);
    //let value = cookies.get(key);
    try {
      return JSON.parse(value);
    } catch (e) {
      return null;
    }
  }

  getLoggedInUser() {
    return this.getItem("auth_user");
  }
}

export default new LocalStorageService();
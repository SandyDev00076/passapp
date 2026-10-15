import usePasswordsStore from "@/stores/passwordsStore";
import { onMounted } from "vue";

const PASSWORDS_LOCALSTORAGE_KEY = "pass-collection";

const useKeepPasswordsInSync = () => {
  const { setPasswords } = usePasswordsStore();

  onMounted(() => {
    // check if localStorage contains the value
    const dataFromLocalStorage = localStorage.getItem(
      PASSWORDS_LOCALSTORAGE_KEY,
    );

    if (!dataFromLocalStorage) {
      // no data is present
      // add an empty data
      setPasswords([]);
      return;
    }

    // if some data is already present
    // grab it and store it in the store
    try {
      setPasswords(JSON.parse(dataFromLocalStorage));
    } catch (e) {
      console.error("Error while parsing the data from local storage", e);
      setPasswords([]);
    }
  });
};

export default useKeepPasswordsInSync;

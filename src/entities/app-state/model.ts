import { makeAutoObservable } from "mobx";
import { getFromLocalStorage, setToLocalStorage } from "@/shared/lib/storage/client-storage";
import { isClient } from "@/shared/consts";

const SERVERS_LOCALSTORAGE_ITEM_NAME = "cwg:servers";

export interface SnackbarOptions {
  open: boolean;
  severity?: "error" | "success";
  message?: string;
  action?: string;
  onAction?: () => void;
}

export class AppState {
  localServers: string[] = [];
  snackbar: SnackbarOptions = { open: false };

  constructor() {
    makeAutoObservable(this);
    if (isClient) {
      const saved = getFromLocalStorage(SERVERS_LOCALSTORAGE_ITEM_NAME);
      this.localServers = saved ? JSON.parse(saved) : [];
    }
  }

  addLocalServer(address: string) {
    if (this.localServers.includes(address)) return;
    this.localServers.unshift(address);
    setToLocalStorage(SERVERS_LOCALSTORAGE_ITEM_NAME, JSON.stringify(this.localServers));
  }

  deleteLocalServer(address: string) {
    this.localServers = this.localServers.filter(s => s !== address);
    setToLocalStorage(SERVERS_LOCALSTORAGE_ITEM_NAME, JSON.stringify(this.localServers));
  }

  openSnackbar(options: Omit<SnackbarOptions, "open"> & { message: string }) {
    this.snackbar = {
      open: true,
      severity: options.severity || "error",
      message: options.message,
      action: options.action,
      onAction: options.onAction,
    };
  }

  closeSnackbar() {
    this.snackbar = { ...this.snackbar, open: false };
  }
}

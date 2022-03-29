import store from "@/store";
import { HIDE_MESSAGE, SHOW_MESSAGE } from "@/utils/constant";
import { MessageType } from "@/utils/props";

function useMessageInfo(
  type: MessageType,
  message: string,
  timeout?: number
): void {
  store.commit(SHOW_MESSAGE, { type, message });
  if (timeout !== void 0) {
    setTimeout(() => {
      store.commit(HIDE_MESSAGE);
    }, timeout);
  }
}

export default useMessageInfo;

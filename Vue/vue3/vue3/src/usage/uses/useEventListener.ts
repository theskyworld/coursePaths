import { onMounted, onUnmounted } from "vue";

function useEventListener(
  targetElem: Window | HTMLElement,
  event: string,
  callback: any
) {
  onMounted(() => targetElem.addEventListener(event, callback));
  onUnmounted(() => targetElem.removeEventListener(event, callback));
}
export default useEventListener;

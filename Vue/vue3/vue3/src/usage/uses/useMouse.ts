// 鼠标追踪器组合式函数
import { ref, onMounted, onUnmounted } from "vue";
import useEventListener from "./useEventListener";

function useMouse() {
  const x = ref(0);
  const y = ref(0);

  // 跟随鼠标的移动更新坐标
  function updatePosition(e: any) {
    x.value = e.pageX;
    y.value = e.pageY;
  }

  // 挂载和卸载mousemove事件
  //   onMounted(() => window.addEventListener("mousemove", updatePosition));
  //   onUnmounted(() => window.removeEventListener("mousemove", updatePosition));
  // 或者
  useEventListener(window, "mousemove", updatePosition);

  return { x, y };
}

export default useMouse;

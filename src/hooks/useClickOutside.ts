import { onMounted, onUnmounted, ref, Ref } from "vue";

function useClickOutside(elementRef: Ref<null | HTMLElement>): Ref<boolean> {
  const isClickOutside = ref(false);

  const handler = (e: MouseEvent) => {
    if (elementRef.value) {
      isClickOutside.value = !elementRef.value.contains(
        e.target as HTMLElement
      );
    }
  };

  onMounted(() => {
    document.addEventListener("click", handler);
  });

  onUnmounted(() => {
    document.removeEventListener("click", handler);
  });

  return isClickOutside;
}

export default useClickOutside;

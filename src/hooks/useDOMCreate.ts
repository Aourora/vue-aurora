import { onUnmounted } from "vue";

function useDOMCreate(tagName: string, nodeId: string): HTMLElement {
  const node = document.createElement(tagName);
  node.id = nodeId;
  document.body.append(node);
  onUnmounted(() => {
    document.body.removeChild(node);
  });
  return node;
}

export default useDOMCreate;

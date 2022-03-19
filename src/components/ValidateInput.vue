<template>
  <div class="validate-input-container pb-3">
    <input
      v-if="tag !== 'textarea'"
      class="form-control"
      :class="{ 'is-invalid': inputRef.error }"
      :value="inputRef.val"
      @blur="validateInput"
      @input="updateValue"
      v-bind="$attrs"
    />
    <textarea
      v-else
      class="form-control"
      :class="{ 'is-invalid': inputRef.error }"
      :value="inputRef.val"
      @blur="validateInput"
      @input="updateValue"
      v-bind="$attrs"
    />
    <span v-if="inputRef.error" class="invalid-feedback">{{
      inputRef.message
    }}</span>
  </div>
</template>
<script setup lang="ts">
import emitter from "@/mitt";
import { defineProps, defineEmits, onMounted, PropType, reactive } from "vue";

import { ValidateType, VALIDATE_FUNC } from "../utils";

export interface RuleProp {
  type: ValidateType;
  message: string;
}

const props = defineProps({
  rules: Array as PropType<RuleProp[]>,
  modelValue: String,
  tag: { type: String as PropType<"input" | "textarea">, default: "input" },
});

const emit = defineEmits(["update:modelValue"]);

const inputRef = reactive({
  val: props.modelValue || "",
  error: false,
  message: "",
});

const updateValue = (e: Event) => {
  const targetValue = (e.target as HTMLInputElement).value;
  inputRef.val = targetValue;
  emit("update:modelValue", targetValue);
};

const validateInput = () => {
  if (!props.rules || !props.rules.length) return true;

  inputRef.error = !props.rules.every((rule) => {
    if (!VALIDATE_FUNC[rule.type](inputRef.val)) {
      inputRef.message = rule.message;
      return false;
    }
    return true;
  });

  return !inputRef.error;
};

onMounted(() => {
  emitter.emit("form-item-created", validateInput);
});
</script>

<script lang="ts">
export default { inheritAttrs: false };
</script>

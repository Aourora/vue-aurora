<template>
  <div class="validate-input-container pb-3">
    <MDBInput
      v-if="tag !== 'textarea'"
      wrapperClass="mb-4"
      :value="inputData.val"
      @blur="validateInput"
      @input="updateValue"
      v-bind="$attrs"
      :class="{ 'is-invalid': inputData.error }"
      :label="inputData.error ? inputData.message : label"
    />
    <textarea
      v-else
      class="form-control"
      :class="{ 'is-invalid': inputData.error }"
      :value="inputData.val"
      @blur="validateInput"
      @input="updateValue"
      v-bind="$attrs"
    />
    <span v-if="inputData.error" class="invalid-feedback">{{
      inputData.message
    }}</span>
  </div>
</template>
<script setup lang="ts">
import emitter from "@/mitt";
import { validate } from "@/utils/function";
import { RuleProps } from "@/utils/props";
import { MDBInput } from "mdb-vue-ui-kit";
import {
  defineProps,
  defineEmits,
  onMounted,
  PropType,
  reactive,
  onUnmounted,
} from "vue";

const props = defineProps({
  rules: Array as PropType<RuleProps[]>,
  modelValue: String,
  tag: { type: String as PropType<"input" | "textarea">, default: "input" },
  isChange: Boolean,
  label: String,
});

const emit = defineEmits(["update:modelValue", "format"]);

const inputData = reactive({
  val: props.modelValue || "",
  error: false,
  message: "",
});

const changeInput = (value: string): void => {
  inputData.val = value;
  emit("update:modelValue", value);
};

const updateValue = (e: Event): void => {
  const targetValue = (e.target as HTMLInputElement).value;
  changeInput(targetValue);
};

const validateInput = (): boolean => {
  if (!props.rules || !props.rules.length) {
    emit("format", true);
    return true;
  }

  inputData.error = !props.rules.every((rule) => {
    if (!validate(rule.type)(inputData.val)) {
      inputData.message = rule.message;
      return false;
    }
    return true;
  });
  emit("format", !inputData.error);
  return !inputData.error;
};

onMounted(() => {
  if (props.isChange) {
    emitter.on("change-input-value", changeInput);
  }
  emitter.emit("form-item-created", validateInput);
});

onUnmounted(() => {
  if (props.isChange) {
    emitter.off("change-input-value", changeInput);
  }
});
</script>

<script lang="ts">
export default { inheritAttrs: false };
</script>

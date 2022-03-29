import mitt from "mitt";

type Events = {
  ["form-item-created"]: () => boolean;
  ["change-input-value"]: string;
};

const emitter = mitt<Events>();

export default emitter;

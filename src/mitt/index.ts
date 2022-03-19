import mitt from "mitt";

type Events = {
  ["form-item-created"]: () => boolean;
};

const emitter = mitt<Events>();

export default emitter;

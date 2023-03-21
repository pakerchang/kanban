import React from "react";
import { Textarea, TextareaProps } from "@chakra-ui/react";
import ResizeTextarea from "react-textarea-autosize";

const AutoResizeTextarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, ref) => {
    return <Textarea as={ResizeTextarea} minH="unset" ref={ref} {...props} />;
  }
);

export default AutoResizeTextarea;

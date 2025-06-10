import { Callout } from "@radix-ui/themes";
import React, { PropsWithChildren } from "react";

const ErrorMessage = ({ children }: PropsWithChildren) => {
  return (
    <>
      {children && (
        <Callout.Root color="red">
          <Callout.Text>{children}</Callout.Text>
        </Callout.Root>
      )}
    </>
  );
};

export default ErrorMessage;

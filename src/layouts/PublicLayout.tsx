import React from "react";
import { Container } from "@chakra-ui/react";

const PublicLayout: React.FC<CommonProps> = (props) => {
  const { children } = props;
  return (
    <Container maxW="container.lg" px={4} py={10}>
      {children !== undefined && children}
    </Container>
  );
};

export default PublicLayout;

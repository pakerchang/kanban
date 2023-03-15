import { Container } from "@chakra-ui/react";

function PublicLayout(props: CommonProps) {
  const { children } = props;
  return (
    <Container maxW="container.lg" px={4} py={10}>
      {children}
    </Container>
  );
}

export default PublicLayout;

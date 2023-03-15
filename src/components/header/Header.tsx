import { Heading } from "@chakra-ui/react";

function Header() {
  return (
    <Heading
      fontSize={{ base: "4xl", sm: "5xl", md: "6xl" }}
      fontWeight="bold"
      textAlign="center"
      bgGradient="linear(to-l, #7928CA, #FF0080)"
      bgClip="text"
      mt={4}
    >
      Kanban Pratice
    </Heading>
  );
}

export default Header;

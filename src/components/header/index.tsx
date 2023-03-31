import { Flex, Heading } from "@chakra-ui/react";
import DarkModeIconSwitch from "../DarkModeSwitch";

function Header() {
  return (
    <Flex direction="column">
      <Flex justifyContent="end">
        <DarkModeIconSwitch />
      </Flex>
      <Heading
        fontSize={{ base: "4xl", sm: "5xl", md: "6xl" }}
        fontWeight="bold"
        textAlign="center"
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        bgClip="text"
        mt={4}
      >
        Kanban Practice
      </Heading>
    </Flex>
  );
}

export default Header;

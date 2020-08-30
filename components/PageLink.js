import Link from "next/link";
import { Link as ChLink } from "@chakra-ui/core";

export default function PageLink(props) {
  return (
    <Link href={props.href}>
      <ChLink
        {...props}
        fontSize="inherit"
        backgroundImage="linear-gradient(0deg, #f6e7f9 100%,transparent 50%)"
      >
        {props.children}
      </ChLink>
    </Link>
  );
}

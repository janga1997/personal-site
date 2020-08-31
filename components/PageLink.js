import Link from "next/link";
import { useRouter } from "next/router";

import { Link as ChLink } from "@chakra-ui/core";

export default function PageLink(props) {
  const { href } = props;

  const router = useRouter();
  const linkColor = router.pathname === href ? "ffcec5" : "f6e7f9";

  return (
    <Link href={href}>
      <ChLink
        {...props}
        fontSize="inherit"
        backgroundImage={`linear-gradient(0deg, #${linkColor} 100%, transparent 50%)`}
      >
        {props.children}
      </ChLink>
    </Link>
  );
}

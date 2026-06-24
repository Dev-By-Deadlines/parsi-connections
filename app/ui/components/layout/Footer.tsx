"use client";

import Button from "../Button";
import NextPuzzleTimer from "../NextPuzzleTimer";
import { DownIcon } from "../SVGIcons";

interface FooterProps {
    onShowArchive: () => void;
}

export default function Footer({onShowArchive}: FooterProps) {
  return (
    <footer className="flex flex-row items-center justify-between gap-2 pb-3 w-full">
      <Button variant="iconBased" onClick={onShowArchive}>
        <DownIcon />
        <span className="text-sm px-1">آرشیو پازل ها</span>
      </Button>
      <NextPuzzleTimer />
    </footer>
  );
}

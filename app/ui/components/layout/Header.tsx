"use client";

import Button from "../Button";
import KalambootLogo, { GitHubLogo, InfoIcon } from "../SVGIcons";

interface HeaderProps {
    onHowToPlay: () => void;
}

export default function Header({onHowToPlay}:HeaderProps) {
    
  return (
    <header className="flex flex-row justify-between items-center w-full text-primary">
      <div className="flex flex-row items-center gap-3">
        <KalambootLogo className="w-9" />
        <div className="flex flex-col -skew-2">
          <h2 className="leading-none text-shadow-lg text-shadow-primary/10">
            کلمبوط
          </h2>
          <p className="text-text-muted text-sm">
            پازل روزانه <span className="text-primary-hover/80">کلم</span>ات مر
            <span className="text-primary-hover/80">بوط</span>
          </p>
        </div>
      </div>
      <div className="flex flex-row items-center gap-2">
        <Button variant="iconBased" onClick={onHowToPlay}>
          <InfoIcon />
        </Button>
        <a href="https://github.com/Dev-By-Deadlines" target="_blank">
          <Button variant="iconBased">
            <GitHubLogo />
          </Button>
        </a>
      </div>
    </header>
  );
}

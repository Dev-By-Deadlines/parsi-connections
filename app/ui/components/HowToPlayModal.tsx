"use client";

import Button from "./Button";
import Modal from "./Modal";
import { NewYorkTimesLogo } from "./SVGIcons";

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HowToPlayModal({
  isOpen,
  onClose,
}: HowToPlayModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="درباره کلمبوط">
      <div className="min-h-0 max-h-[350] flex flex-col gap-2 text-text-muted text-justify overflow-y-scroll">
        <p className="text-center text-sm pt-2 text-text-muted">
          واژه <span className="font-bold text-primary"> کلمبوط</span> از ترکیب <span className="text-primary"> " کلمات مربوط "</span> تشکیل شده!
        </p>
        <div>
          <h4 className="font-bold text-primary/80">✶ نحوه بازی</h4>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>چهار کلمه ای که فکر میکنی مربوط هستن رو انتخاب کن</li>
            <li>
              روی دکمه <span className="text-primary/80">ثبت حدس</span> کلیک کن
              تا حدست بررسی بشه
            </li>
            <li>
              اگر حدست اشتباه بود تا
              <span className="text-primary/80"> ۳ بار </span>
              دیگه هم میتونی حدس بزنی
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-primary/80">✶ مثال</h4>
          <div className="w-full flex items-center justify-center">
            <div className="flex flex-col gap-3 w-4/6 transition-all duration-500">
              <div
                className={`flex flex-col rounded-2xl p-2 shadow-lg border border-blue-400 shadow-blue-400/10 text-blue-400`}
              >
                <h5 className="text-center font-semibold text-sm md:text-lg lg:text-xl">
                  صفات مربوط به رنگ قرمز
                </h5>
                <div className="flex w-full justify-center text-onSurface">
                  <p className="px-1 text-sm md:text-lg lg:text-xl">
                    جگری، آلبالویی، یاقوت، خون
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col items-center justify-center mt-4">
          <a href="https://www.nytimes.com/games/connections" target="_blank">            
          <Button variant="iconBased">
            <NewYorkTimesLogo />
            <p className="text-sm underline underline-offset-2">
              نسخه فارسی بازی NY Times Connections
            </p>
          </Button>
          </a>
          <p className="text-xs text-center pt-2 text-text-muted">
            هر روز یه پازل جدید به وقت ۰۳:۳۰ ایران
          </p>
        </div>
      </div>
    </Modal>
  );
}

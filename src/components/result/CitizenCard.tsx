import { Quicksand } from 'next/font/google';
import Image from 'next/image';

const quicksand = Quicksand({ weight: '700', subsets: ['latin'] });
interface CitizenCardProps {
  name: string;
  type: string;
  traits: string[];
  imageUrl: string;
  regDate: string;
  siteUrl: string;
}

export default function CitizenCard({
  name,
  type,
  traits,
  imageUrl,
  regDate,
  siteUrl,
}: CitizenCardProps) {
  return (
    <div className={`${quicksand.className} w-full max-w-md mx-auto`}>
      <div className="bg-beige rounded-3xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="text-center filter-paper-texture">
          <h1 className="text-chocolate font-bold text-md tracking-wide border-b-2 border-cookie/50 py-1">
            🍪 DUBAI CHEWY COOKIE 🍪
          </h1>
          <p className="text-text-secondary font-bold text-xs tracking-wider bg-cookie/30 border-b-1 border-cookie/10">
            CITIZEN ID CARD
          </p>
        </div>

        {/* Main Content */}
        <div className="px-3 py-2 flex gap-4">
          {/* Left: Portrait */}
          <div className="flex-shrink-0">
            <div className="w-32 h-32 bg-cookie/20 rounded-2xl overflow-hidden border-2 border-cookie/50 flex items-center justify-center">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={name}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-5xl">🍪</div>
              )}
            </div>
          </div>

          {/* Right: Info */}
          <div className="flex-1 flex flex-col justify-start pt-2 gap-2">
            <div className="border-1 rounded-lg px-1 border-cookie/40 di text-xs text-chocolate">
              {/* Name */}
              <div className="border-b-1 border-cookie/30 p-1">
                {/* TODO ellipsis 적용 */}
                <span>이름: </span>
                <span>{name}</span>
              </div>

              {/* Type */}
              <div className="p-1">
                <span>유형: </span>
                <span>{type}</span>
              </div>
            </div>

            {/* Traits */}
            <div className="space-y-1">
              {traits.slice(0, 3).map((trait, index) => (
                <div key={index} className="flex items-center gap-1.5">
                  <span className="text-pistachio text-xs">•</span>
                  <span className="text-chocolate text-xs">{trait}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="filter-paper-texture">
          <div className="px-4 py-1 bg-cookie/80 flex items-center justify-between text-white">
            <span className="font-semibold text-xs">
              Dujjonku World Personality Office
            </span>
            <span className="text-xs">Reg. Date: {regDate}</span>
          </div>
          <div className="flex items-center justify-center py-1">
            <a className="text-chocolate text-[10px]">{siteUrl}</a>
          </div>
        </div>
      </div>
    </div>
  );
}

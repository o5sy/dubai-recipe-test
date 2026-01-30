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
    <div className={`${quicksand.className} mx-auto w-full max-w-md`}>
      <div className="bg-beige overflow-hidden rounded-3xl shadow-xl">
        {/* Header */}
        <div className="filter-paper-texture text-center">
          <h1 className="text-chocolate text-md border-cookie/50 border-b-2 py-1 font-bold tracking-wide">
            🍪 DUBAI CHEWY COOKIE 🍪
          </h1>
          <p className="text-text-secondary bg-cookie/30 border-cookie/10 border-b-1 text-xs font-bold tracking-wider">
            CITIZEN ID CARD
          </p>
        </div>

        {/* Main Content */}
        <div className="flex gap-4 px-3 py-2">
          {/* Left: Portrait */}
          <div className="flex-shrink-0">
            <div className="bg-cookie/20 border-cookie/50 flex h-32 w-32 items-center justify-center overflow-hidden rounded-2xl border-2">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={name}
                  width={128}
                  height={128}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="text-5xl">🍪</div>
              )}
            </div>
          </div>

          {/* Right: Info */}
          <div className="flex flex-1 flex-col justify-start gap-2 pt-2">
            <div className="border-cookie/40 di text-chocolate rounded-lg border-1 px-1 text-xs">
              {/* Name */}
              <div className="border-cookie/30 border-b-1 p-1">
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
            <div className="flex flex-1 flex-wrap items-center gap-2">
              {traits.slice(0, 3).map((trait, index) => (
                <span
                  key={index}
                  className="bg-pistachio/20 border-pistachio text-chocolate inline-block rounded-full border px-3 py-1 text-xs"
                >
                  #{trait}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="filter-paper-texture">
          <div className="bg-cookie/80 flex items-center justify-between px-4 py-1 text-white">
            <span className="text-xs font-semibold">
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

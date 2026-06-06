import Image from "next/image";

import WukoMascotWaving from "@/public/wave.png"

export default function Mascot(){
    return (
            <Image
                alt="Wuko mascot waving"
                src={WukoMascotWaving} 
                width={96}
                height={96}
                className="h-auto w-full max-w-[120px]"
            />
    )
}
import {PortableTextBlock} from '@portabletext/types';


export class Homepage {
    public constructor(
        public readonly Program: any,
        public readonly Cover: any,
    ) {}

    public static fromPayload(payload: any, locale: string): Homepage {
        return new Homepage(
            payload.program,
            payload.cover,
        );
    }
}



export class About {
    public constructor(
        public readonly LeftColumn: PortableTextBlock,
        public readonly RightColumn: PortableTextBlock,
        public readonly Bio: PortableTextBlock,
        public readonly Logos: Image[] | null,
        public readonly Gallery: Image[] | null,
    ) {}

    public static fromPayload(payload: any, locale: string): About {
        return new About(
            payload.leftColumn[locale],
            payload.rightColumn[locale],
            payload.bio[locale],
            payload.logos?.map((logo: any) => Image.fromPayload(logo, locale)) ?? null,
            payload.gallery?.map((logo: any) => Image.fromPayload(logo, locale)) ?? null,
        );
    }
}


export class Image {
    public constructor(
        public readonly Id: string,
        public readonly Image: any,
        public readonly Alt: string | null,
    ) {}

    public static fromPayload(payload: any, locale: string): Image {
        return new Image(
            payload._key,
            payload.image,
            payload.alt ?? null,
        );
    }
}

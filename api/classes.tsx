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





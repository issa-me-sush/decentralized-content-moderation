//@ts-ignore
import { Bytes, Block, Event } from "@hyperoracle/zkgraph-lib";


const FLAGGED_CONTENT_HASHES = [
    "0x1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8" ,
    "16670ca66adef3714742563ad0c7475358e93ae23ee6adb1f8a5c0dce6ae88a3" ,

];

function isFlaggedContent(contentHash: Bytes): boolean {
  return FLAGGED_CONTENT_HASHES.includes(contentHash.toHexString()) as boolean;
}


export function handleBlocks(blocks: Block[]): Bytes {
    for (let i = 0; i < blocks[0].events.length; i++) {
        const event = blocks[0].events[i];

        if (event.esig == Bytes.fromHexString("0xafaf3086b0ccc5abac16e5532277b4b9efaa3dc45a4af1e19bfcc027fac12fd3")) {
            const contentHash = event.data.slice(0, 32); // Slicing first 32 bytes for the content hash

            if (isFlaggedContent(contentHash)) {
                // Response for detected flagged content - can also trigger a function in a destination contract
                let response = Bytes.fromUTF8("Flagged content detected");
                return response;
            }
        }
    }

    return Bytes.empty(); // Return empty if no flagged content is found
}

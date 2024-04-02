"use server";

import { writeFile } from "fs/promises";

export const bufferFile = async (file: File) => {
    const fileArrayBuffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(fileArrayBuffer);
    const filePath = `./public/uploads/${file.name}`;
    writeFile(filePath, fileBuffer);
    return filePath;
};

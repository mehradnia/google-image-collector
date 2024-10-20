import fs from "fs";
import path from "path";
import axios from "axios";

export class ImageDownloader {
  constructor(private readonly outputDir: string) {
    // To ensure the output directory exists
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir);
    }
  }

  async download(url: string, index: number): Promise<void> {
    const imagePath = path.resolve(this.outputDir, `image-${index}.jpg`);
    const writer = fs.createWriteStream(imagePath);

    const response = await axios({
      url,
      method: "GET",
      responseType: "stream",
    });

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
  }
}

var fs = require("fs");
const path = require("path");
const archiver = require("archiver");

class ImageArchiver {
  async start() {
    try {
      
      await this.start13();
      
    } catch (error) {
      console.log(error);
    }
  }

  start12() {
    return new Promise((resolve, reject) => {
      let filelength = 0;
      fs.readdir("Z:/Raghab1", (err, files) => {
        if (err) console.log(err);
        else {
          console.log("\nCurrent directory filenames:");
          files.forEach((file) => {
            if (path.extname(file) == ".png") console.log(file);
            fs.readFile(`Z:/Raghab1/${file}`, function (err, data) {
              if (err) throw err;
              fs.writeFile(`Z:/Raghab/${file}`, data, function (err) {
                if (err) throw err;
                filelength++;
              });
            });
            if (filelength == files.length) {
              resolve();
            }
          });
        }
      });
    });
  }

  start13(){
    console.log("start start");

      var output = fs.createWriteStream("Z:/target.zip");
      var archive = archiver("zip");

      output.on("close", function () {
        console.log(archive.pointer() + " total bytes");
        console.log(
          "archiver has been finalized and the output file descriptor has closed."
        );
      });

      archive.on("error", function (err) {
        throw err;
      });

      archive.pipe(output);

      // append files from a sub-directory and naming it `new-subdir` within the archive (see docs for more options):
      archive.directory(`Z:/Raghab1`, false);
      archive.finalize();
  }
}
let a = new ImageArchiver();
a.start();

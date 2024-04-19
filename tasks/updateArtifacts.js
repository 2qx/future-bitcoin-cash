import glob from "glob";
import fs from "fs";
import { compileFile } from "cashc";

function updateArtifacts() {
  glob("contracts/**.v1.cash", function (err, files) {
    if (err) {
      console.log(err);
    }

    files.forEach((file) => {
      console.log(file);
      updateArtifact(file, compileFile);
    });
  });

}

function updateArtifact(cashFile, compiler) {
  let artifact = compiler(cashFile);
  let tsFile = cashFile.replace(".cash", ".ts");
  console.log(tsFile, " ", artifact.debug.bytecode.length/2, " bytes");
  try {
    fs.writeFileSync(
      tsFile,
      "// Automatically Generated\nexport const artifact = "
    );
    fs.appendFileSync(tsFile, JSON.stringify(artifact, null, 2), "utf-8");
    // file written successfully
  } catch (err) {
    console.error(err);
  }
}


updateArtifacts();

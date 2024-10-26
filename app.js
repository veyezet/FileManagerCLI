// app.js
const fs = require("node:fs");
const path = require("node:path");
const readline = require('node:readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const app = {};

// Function to create a new folder
app.makeFolder = () => {
    rl.question("Masukan Nama Folder : ", (folderName) => {
        fs.mkdir(path.join(__dirname, folderName), (err) => {
            if (err) {
                console.error("Error creating folder:", err);
            } else {
                console.log("success created new folder");
            }
            rl.close();
        });
    });
};

// Function to create a new file
app.makeFile = () => {
    rl.question("Masukan nama file (dengan ekstensi): ", (fileName) => {
        rl.question("Masukan isi file: ", (content) => {
            fs.writeFile(path.join(__dirname, fileName), content, (err) => {
                if (err) {
                    console.error("Error creating file:", err);
                } else {
                    console.log("success created new file");
                }
                rl.close();
            });
        });
    });
};

// Function to sort files by extension
app.extSorter = () => {
    const unorganizedPath = path.join(__dirname, 'unorganize_folder');
    
    fs.readdir(unorganizedPath, (err, files) => {
        if (err) {
            console.error("Error reading directory:", err);
            return;
        }

        files.forEach(file => {
            const extension = path.extname(file).toLowerCase();
            let targetFolder = '';

            // Determine target folder based on extension
            if (['.jpg', '.jpeg', '.png', '.gif'].includes(extension)) {
                targetFolder = 'image';
            } else if (['.txt', '.doc', '.pdf'].includes(extension)) {
                targetFolder = 'text';
            } else {
                targetFolder = 'others';
            }

            // Create target folder if it doesn't exist
            const targetPath = path.join(__dirname, targetFolder);
            if (!fs.existsSync(targetPath)) {
                fs.mkdirSync(targetPath);
            }

            // Move file to target folder
            const oldPath = path.join(unorganizedPath, file);
            const newPath = path.join(targetPath, file);

            fs.rename(oldPath, newPath, (err) => {
                if (err) {
                    console.error(`Error moving file ${file}:`, err);
                } else {
                    console.log(`Moved ${file} to ${targetFolder} folder`);
                }
            });
        });
    });
};

// Function to read folder contents
app.readFolder = () => {
    rl.question("Masukan nama folder yang ingin dibaca: ", (folderName) => {
        const folderPath = path.join(__dirname, folderName);
        
        fs.readdir(folderPath, (err, files) => {
            if (err) {
                console.error("Error reading folder:", err);
                rl.close();
                return;
            }

            const fileDetails = files.map(file => {
                const filePath = path.join(folderPath, file);
                const stats = fs.statSync(filePath);
                const extension = path.extname(file).toLowerCase();
                
                let fileType = 'unknown';
                if (['.jpg', '.jpeg', '.png', '.gif'].includes(extension)) {
                    fileType = 'gambar';
                } else if (['.txt', '.doc', '.pdf'].includes(extension)) {
                    fileType = 'text';
                }

                const sizeInKB = stats.size / 1024;
                const sizeDisplay = sizeInKB > 1024 
                    ? `${(sizeInKB / 1024).toFixed(2)}mb` 
                    : `${sizeInKB.toFixed(2)}kb`;

                return {
                    namaFile: file,
                    extensi: extension.replace('.', ''),
                    jenisFile: fileType,
                    tanggalDibuat: stats.birthtime,
                    ukuranFile: sizeDisplay
                };
            });

            // Sort files by creation date
            fileDetails.sort((a, b) => new Date(a.tanggalDibuat) - new Date(b.tanggalDibuat));

            console.log("\nBerhasil menampilkan isi dari folder", folderName, ":");
            console.log(JSON.stringify(fileDetails, null, 2));
            rl.close();
        });
    });
};

// Function to read file contents
app.readFile = () => {
    rl.question("Masukan nama file yang ingin dibaca: ", (fileName) => {
        const filePath = path.join(__dirname, fileName);
        
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error("Error reading file:", err);
            } else {
                console.log("\nIsi dari file", fileName, ":\n");
                console.log(data);
            }
            rl.close();
        });
    });
};

module.exports = app;
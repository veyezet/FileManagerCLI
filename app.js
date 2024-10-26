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
    rl.question("Masukkan Nama Folder: ", (folderName) => {
        fs.mkdir(path.join(__dirname, folderName), { recursive: true }, (err) => {
            if (err) {
                console.error("Error creating folder:", err);
            } else {
                console.log(`Folder "${folderName}" berhasil dibuat.`);
            }
            rl.close();
        });
    });
};

// Function to create a new file
app.makeFile = () => {
    rl.question("Masukkan nama file (dengan ekstensi): ", (fileName) => {
        rl.question("Masukkan isi file: ", (content) => {
            fs.writeFile(path.join(__dirname, fileName), content, (err) => {
                if (err) {
                    console.error("Error creating file:", err);
                } else {
                    console.log(`File "${fileName}" berhasil dibuat.`);
                }
                rl.close();
            });
        });
    });
};

// Function to sort files by extension
app.extSorter = () => {
    rl.question("Masukkan path folder sumber (mis. unorganize_folder): ", (unorganizedFolder) => {
        const unorganizedPath = path.join(__dirname, unorganizedFolder);

        // Check if the specified unorganized folder exists
        if (!fs.existsSync(unorganizedPath)) {
            console.error("Error: Folder sumber tidak ditemukan. Pastikan nama dan path folder benar.");
            rl.close();
            return;
        }

        fs.readdir(unorganizedPath, (err, files) => {
            if (err) {
                console.error("Error reading directory:", err);
                rl.close();
                return;
            }

            // Define the target folders
            const targetFolders = {
                images: path.join(__dirname, 'images'),
                texts: path.join(__dirname, 'texts'),
                others: path.join(__dirname, 'others'),
            };

            // Create target folders if they don't exist
            Object.values(targetFolders).forEach(targetPath => {
                if (!fs.existsSync(targetPath)) {
                    fs.mkdirSync(targetPath, { recursive: true });
                }
            });

            // Move files to the corresponding folder
            files.forEach(file => {
                const extension = path.extname(file).toLowerCase();
                let targetFolder = '';

                // Determine target folder based on extension
                if (['.jpg', '.jpeg', '.png', '.gif'].includes(extension)) {
                    targetFolder = targetFolders.images;
                } else if (['.txt', '.doc', '.pdf'].includes(extension)) {
                    targetFolder = targetFolders.texts;
                } else {
                    targetFolder = targetFolders.others;
                }

                // Move file to target folder
                const oldPath = path.join(unorganizedPath, file);
                const newPath = path.join(targetFolder, file);

                fs.rename(oldPath, newPath, (err) => {
                    if (err) {
                        console.error(`Error moving file ${file}:`, err);
                    } else {
                        console.log(`File "${file}" dipindahkan ke folder "${path.basename(targetFolder)}".`);
                    }
                });
            });
            rl.close();
        });
    });
};

// Function to read folder contents
app.readFolder = () => {
    rl.question("Masukkan nama folder yang ingin dibaca: ", (folderName) => {
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
                    fileType = 'image';
                } else if (['.txt', '.doc', '.pdf'].includes(extension)) {
                    fileType = 'text';
                }

                const sizeInKB = stats.size / 1024;
                const sizeDisplay = sizeInKB > 1024 
                    ? `${(sizeInKB / 1024).toFixed(2)} MB` 
                    : `${sizeInKB.toFixed(2)} KB`;

                return {
                    namaFile: file,
                    extensi: extension.replace('.', ''),
                    jenisFile: fileType,
                    tanggalDibuat: stats.birthtime.toLocaleString(),
                    ukuranFile: sizeDisplay
                };
            });

            // Sort files by creation date
            fileDetails.sort((a, b) => new Date(a.tanggalDibuat) - new Date(b.tanggalDibuat));

            console.log("\nBerhasil menampilkan isi dari folder:", folderName);
            console.log(JSON.stringify(fileDetails, null, 2));
            rl.close();
        });
    });
};

// Function to read file contents
app.readFile = () => {
    rl.question("Masukkan nama file yang ingin dibaca: ", (fileName) => {
        const filePath = path.join(__dirname, fileName);
        
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error("Error reading file:", err);
            } else {
                console.log(`\nIsi dari file "${fileName}":\n`);
                console.log(data);
            }
            rl.close();
        });
    });
};

module.exports = app;

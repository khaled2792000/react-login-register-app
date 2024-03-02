const dbName = "myDatabase";
const storeName = "files";
const fileId = 1; // Replace with the actual file ID

// Open the database
const dbPromise = indexedDB.open(dbName, 1);

dbPromise.onupgradeneeded = (event) => {
    const db = event.target.result;

    // Create object store for files
    if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: "id" });
    }
};

dbPromise.onsuccess = (event) => {
    const db = event.target.result;

    // Function to save file
    const saveFile = (fileData) => {
        const transaction = db.transaction([storeName], "readwrite");
        const store = transaction.objectStore(storeName);

        // Add or update file in object store
        const request = store.put({ id: fileId, data: fileData });

        request.onsuccess = () => {
            console.log("File saved successfully");
        };

        request.onerror = (event) => {
            console.error("Error saving file:", event.target.error);
        };
    };

    // Function to get file by ID
    const getFileById = () => {
        const transaction = db.transaction([storeName], "readonly");
        const store = transaction.objectStore(storeName);
        const request = store.get(fileId);

        request.onsuccess = (event) => {
            const file = event.target.result;

            if (file) {
                // `file.data` contains the retrieved file data
                console.log("File retrieved successfully:", file);
            } else {
                console.log("File not found");
            }
        };

        request.onerror = (event) => {
            console.error("Error retrieving file:", event.target.error);
        };
    };

    // Example usage: Save file
    const fileData = "Sample file content"; // Replace with the actual file data
    saveFile(fileData);

    // Example usage: Get file
    getFileById();
};

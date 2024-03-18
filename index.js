const {Storage} = require('@google-cloud/storage');
const storage = new Storage();

exports.getFileCounts = async (req, res) => {
    const buckets = {
        'cit41200-jaymmann-benign-pdf': 0,
        'cit41200-jaymmann-malicious-pdf': 0
    };

    async function countFilesInBucket(bucketName) {
        const [files] = await storage.bucket(bucketName).getFiles();
        return files.length;
    }

    try {
        for (const bucketName of Object.keys(buckets)) {
            buckets[bucketName] = await countFilesInBucket(bucketName);
        }

        res.status(200).send(buckets);
    } catch (error) {
        console.error(error);
        res.status(500).send({error: 'Error getting file counts.'});
    }
};

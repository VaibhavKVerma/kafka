module.exports = {
    firstService: {
        firstFunction: {
            name: "first-service.first.function",
            processingMode: "batch",
            partitions: 8,
        },
        secondFunction: {
            name: "first-service.second.function",
            processingMode: "each",
            partitions: 8,
        }
    },
    secondService: {
        firstFunction: {
            name: "second-service.first.function",
            processingMode: "each",
            partitions: 8,
        }
    }
}
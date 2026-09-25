// AI Vision Pipeline Simulator
class VisionPipeline {
    constructor() {
        this.filtersApplied = [];
        this.targetLocked = false;
    }

    addFilter(filterName) {
        if (!this.filtersApplied.includes(filterName)) {
            this.filtersApplied.push(filterName);
        }
        this.checkPipeline();
    }

    checkPipeline() {
        // Logic: To find the chip, you must apply Grayscale THEN Edge Detection
        if (this.filtersApplied.includes('grayscale') && this.filtersApplied.includes('edge')) {
            this.targetLocked = true;
            return true;
        }
        return false;
    }
}

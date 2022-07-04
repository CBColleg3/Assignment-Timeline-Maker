
/**
 * Each point in the timeline, aka Task
 */
export interface Task {
    /**
     * Name of the task
     */
    name: string;
    /**
     * Id of the task
     */
    id: number;
    /**
     * Document of the task
     */
    document: string;
    /**
     * Points of the task
     */
    points: string;
    /**
     * Color of the task
     */
    color: number;
}
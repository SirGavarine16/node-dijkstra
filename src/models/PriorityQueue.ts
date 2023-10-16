
class QueueNode<T> {
    public value: T;
    public priority: number;

    constructor(value: T, priority: number) {
        this.value = value;
        this.priority = priority;
    }
}


class PriorityQueue<T> {
    private elements: QueueNode<T>[];

    constructor() {
        this.elements = [];
    }

    size() {
        return this.elements.length;
    }

    peek() {
        return this.elements[0];
    }

    enqueue(value: T, priority: number) {
        this.elements.push(new QueueNode(value, priority));
        if (this.elements.length === 1)
            return this;
        return this.heapifyUp();
    }

    dequeue() {
        this.swap(0, this.elements.length - 1);
        const removed = this.elements.pop();
        this.heapifyDown();
        return removed;
    }

    private heapifyUp() {
        let current = this.elements.length - 1;
        let parent = this.getParentIndex(current);

        while (this.elements[current].priority < this.elements[parent].priority) {
            this.swap(current, parent);

            current = parent;
            parent = this.getParentIndex(current);
        }
        
        return this;
    }

    private heapifyDown() {
        let current = 0;
        let left = this.getLeftIndex(current);
        let right = this.getRightIndex(current);

        while (
            (this.elements[left] && this.elements[current].priority > this.elements[left].priority)
            || 
            (this.elements[right] && this.elements[current].priority > this.elements[right].priority)
        ) {
            if (this.elements[left].priority < this.elements[right].priority) {
                this.swap(current, left);
                current = left;
            } else {
                this.swap(current, right);
                current = right;
            }

            left = this.getLeftIndex(current);
            right = this.getRightIndex(current);
        }
    }

    private swap(first: number, second: number) {
        const temp = this.elements[first];
        this.elements[first] = this.elements[second];
        this.elements[second] = temp;
    }

    private getParentIndex(origin: number) {
        return Math.floor(Math.abs(origin - 1) / 2);
    }

    private getLeftIndex(origin: number) {
        return (2 * origin) + 1;
    }

    private getRightIndex(origin: number) {
        return (2 * origin) + 2;
    } 
}

export default PriorityQueue;
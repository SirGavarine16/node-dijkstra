import PriorityQueue from './PriorityQueue';

type AdjacentVertex = {
    node: string;
    weight: number;
}

type AdjacencyList = {
    [key: string]: AdjacentVertex[];
}

type DistancesMap = {
    [key: string]: number;
}

type PreviousMap = {
    [key: string]: string | null;
}

type Path = {
    nodes: string[];
    totalWeight: number;
}

class Graph {
    private adjacencyList: AdjacencyList;

    constructor() {
        this.adjacencyList = {};
    }

    addVertex(key: string) {
        this.adjacencyList[key] = [];
    }

    addEdge(vertex1: string, vertex2: string, weight: number) {
        this.adjacencyList[vertex1].push({ node: vertex2, weight });
        this.adjacencyList[vertex2].push({ node: vertex1, weight });
    }

    removeVertex(key: string) {
        for (const neighbor of this.adjacencyList[key]) {
            this.removeEdge(key, neighbor.node);
        }
        delete this.adjacencyList[key];
    }

    removeEdge(vertex1: string, vertex2: string) {
        this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(n => n.node !== vertex2);
        this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(n => n.node !== vertex1);
    }

    shortestPath(start: string, end: string) {
        const distancesMap = this.createDistancesMap(start);
        const queue = this.createPriorityQueue(distancesMap);
        const previous = this.createPreviousMap();

        while(queue.size() > 0) {
            if (queue.peek().value === end) 
                break;

            const current = (queue.dequeue()!).value;
            if (current || distancesMap[current] !== Infinity) {
                for (const node in this.adjacencyList[current]) {
                    const nextNode = this.adjacencyList[current][node];
                    let candidate = distancesMap[current] + nextNode.weight;
                    
                    if (candidate < distancesMap[nextNode.node]) {
                        distancesMap[nextNode.node] = candidate;
                        previous[nextNode.node] = current;
                        queue.enqueue(nextNode.node, candidate);
                    }
                }
            }
        }

        const path = this.tracePath(start, end, previous);
        return { path, totalWeight: distancesMap[end] };
    }

    private createDistancesMap(start: string) {
        const distances: DistancesMap = {};
        for (const node in this.adjacencyList) {
            distances[node] = node === start ? 0 : Infinity;
        }
        return distances;
    }

    private createPriorityQueue(distances: DistancesMap) {
        const queue = new PriorityQueue<string>();
        for (const node in distances) {
            queue.enqueue(node, distances[node]);
        }
        return queue;
    }

    private createPreviousMap() {
        const previous: PreviousMap = {};
        for (const node in this.adjacencyList) {
            previous[node] = null;
        }
        return previous;
    }

    private tracePath(start: string, end: string, map: PreviousMap) {
        let currentInPath: string = end;
        const path: string[] = [];
        while (map[currentInPath]) {
            path.push(currentInPath);
            currentInPath = map[currentInPath]!;
        }
        path.push(start);
        return path.reverse()
    }
}

export default Graph;
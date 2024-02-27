export class LocalStorageHelper<T> {
    private key: string;

    constructor(key: string) {
        this.key = key;
    }

    set(value: T): void {
        localStorage.setItem(this.key, JSON.stringify(value));
    }

    get(): T | null {
        const item = localStorage.getItem(this.key);
        if (item) {
            return JSON.parse(item) as T;
        }
        return null;
    }

    removeItem(): void {
        localStorage.removeItem(this.key);
    }
}

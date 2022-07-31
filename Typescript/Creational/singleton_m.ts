class ConfigManager {
    private settings: Map<string, string> = new Map();
    private static instance: ConfigManager = new ConfigManager();

    private constructor() {}

    public static getInstance(): ConfigManager {
        return ConfigManager.instance;
    }

    public setSetting(key: string, value: string): void {
        this.settings.set(key, value);
    }

    public getSetting(key: string): string | undefined {
        return this.settings.get(key);
    }
}

// Main
const manager = ConfigManager.getInstance();
manager.setSetting('name', 'jorge');

const manager2 = ConfigManager.getInstance();
console.log(manager2.getSetting('name')); // 'jorge'

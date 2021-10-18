export default class Resources {
    static resourceStorage = {
        models: {},
        textures: {}
    };

    static setModelPath(key, path) {
        Resources.resourceStorage.models[key.toLowerCase()] = path;
    }

    static getModelPath(key, defVal = "") {
        return Resources.resourceStorage.models[key.toLowerCase()] ?? defVal;
    }

    static setTexturePath(key, path) {
        Resources.resourceStorage.textures[key.toLowerCase()] = path;
    }

    static getTexturePath(key, defVal = "") {
        return Resources.resourceStorage.textures[key.toLowerCase()] ?? defVal;
    }
}
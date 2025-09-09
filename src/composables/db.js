import { openDB } from 'idb';

const DB_NAME = 'MyDatabase';
const DB_VERSION = 1;
const STORE_NAME = 'reps';
const ITEMS_NAME = "items";

let db = null;

const DB = {
  async init() {
    if (!db) {
      db = await openDB(DB_NAME, DB_VERSION, {
        upgrade(database) {
          if (!database.objectStoreNames.contains(STORE_NAME)) {
            database.createObjectStore(STORE_NAME, {
              keyPath: 'id',
              autoIncrement: true,
            });

            if (!database.objectStoreNames.contains(ITEMS_NAME)) {
              const itemsStore = database.createObjectStore(ITEMS_NAME, { keyPath: 'id',  autoIncrement: true });
              itemsStore.createIndex('by-repId', 'repId');
              itemsStore.createIndex('by-tag', 'tags', { multiEntry: true });
            }
          }
        },
      })
    }
  },

  async getAllReps() {
    await this.init()
    return await db.getAll(STORE_NAME)
  },

  async getRep(id) {
    await this.init()
    return await db.get(STORE_NAME, id)
  },

  async addRep(repData) {
    await this.init()
    return await db.add(STORE_NAME, repData)
  },

  async updateRep(repData) {
    await this.init()
    return await db.put(STORE_NAME, repData)
  },

  async deleteRep(id) {
    await this.init();

    const tx = db.transaction([STORE_NAME, ITEMS_NAME], 'readwrite');
    const index = tx.objectStore(ITEMS_NAME).index('by-repId');
    const items = await index.getAllKeys(IDBKeyRange.only(id));
    for (const id of items) {
      await tx.objectStore(ITEMS_NAME).delete(id);
    }

    await tx.objectStore(STORE_NAME).delete(id);

    await tx.done;
  },

  async getItemsByRepId(repId) {
    await this.init();
    const index = db.transaction(ITEMS_NAME).objectStore(ITEMS_NAME).index('by-repId');
    const items = await index.getAll(IDBKeyRange.only(repId));
    const sortedItems = items.sort((a, b) => {
      if(a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    return sortedItems;
  },

  async getItem(itemId) {
    await this.init()
    return await db.get(ITEMS_NAME, itemId)
  },

  async addItem(itemData) {
    await this.init();
    await db.add(ITEMS_NAME, itemData);
  },

  async updateItem(itemData) {
    await this.init();
    await db.put(ITEMS_NAME, itemData);
  },

  async deleteItem(itemId) {
    await this.init();
    return db.delete(ITEMS_NAME, itemId);
  },

  async getItemsByTag(tag) {
    await this.init();

    const tx = db.transaction(ITEMS_NAME, 'readonly');
    const index = tx.store.index('by-tag');
    const items = await index.getAll(tag);

    return items;
  },

  async updateItemTags(itemId, newTags) {
    await this.init();

    const item = await db.get(ITEMS_NAME, itemId);
    if (!item) return;

    item.tags = newTags;
    await db.put(ITEMS_NAME, item);
  },

  async searchItemsByTags(repId, tags) {
    await this.init();

    if (!db) {
      throw new Error('DB is not initialized');
    }

    if (!repId) {
      throw new Error('Rep is not selected');
    }

    const tx = db.transaction(ITEMS_NAME, 'readonly');
    const index = tx.store.index('by-tag');

    const results = new Map();

    for (const tag of tags) {
      const matchedItems = await index.getAll(tag);
      for (const item of matchedItems) {
        if (item.repId === repId) {
          results.set(item.id, item);
        }
      }
    }

    return Array.from(results.values());
  },

  async searchItemsWithAllTags(tags) {
    await this.init();

    if (!db) {
      throw new Error('DB is not initialized');
    }

    if (!Array.isArray(tags) || tags.length === 0) {
      return [];
    }

    const tx = db.transaction(ITEMS_NAME, 'readonly');
    const index = tx.store.index('by-tag');

    const allCandidates = new Map();

    for (const tag of tags) {
      const items = await index.getAll(tag);
      for (const item of items) {
        allCandidates.set(item.id, item);
      }
    }

    const result = [];

    for (const item of allCandidates.values()) {
      const itemTags = new Set(item.tags || []);
      const hasAll = tags.every(tag => itemTags.has(tag));
      if (hasAll) {
        result.push(item);
      }
    }

    return result;
  },

  async getAllUniqueTagsByRepId(repId) {
    await this.init();

    if (!db) {
      throw new Error('DB is not initialized');
    }

    const tx = db.transaction(ITEMS_NAME, 'readonly');
    const index = tx.store.index('by-repId');
    const items = await index.getAll(repId);

    const tagSet = new Set();

    for (const item of items) {
      if (Array.isArray(item.tags)) {
        for (const tag of item.tags) {
          tagSet.add(tag);
        }
      }
    }

    return Array.from(tagSet);
  },
}

export default DB
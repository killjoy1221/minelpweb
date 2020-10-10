export interface ModInfo {
    id: string;
    name: string;
}

export interface ModInfoFile {
    mods: ModInfo[];
}

export interface ModDetail extends ModInfo {
    repo: string;
    link: string;
}

const { PUBLIC_URL } = process.env;

async function getJson<T>(path: string): Promise<T> {
    const response = await fetch(PUBLIC_URL + path);
    if (response.ok) {
        return (await response.json()) as T;
    }
    throw response.statusText;
}

export async function getMods(): Promise<ModInfoFile> {
    return await getJson<ModInfoFile>("/mods.json");
}

export function getModDetail(id: string): () => Promise<ModDetail> {
    return async () => {
        return await getJson<ModDetail>(`/mods/${id}.json`);
    };
}

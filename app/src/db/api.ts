import { db, getAll, get } from './util';
import { ISenior } from './interface';

export const addSenior = async (newEvent: any) => {
    await db('/seniors').push(newEvent);
};

export const updateSeniorFP2 = async (id: string, event: any) => {
    await db(`/seniors/${id}/fp2Completed`).set(event);
};

export const getAllSeniors = async (): Promise<ISenior[]> => {
    return await getAll(`/seniors`);
};

export const getSenior = async (id: string): Promise<ISenior> => {
    return await get(`/seniors/${id}`);
};

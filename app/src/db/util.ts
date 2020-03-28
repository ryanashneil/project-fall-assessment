import firebase from './config';

export const formatArr = <T>(obj: any): T[] => {
    const arr = [];
    for (const key in obj) {
        arr.push({ key, ...obj[key] });
    }
    return arr as T[];
};

export const db = (ref?: string): firebase.database.Reference => {
    return firebase.database().ref(ref);
};

export const getAll = async <T>(ref: string): Promise<T[]> => {
    const obj = await firebase
        .database()
        .ref(ref)
        .once('value');
    const arr = [];
    for (const key in obj.val()) {
        arr.push({ key, ...obj.val()[key] });
    }
    return arr as T[];
};

export const get = async <T>(ref: string): Promise<T> => {
    const obj = await firebase
        .database()
        .ref(ref)
        .once('value');
    return obj.val();
};

import Papa from 'papaparse';

export const papaPromise = (file: any) => new Promise((resolve, reject) => {
    const parserConfig = {
        header: true,
        dynamicTyping: true,
        download: true,
        complete: (results: { data: [], errors: [], meta: any }) => {
            resolve(results);
        },
        error: (error: any) => {
            reject(error);
        }
    }

    Papa.parse(file, parserConfig);
})


export const getRandomItemsFromArray = (arr: any[], x: number) => {
    const newArr = new Array(x);

    for (let i = 0; i < x; i++) {
        newArr[i] = arr[i];
    }

    for (let i = x; i < arr.length; i++) {
        const j = Math.floor(Math.random() * (i + 1));
        if (j < x) {
            newArr[j] = arr[i];
        }
    }

    return newArr;
}
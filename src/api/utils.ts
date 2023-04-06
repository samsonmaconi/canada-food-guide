import Papa from 'papaparse';

export const papaPromise = (file: any) => new Promise((resolve, reject) => {
    const parserConfig = {
        header: true,
        dynamicTyping: true,
        download: true,
        complete: function(results: {data: [], errors: [], meta: any}) {
            resolve(results);
        },
        error: function(error: any) {
            reject(error);
        }
      }

    Papa.parse(file, parserConfig);
})
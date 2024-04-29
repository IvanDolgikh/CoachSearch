  
// const acceptData = async(url, data) => {

//     try {
//         const response = await fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(data) 
//         })

//         if(response.ok) {
//             const getData = await response.json()
//             console.log(getData)
//             return getData
//         } else {
//             throw new Error('Something wrong')
//         }
//     }

//     catch(error) {
//         throw error
//     }
// }

const baseUrl: string = 'http://localhost:5079/'

type TData = (url: string, data?: Record<string, any>) => Promise<any>

const sendData: TData = async(url, data) => {
    try {
        const formData = new FormData();
        for (const key in data) {
          formData.append(key, data[key]);
        }

        const response = await fetch(url, {
            method: 'POST',
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('accessToken')
            },
            body: formData
        });
        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            const errorData = await response.json()
            throw new Error(errorData.errors);
        }
    } catch (errors: any) {
      if (errors instanceof Error) {
        throw errors;
      }
    }
};

const getData: TData = async (url) => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('accessToken')
        }
      })
  
      if (response.ok) {
        const result = await response.json()
        return result
      } else {
        throw new Error('Something wrong')
      }
    } catch (error: any) {
      if (error instanceof Error) {
        throw error;
      }
    }
  }

export { sendData, getData, baseUrl }
  
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

const baseUrl = 'http://wertyqin-001-site1.atempurl.com/'


const sendData = async(url, data) => {
    try {
        const formData = new FormData();
        for (const key in data) {
          formData.append(key, data[key]);
        }

        const response = await fetch(url, {
            method: 'POST',
            body: formData
        });
        if (response.ok) {
            const getData = await response.json();
            return getData;
        } else {
            throw new Error('Something wrong');
        }
    } catch (error) {
        throw error;
    }
};

const getData = async (url) => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
  
      if (response.ok) {
        const result = await response.json()
        return result
      } else {
        throw new Error('Something wrong')
      }
    } catch (error) {
      console.error(error)
    }
  }

export { sendData, getData, baseUrl }
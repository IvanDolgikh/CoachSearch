const baseUrl: string = 'https://coachsearch.onrender.com/'

type TData = (url: string, data?: Record<string, any>) => Promise<any>

const sendData: TData = async(url, data) => {
    try {
        const formData: FormData = new FormData();
        for (const key in data) {
          formData.append(key, data[key]);
        }

        const response: any = await fetch(url, {
            method: 'POST',
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('accessToken')
            },
            body: formData
        });
        if (response.ok) {
            const result: any = await response.json();
            return result;
        } else {
            const errorData: any = await response.json()
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
      const response: any = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('accessToken')
        }
      })
  
      if (response.ok) {
        const result: any = await response.json()
        return result
      } else {
        throw new Error
      }
    } catch (error: any) {
      if (error instanceof Error) {
        throw error;
      }
    }
  }

export { sendData, getData, baseUrl }
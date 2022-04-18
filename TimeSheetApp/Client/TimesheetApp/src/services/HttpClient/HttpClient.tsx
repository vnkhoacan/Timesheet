import $ from "jquery";

const post = async (path: string, data: any): Promise<any> => {
  try {
    var host_api: any = document.getElementById("host_api");
    const HOST_NAME: string = host_api.innerText;

    var result = await $.post(HOST_NAME + path, data);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const get = async (path: string): Promise<any> => {
  try {
    var host_api: any = document.getElementById("host_api");
    const HOST_NAME: string = host_api.innerText;

    var result = await $.get(HOST_NAME + path);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const upload = async (path: string, data: any): Promise<any> => {
  try {
    var host_api: any = document.getElementById("host_api");
    const HOST_NAME: string = host_api.innerText;

    var result = await $.ajax({
      url: HOST_NAME + path,
      data: data,
      cache: false,
      contentType: false,
      processData: false,
      method: "POST",
      type: "POST",
    });

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default { post, get, upload };

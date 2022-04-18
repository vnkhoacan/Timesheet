import { Storage } from "@capacitor/storage";

const set = async (key: string, data: any): Promise<void> => {
  var result = await Storage.set({
    key: key,
    value: JSON.stringify(data),
  });
};

const get = async (key: string): Promise<any> => {
  var result = await Storage.get({
    key: key,
  });
  return result.value;
};

const clear = async (): Promise<any> => {
  await Storage.clear();
};

export default { set, get , clear };
